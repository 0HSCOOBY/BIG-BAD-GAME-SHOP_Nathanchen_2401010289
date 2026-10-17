/* Game Zone: plain JavaScript for the data, filters, modal, form and game. */
// An array holds the collection. Each object describes one fictional game.
const games = [
  {
    name: "Block Builders",
    category: "Creative",
    rating: 4.6,
    free: true,
    image: "bb",
    description: "Build worlds, explore maps and create your own adventures.",
  },
  {
    name: "Neon Sprint",
    category: "Racing",
    rating: 4.7,
    free: false,
    image: "ns",
    description: "Race through a neon city and chase your best lap time.",
  },
  {
    name: "Final Whistle",
    category: "Sports",
    rating: 4.5,
    free: false,
    image: "fw",
    description: "Choose a team and take on a fast-paced football match.",
  },
  {
    name: "Orbit Arena",
    category: "Action",
    rating: 4.8,
    free: true,
    image: "oa",
    description: "Team up for colourful space battles and quick rounds.",
  },
  {
    name: "Island Quest",
    category: "Adventure",
    rating: 4.4,
    free: false,
    image: "iq",
    description: "Explore a tropical island and solve its hidden puzzles.",
  },
  {
    name: "Pixel Puzzles",
    category: "Puzzle",
    rating: 4.3,
    free: true,
    image: "pp",
    description: "Take a break with a collection of brain-teasing puzzles.",
  },
];

const grid = document.querySelector("#games-grid");
// Every page shares this file, so check whether its elements exist first.
if (grid) {
  const search = document.querySelector("#search");
  const category = document.querySelector("#category");
  const detailsModal = new bootstrap.Modal(
    document.querySelector("#game-modal"),
  );

  function displayGames() {
    const searchText = search.value.trim().toLowerCase();
    const selectedCategory = category.value;
    const matchingGames = games.filter(function (game) {
      const matchesName = game.name.toLowerCase().includes(searchText);
      const matchesCategory =
        selectedCategory === "All" || game.category === selectedCategory;
      return matchesName && matchesCategory;
    });
    grid.innerHTML = "";
    document.querySelector("#result-count").textContent =
      matchingGames.length + " of " + games.length + " games shown";
    if (matchingGames.length === 0) {
      grid.innerHTML =
        '<p class="no-results">No games found. Try another search or category.</p>';
    }
    matchingGames.forEach(function (game) {
      // Only developer-written game data goes into this HTML, not user input.
      const column = document.createElement("article");
      column.className = "col-md-6 col-lg-4";
      column.innerHTML =
        '<div class="card h-100"><img class="card-img-top" src="images/' +
        game.image +
        '.svg" alt="' +
        game.name +
        ' illustrated title card"><div class="card-body d-flex flex-column"><div class="d-flex justify-content-between mb-3"><span class="badge">' +
        game.category +
        '</span><span aria-label="Sample rating ' +
        game.rating +
        ' out of 5">★ ' +
        game.rating +
        '/5</span></div><h2 class="card-title h4">' +
        game.name +
        '</h2><p class="muted">' +
        game.description +
        '</p><p class="price">' +
        (game.free ? "Free-to-play concept" : "Premium game concept") +
        '</p><button class="btn btn-outline-light mt-auto" type="button">View details</button></div></div>';
      column.querySelector("button").addEventListener("click", function () {
        document.querySelector("#modal-title").textContent = game.name;
        document.querySelector("#modal-description").textContent =
          game.description;
        document.querySelector("#modal-info").textContent =
          game.category + " · Sample rating: " + game.rating + "/5";
        detailsModal.show();
        // Restore focus because this modal is opened through JavaScript.
        document.querySelector("#game-modal").addEventListener(
          "hidden.bs.modal",
          function () {
            if (column.isConnected) column.querySelector("button").focus();
          },
          { once: true },
        );
      });
      grid.appendChild(column);
    });
  }
  search.addEventListener("input", displayGames);
  category.addEventListener("change", displayGames);
  displayGames();
}

const registrationForm = document.querySelector("#registration-form");
if (registrationForm) {
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Keep the user on this page.
    const nameInput = document.querySelector("#player-name");
    const playerName = nameInput.value.trim();
    nameInput.setCustomValidity(
      playerName.length < 2 ? "Enter at least two characters." : "",
    );
    registrationForm.classList.add("was-validated");
    const status = document.querySelector("#form-status");
    if (!registrationForm.checkValidity()) {
      status.textContent = "Please correct the highlighted fields.";
      registrationForm.querySelector(":invalid").focus();
      return;
    }
    const email = document.querySelector("#email").value.trim();
    const game = document.querySelector("#event-game").value;
    const platform = document.querySelector("#platform").value;
    // textContent displays names safely, without treating them as HTML.
    status.textContent =
      "Thanks, " +
      playerName +
      "! Demo signup confirmed for " +
      game +
      " on " +
      platform +
      ". Email entered: " +
      email +
      ". No email has been sent.";
    // Meaningful jQuery DOM interaction: animate the success confirmation.
    $("#form-status").hide().fadeIn(350);
    registrationForm.reset();
    registrationForm.classList.remove("was-validated");
  });
  document.querySelector("#player-name").addEventListener("input", function () {
    this.setCustomValidity(
      this.value.trim().length < 2 ? "Enter at least two characters." : "",
    );
  });
}

const guessForm = document.querySelector("#guess-form");
if (guessForm) {
  let secretNumber;
  let attemptsLeft;
  let gameOver;
  const message = document.querySelector("#game-message");
  const guessInput = document.querySelector("#guess");
  const guessButton = document.querySelector("#guess-button");
  function startGame() {
    secretNumber = Math.floor(Math.random() * 10) + 1;
    attemptsLeft = 3;
    gameOver = false;
    guessButton.disabled = false;
    guessInput.disabled = false;
    guessInput.value = "";
    message.textContent = "Three tries left. Good luck!";
  }
  guessForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (gameOver) return;
    const guess = Number(guessInput.value);
    if (!Number.isInteger(guess) || guess < 1 || guess > 10) {
      message.textContent = "Enter a whole number from 1 to 10.";
      return;
    }
    attemptsLeft--;
    if (guess === secretNumber) {
      message.textContent = "You got it! The number was " + secretNumber + ".";
      gameOver = true;
    } else if (attemptsLeft === 0) {
      message.textContent =
        "Out of tries! The number was " + secretNumber + ". Try a new game.";
      gameOver = true;
    } else {
      message.textContent =
        (guess < secretNumber ? "Too low! " : "Too high! ") +
        attemptsLeft +
        " tries left.";
    }
    guessButton.disabled = gameOver;
    guessInput.disabled = gameOver;
  });
  document.querySelector("#restart").addEventListener("click", function () {
    startGame();
    guessInput.focus();
  });
  startGame();
}
