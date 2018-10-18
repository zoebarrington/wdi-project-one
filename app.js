//DOM elements
const score = document.getElementById('score');
const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const blank = document.getElementById('blank');
const box3 = document.getElementById('box3');
const box4 = document.getElementById('box4');
const box5 = document.getElementById('box5');
const box6 = document.getElementById('box6');
const box7 = document.getElementById('box7');
const box8 = document.getElementById('box8');
const arrayOfBoxIds = [box1, box2, blank, box3, box4, box5, box6, box7, box8];
console.log(arrayOfBoxIds);
let scoreValue = 0;
let isClickEventAttached = false;
const boxes = [];
const autoCompleteButton = document.getElementById('autoComplete');
console.log(autoCompleteButton);
const refreshButton = document.getElementById('playAgain');
const audioButton = document.querySelector('.music');
const audio = document.querySelector('audio');

audioButton.addEventListener('click', () => {
  audio.play();
});

refreshButton.addEventListener('click', refresh);

function refresh() {
  window.location.reload();
}

autoCompleteButton.addEventListener('click', () => {
  isDemo = !isDemo;
});

let isDemo = false;

// autoCompleteButton.addEventListener('click', autoCompletePuzzle() {
//   alert('clicked!!')
// });

// resetBoxList();
// function resetBoxList() {
//   boxes.splice(0, 9, ...Array.from(document.querySelector('.grid').childNodes).filter(({tagName}) => tagName === 'DIV'));
// }
//
// autoCompleteButton.addEventListener('click', resetBoxList());

//initialize puzzle function (unsure where to invoke it)
function initializePuzzle(numberOfSquaresPerSide) {
  const parent = document.querySelector('.grid');

  resetBoxList();
  randomizeBoxPositions();

  Array.from(boxes)
    .filter(box => box.id !== 'blank')
    .forEach(box => box.addEventListener('click', scoreGoesUp));

  function scoreGoesUp() {
    console.log('score should go up!');
    const scoreDisplay = document.getElementById('score');
    scoreValue = scoreValue + 1;
    scoreDisplay.textContent = scoreValue;
  }
  //click event - still in intialize puzzle function
  if (!isClickEventAttached) {

    Array.from(boxes)
      .filter(box => box.id !== 'blank')
      .forEach(box => box.addEventListener('click', onClick));
    isClickEventAttached = true;
  }

  //calling the onClick event added to the click function
  function onClick(event) {

    const clickedBox = event.currentTarget;

    console.log('click', boxes);
//retrieving the index of the clicked box from the array
    const indexOfBox = Array.from(boxes).findIndex(box => box === clickedBox);

//check for win function
    function checkForWin() {
      const win = boxes.map(box => box.id).filter((boxId, index) => boxId === arrayOfBoxIds[index].id).length === 7;
      if(win) {
        document.getElementById('winning').style.display='block';
        document.getElementById('winning').textContent = 'Congrats! You solved the puzzle in ' + scoreValue + ' moves!';
      } else {
        console.log('keep trying');
      }
    }

    checkForWin();

//checking if the index of the clicked box is on any of the sides,
//needs to be registered because the box cannot move outside the grid
//if the box is NOT (!) on the outer sides, it can move in any direction
    if (!isTopRow(indexOfBox)) {
      const indexOfOtherBox = indexOfBox - numberOfSquaresPerSide;

//if the blank square is next to the clicked box, swap places with it
      if (isBlankSquare(indexOfOtherBox)) {
        return swapPlaces(indexOfBox, indexOfOtherBox);
      }
    }
    if (!isBottomRow(indexOfBox)) {
      const indexOfOtherBox = indexOfBox + numberOfSquaresPerSide;

      if (isBlankSquare(indexOfOtherBox)) {
        return swapPlaces(indexOfBox, indexOfOtherBox);
      }
    }
    if (!isLeftRow(indexOfBox)) {
      const indexOfOtherBox = indexOfBox - 1;

      if (isBlankSquare(indexOfOtherBox)) {
        return swapPlaces(indexOfBox, indexOfOtherBox);
      }
    }
    if (!isRightRow(indexOfBox)) {
      const indexOfOtherBox = indexOfBox + 1;

      if (isBlankSquare(indexOfOtherBox)) {
        return swapPlaces(indexOfBox, indexOfOtherBox);
      }
    }
  }


//0 - this empties the array, 9 - this is how many elements you want to fill it with
//...adds the array that is created from array.from (creates an array from the childNodes)
//in .grid but only with the tag name 'div'
  function resetBoxList() {
    boxes.splice(0, 9, ...Array.from(document.querySelector('.grid').childNodes).filter(({tagName}) => tagName === 'DIV'));
  }





//function to randomize position of squares
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

  /*
  * The top row is always going to have index 0 to (numberOfSquaresPerSide - 1).
  * For example, if we have a 4 x 4 puzzle, numberOfSquaresPerSide = 4.
  * Here is the index layout for the 4 x 4 puzzle:
  *
  * 00  01  02  03
  * 04  05  06  07
  * 08  09  10  11
  * 12  13  14  15
  *
  * */
  function isTopRow(indexOfBox) {
    return indexOfBox < numberOfSquaresPerSide;
  }

  /*
  * Referring to the above 4 x 4 grid as an example, 4 * 4 = 16. Subtract 4 to get 12.
  * If the index of the clicked box is at least 12, we are on the bottom row.
  * */
  function isBottomRow(indexOfBox) {
    return indexOfBox >= numberOfSquaresPerSide ** 2 - numberOfSquaresPerSide;
  }

  /*
  * To see if we're on the left edge,
  * we should get a remainder of zero if we divide the index by numberOfSquaresPerSide
  *
  * 4 / 0 = 0 remainder 0
  * 4 / 4 = 1 remainder 0
  * 4 / 8 = 2 remainder 0
  * 4 / 12 = 3 remainder 0
  *
  * */
  function isLeftRow(indexOfBox) {
    return indexOfBox % numberOfSquaresPerSide === 0;
  }
  /*
  * To see if we're on the right edge,
  * we should get a remainder of (numberOfSquaresPerSide - 1) if we divide the index by numberOfSquaresPerSide
  *
  * 4 / 3 = 0 remainder 3
  * 4 / 7 = 1 remainder 3
  * 4 / 11 = 2 remainder 3
  * 4 / 15 = 3 remainder 3
  *
  * */
  function isRightRow(indexOfBox) {
    return indexOfBox % numberOfSquaresPerSide === numberOfSquaresPerSide - 1;
  }

  function isBlankSquare(indexOfBox) {
    return boxes[indexOfBox].id === 'blank';
  }

  function swapPlaces(index1, index2) {
    const box1 = boxes[index1];
    const box2 = boxes[index2];
    /*
    * Move one box behind the other. There are 2 possible scenarios:
    * Scenario 1) box2 is at a lower index than box 1 (box2 is above or to the left)
    *   For example, if box1 is index 8 and box2 is index 4
    *
    *   00    01    02    03
    *  [04]   05    06    07
    *  (08)   09    10    11
    *   12    13    14    15
    *
    * Removing box2 from its original location causes all the other boxes to slide one place lower. Since box2
    * has been removed, we only have 15 boxes right now.
    *
    *   00    01    02    03
    *   05    06    07   (08)
    *   09    10    11    12
    *   13    14    15
    *
    * Then we add box2 into the position before box1, pushing it over
    *
    *   00    01    02    03
    *   05    06    07   [04]
    *  (08)   09    10    11
    *   12    13    14    15
    *
    * Scenario 2) box2 is at a higher index than box 1 (box2 is below or to the right)
    *   box2 is now where box1 was before, and box1 has been bumped one index higher.
    *
    *   For example, if box1 is index 6 and box2 is index 2:
    *
    *   00    01   [02]   03
    *   04    05   (06)   07
    *   08    09    10    11
    *   12    13    14    15
    *
    * Removing box2 from its original location causes all the other boxes to slide one place lower. Since box2
    * has been removed, we only have 15 boxes right now.
    *
    *   00    01    03    04
    *   05   (06)   07    08
    *   09    10    11    12
    *   12    13    14
    *
    * Then we add box2 into the position before box1, pushing it over
    *
    *   00    01    03    04
    *   05   [02]  (06)   07
    *   08    09    10    11
    *   12    13    14    15
    *
    * */
    parent.insertBefore(box2, box1);

    resetBoxList();
    /*
    * box2 has already been moved, but we still need to move box1. So we remove box1
    *
    *   00    01    03    04
    *   05   [02]   07    08
    *   09    10    11    12
    *   13    14    15
    * */
    if (index1 < index2) {
      /*
      * If box2 was at a higher index, (let's say box1 is at 9 and box2 is at 13:
      *
      * 00    01    02    03
      * 04    05    06    07
      * 08   (09)   10    11
      * 12   [13]   14    15
      *
      * Moving box2 before box1 like before would yield this:
      *
      * 00    01    02    03
      * 04    05    06    07
      * 08   [13]  (09)   10
      * 11    12    14    15
      *
      * */
      if (index2 === numberOfSquaresPerSide ** 2 - 1) {
        /*
        * If box2's original position was the very last index (bottom right),
        * and there is no "insertAfter" function, we append, which adds box1 to the end.
        *
        * */
        parent.appendChild(box1);
      } else {
        /*
        * If box2's original position was not very last index,
        * since there is no "insertAfter" function, we insert it before original position of box2 + 1,
        * because removing box1 causes all the indices to shift lower by one.
        *
        * */
        parent.insertBefore(box1, boxes[index2 + 1]);
      }
    } else {

      parent.insertBefore(box1, boxes[index2]);
    }

    resetBoxList();
  }
}
