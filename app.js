let scoreValue = 0;
initializePuzzle(3);

function initializePuzzle(numberOfSquaresPerSide) {
  const parent = document.querySelector('.grid');
  let boxes = [];

  resetBoxList();
  randomizeBoxPositions();

  Array.from(boxes)
    .filter(box => box.id !== 'blank')
    .forEach(box => box.addEventListener('click', scoreGoesUp));

  function scoreGoesUp(event) {
    console.log('score should go up!');
    const scoreDisplay = document.getElementById('score');
    scoreValue = scoreValue + 1;
    scoreDisplay.textContent = scoreValue;
  }

  Array.from(boxes)
  .filter(box => box.id !== 'blank')
  .forEach(box => box.addEventListener('click', onClick));

  function onClick(event) {

    const clickedBox = event.currentTarget;

    const indexOfBox = Array.from(boxes).findIndex(box => box === clickedBox);

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
  }

startButton.addEventListener() {
  function resetBoxList() {
    boxes = document.querySelectorAll('.boxes');
  }

  function randomizeBoxPositions() {
    const orderedBoxes = Array.from(boxes);

    for (let i = orderedBoxes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = orderedBoxes[i];

      orderedBoxes[i] = orderedBoxes[j];
      orderedBoxes[j] = temp;
    }

    orderedBoxes.forEach(box => parent.appendChild(box));
    resetBoxList();
  }
}

  function isTopRow(indexOfBox) {
    return indexOfBox < numberOfSquaresPerSide;
  }


  function isBottomRow(indexOfBox) {
    return indexOfBox >= numberOfSquaresPerSide ** 2 - numberOfSquaresPerSide;
  }

  function isLeftRow(indexOfBox) {
    return indexOfBox % numberOfSquaresPerSide === 0;
  }

  function isRightRow(indexOfBox) {
    return indexOfBox % numberOfSquaresPerSide === numberOfSquaresPerSide - 1;
  }

  function isBlankSquare(indexOfBox) {
    return boxes[indexOfBox].id === 'blank';
  }

  function swapPlaces(index1, index2) {
    const box1 = boxes[index1];
    const box2 = boxes[index2];


    parent.insertBefore(box2, box1);

    resetBoxList();


    if (index1 < index2) {

      if (index2 === numberOfSquaresPerSide ** 2 - 1) {

        parent.appendChild(box1);
      } else {

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