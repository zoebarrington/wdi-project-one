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

//SIDE BUTTONS SECTION

//audio button
audioButton.addEventListener('click', () => {
  audio.play();
});

//refresh button and function
refreshButton.addEventListener('click', refresh);
function refresh() {
  window.location.reload();
}

//auto complete button
autoCompleteButton.addEventListener('click', () => {
  isDemo = !isDemo;
});
let isDemo = false;

//initialize puzzle function
function initializePuzzle(numberOfSquaresPerSide) {
  const parent = document.querySelector('.grid');

  resetBoxList();
  randomizeBoxPositions();

  Array.from(boxes)
    .filter(box => box.id !== 'blank')
    .forEach(box => box.addEventListener('click', scoreGoesUp));

//Score count
  function scoreGoesUp() {
    console.log('score should go up!');
    const scoreDisplay = document.getElementById('score');
    scoreValue = scoreValue + 1;
    scoreDisplay.textContent = scoreValue;
  }
  if (!isClickEventAttached) {

    Array.from(boxes)
      .filter(box => box.id !== 'blank')
      .forEach(box => box.addEventListener('click', onClick));
    isClickEventAttached = true;
  }

  function onClick(event) {

    const clickedBox = event.currentTarget;

    console.log('click', boxes);

//checking if the boxes have returned to their original location
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


//resetting the jumbled pieces back to their original places
//splices
  function resetBoxList() {
    boxes.splice(0, 9, ...Array.from(document.querySelector('.grid').childNodes).filter(({tagName}) => tagName === 'DIV'));
  }


//shuffling the pieces of the puzzle
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

  //Need to see if the clicked box is on one of the edges of the puzzle, because we are looking on all four
  //sides of it (above, below, left and right) to see if one of those is the Blank square. If the clicked box
  //is on the edge, we don't want to look for the blank box off the edge.
  //For example, if we click on the top row we don't want to look above that box because there are no boxes there.

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
