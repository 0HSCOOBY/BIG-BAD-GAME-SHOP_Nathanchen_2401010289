# BIG BAD GAMES SHOP

**Student:** Nathan Chen  
**Student ID:** 2401010289  
**Course:** Dynamic Websites and Applications, Module 1  
**Lecturer:** Trevoir Williams

## Page plan
- `index.html`: welcome, event preview and a number-guessing game.
- `games.html`: six games, live search, category filter, sample ratings and details modal.
- `register.html`: tournament form, visible validation and success feedback, plus FAQ.

## open `index.html` in a browser. No installation is needed. Bootstrap and jQuery are included locally. For editing, open the folder in VS Code and optionally use Live Server.

## Structure
```
game-zone/
  index.html
  games.html
  register.html
  css/styles.css
  js/app.js
  images/                 Original SVG artwork
  vendor/                 Bootstrap and jQuery
  README.md

```

## Technologies and requirements
| Requirement | Where it is demonstrated |
| --- | --- |
| Semantic HTML | header, nav, main, section, article, aside and footer |
| Bootstrap layout | containers, rows, responsive columns, cards, buttons and forms |
| Bootstrap JavaScript | collapsible mobile navigation, game-details modal, FAQ accordion |
| Variables | const for references/data; let for changing game state |
| Strings, numbers, booleans | name/category, rating, free and gameOver |
| Array and objects | games array and individual game records in app.js |
| Conditions | category matching, empty results, invalid form and win/loss logic |
| Functions | displayGames and startGame plus event callbacks |
| Iteration | filter and forEach when showing games |
| DOM selection/modification | querySelector, createElement, textContent and appendChild |
| Events | input, change, click and submit listeners |
| jQuery | $('#form-status').hide().fadeIn(350) animates successful signup feedback |
| Form validation | required/type constraints, name trimming, checkValidity and visible feedback |
| Accessibility | labels, alt text, skip link, focus styles, live feedback and modal focus restoration |

## Interactions
Search and category filtering work together. A search displays an empty state message. The registration handler prevents normal submission, validates values and displays a confirmation using textContent. No personal data is transmitted. The game generates an integer from 1 to 10, gives three guesses, shows higher/lower hints and supports restart.

## Validation completed
JavaScript syntax and local link/asset checks were run. DOM interaction checks cover filtering, details, form validation and number-game outcomes. Browser visual QA was unavailable in the creation environment; desktop, tablet and mobile review steps are in SETUP_GUIDE.md. Complete those checks on your computer before submission.

## Limitations
Ratings and games are sample content, not real reviews/products. Event details are fictional. Registration feedback is temporary. The website does not send emails, take money or connect players. There are no external fonts or images to download at runtime.

## Credits and dependencies
- Bootstrap 5.3.3: https://getbootstrap.com/ — MIT license. Local files include upstream license notices.
- jQuery 3.7.1: https://jquery.com/ — MIT license. Local file includes upstream license notice.
- Controller and game title illustrations: original SVG assets made for this project.

## AI assistance disclosure
ChatGPT assisted with planning based on an initial idea, SVG illustrations, debugging, Java & Boot strap Bug Fixes and generated documentation with given information. 
