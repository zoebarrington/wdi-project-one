let scoreValue = 0;
initializePuzzle(3);

function initializePuzzle(numberOfSquaresPerSide) {
  const parent = document.querySelector('.grid');
  let boxes = [];

  resetBoxList();
  randomizeBoxPositions();

  /*
  * Array.From - creates a new array instance from an array-like or iterable object.
  * Here it is creating an array of the class 'boxes'
  *
  *   We are getting all the boxes to add a click event, but we're filtering out the blank box
  *   because we don't want anything to happen when you click on it.
  * */
  Array.from(boxes)
  .filter(box => box.id !== 'blank')
  .forEach(box => box.addEventListener('click', scoreGoesUp));

  function scoreGoesUp(event) {
    // const clickedBox = event.currentTarget;
    // if(event.target.classList[0] === 'boxes') {
    //   console.log('score should go up!');
    //   const scoreDisplay = document.getElementById('score');
    //   let scoreValue=0;
    //   scoreValue = scoreValue + 1;
    //   scoreDisplay.textContent(scoreValue);
    // }
    console.log('score should go up!');
    const scoreDisplay = document.getElementById('score');
    scoreValue = scoreValue + 1;
    scoreDisplay.textContent = scoreValue;
  }

  Array.from(boxes)
  .filter(box => box.id !== 'blank')
  .forEach(box => box.addEventListener('click', onClick));

  function onClick(event) {
    /*
    * This is a reference to the box that was clicked
    * */
    const clickedBox = event.currentTarget;

    const indexOfBox = Array.from(boxes).findIndex(box => box === clickedBox);

    /*
    * We need to see if the clicked box is on one of the edges of the puzzle, because we are looking on all four
    * sides of it (above, below, left and right) to see if one of those is the Blank square. If the clicked box
    * is on the edge, we don't want to look for the blank box off the edge.
    *
    * For example, if we click on the top row we don't want to look above that box because there are no boxes there.
    * */
    if (!isTopRow(indexOfBox)) {
      const indexOfOtherBox = indexOfBox - numberOfSquaresPerSide;

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
    // if(event.target.classList[0] === 'boxes') {
    //   console.log('score should go up!');
    //   const scoreDisplay = document.getElementById('score');
    //   let scoreValue=0;
    //   scoreValue = scoreValue + 1;
    //   scoreDisplay.textContent(scoreValue);
    // }
  }

  //review the above if function to make score value go up


  /*
  * Refreshes our ordered list of boxes, since moving them around will cause the boxes array to no longer
  * show them in the correct places unless we re-query the list of boxes.
  * */

  //ELLEMENT DEFINITION

  // let intervalId;
  // let i = 5;
  // $startButton.on('click', generateGrid);
  // $startButton.on('click', function(){
  //   intervalId = setInterval(function() {
  //     $timer.html(`${i}`);
  //     i = i - 1;
  //     if(i === -1) {
  //       clearInterval(intervalId);
  //       $squares.removeClass('active');
  //     }
  //   }, 1000);
  // // })
  // const startButton = document.getElementById('startButton');
  // const timerDisplay = document.getElementsByClassName('timer');
  //
  // let i = 0;
  //
  // startButton.addEventListener('click', startTimer(){
  //   const interval = setInterval(function() {
  //     console.log('timer should start!');
  //     i = i + 1;
  //     timerDisplay.textContent = i;
  //     // if (i === -1) {
  //     // //   clearInterval(interval);
  //     // }
  //   }, 1000);
  // }

  //try and get the timer to work !!!!!!!!!





  //
  // let intervalId;
  // let i=0;
  //
  // startButton.addEventListener('click', function() {
  //   intervalId = setInterval(function() {
  //     timerDisplay.textContent[i];
  //     i = i +1;
  //   }, 1000);
  //


  function resetBoxList() {
    boxes = document.querySelectorAll('.boxes');
  }

  function randomizeBoxPositions() {
    const orderedBoxes = Array.from(boxes);

    /*
    * Loop over the index of each box, and randomly choose another index (could be the same index) to swap it with.
    * */
    for (let i = orderedBoxes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = orderedBoxes[i];

      orderedBoxes[i] = orderedBoxes[j];
      orderedBoxes[j] = temp;
    }

    orderedBoxes.forEach(box => parent.appendChild(box));
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

// IDs for the array - checkForWin function
// const box1 = document.getElementById('box1');
// const box2 = document.getElementById('box2');
// const blank = document.getElementById('blank');
// const box3 = document.getElementById('box3');
// const box4 = document.getElementById('box4');
// const box5 = document.getElementById('box5');
// const box6 = document.getElementById('box6');
// const box7 = document.getElementById('box7');
// const box8 = document.getElementById('box8');
// const boxes = document.getElementsByClassName('boxes');
// console.log(boxes);
//
// const arrayOfBoxIds = [box1, box2, blank, box3, box4, box5, box6, box7, box8];
// console.log(arrayOfBoxIds);
//
// function checkForWin() {
//   if(Array.from(boxes) === arrayOfBoxIds) {
//     return true;
//   }
// }
// //create object with name and index and image

//make object for each picture
//create an array of images and put them in array adn then it can randomly generate in the arrayOfBoxIds
//in
