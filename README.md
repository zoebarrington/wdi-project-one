# Sliding Puzzle Game

## Background
This version of a sliding puzzle game is based on the famous Greek myth of Daedalus and Icarus.

This sliding puzzle game is my first project from General Assembly's Web Development Immersive. It was an individual project which was built in less than a week, and was the first project I had built from start to finish using HTML, CSS and Javascript.


## Brief
To create a single-page web game, using HTML, CSS and JavaScript technologies learnt in the first three weeks of General Assembly's Web Development Immersive.

## Introductory Page
![Introductory Page](screenshots/introductory-page.png)

## Initial Page
![Homepage](screenshots/sliding-puzzle.png)

## Page After Clicking Start
![Start Page](screenshots/start.png)

## Page When Won
![Winning Page](screenshots/winning.png)

## Technologies Used

* HTML5 and HTML5 audio
* CSS3 with animation
* JavaScript(ECMAScript 6)
* Git
* GitHub
* jQuery
* Google Fonts
* PhotoShop

## Featured Piece of Code no.1

```JavaScript
function resetBoxList() {
  boxes.splice(0, 9, ...Array.from(document.querySelector('.grid').childNodes).filter(({tagName}) => tagName === 'DIV'));
}
```
This piece of code resets the boxes of my puzzle into the correct order by creating a function called resetBoxList. Within the function,

## Featured Piece of Code no.2
```Javascript
function randomizeBoxPositions() {
  const unorderedBoxes = Array.from(boxes);
  let randomizedBoxes = [];

  if(isDemo) {
    randomizedBoxes = [
      unorderedBoxes[2],
      unorderedBoxes[0],
      unorderedBoxes[1],
      unorderedBoxes[3],
      unorderedBoxes[4],
      unorderedBoxes[5],
      unorderedBoxes[6],
      unorderedBoxes[7],
      unorderedBoxes[8]
    ];
  } else {
    for(let i = 0; i < unorderedBoxes.length; i ++) {
      const randomNumber = Math.floor(Math.random() * (1 + unorderedBoxes.length));
      randomizedBoxes.splice(randomNumber, 0, unorderedBoxes[i]);
    }
  }
  randomizedBoxes.forEach(box => parent.appendChild(box));
  resetBoxList();

}
```
This piece of code shows a function I wrote which randomises the box positions of the boxes of the sliding puzzle game. I made my boxes into divs, and put the divs into an array called randomizedBoxes.

## Wins and Blockers
My main blockers were that I over-complicated the code, and spent a little too much time researching and planning, meaning that I had slightly less time to actually write the code.

The wins were that my code works and I learnt an immense amount from the extensive research that I did. By the end of the project, I felt that I really had a firm grasp on what we had learnt in the first three weeks, and also with my ability to learn and research further code on my own.

Due to my planning, I decided it would be better for the boxes to be the divs themselves, rather than just the content within the divs, and this made the rest of my code must easier to execute.

## Future Features
* To include more levels of difficulty, adding more sliding cards to the puzzle as levels increase and with the images getting more complex
* Drier code with more comments to help other developers understand my thought process
