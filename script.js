const tileContainer = document.querySelector('.tile-container');
const keyContainer = document.querySelector('.keyboard-container');
const messageDisplay = document.querySelector('.message-container');

//build guessRows and append to 'tile-container'
const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

guessRows.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement('div');
  rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);
  //for each row, build tiles and append to the row
  guessRow.forEach((guess, guessIndex) => {
    const tileElement = document.createElement('div');
    tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
    tileElement.classList.add('tile');
    rowElement.append(tileElement);
  });
  tileContainer.append(rowElement);
});

//build keyboard elements and appand them to 'keyboards-container'  div

const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  '«',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',

  'ENTER',
];
keys.forEach((key) => {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = key;
  buttonElement.setAttribute('id', key);
  buttonElement.addEventListener('click', () => handleClick(key));
  keyContainer.append(buttonElement);
});
let currentRow = 0;
let currentTile = 0;

const word = 'TESTS';
const wordArray = [...word];

//handle button clicks
function handleClick(key) {
  console.log(`${key} was clicked`);

  if (currentRow >= 5) {
    showMessage(`Game over`);
  } else if (key === '«') {
    backSpace();
  } else if (key === 'ENTER') {
    submit(guessRows[currentRow]);
  } else if (currentTile <= 4) {
    const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
    guessRows[currentRow].splice(currentTile, 1, key);
    tile.textContent = key;
    tile.setAttribute('data', key);

    currentTile++;
  }
}

function submit(guess) {
  console.log(guess, wordArray);
  let win = guess.join('').toUpperCase() === word.toUpperCase();

  if (currentTile != 5) {
    showMessage('Not enough letters!');
  } else {
    if (!win) {
      //TODO: compare word and guess array elemets and color tiles apropriately
      showMessage(`Incorrect`);
      flipTile();

      currentTile = 0;
      currentRow++;
    } else {
      flipTile();
      showMessage(`winner! ${word.toUpperCase()} was the correct word`);
    }
    console.log(`Enter was pressed`);
  }
}

function backSpace() {
  console.log(`Backspace was presed`);

  if (currentTile <= 0) {
    currentTile === 0;
  } else {
    const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile - 1}`);
    guessRows[currentRow].splice(currentTile - 1, 1, '');
    tile.textContent = '';
    tile.setAttribute('data', '');
    currentTile--;
  }
}

//Message popup
function showMessage(message) {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => messageDisplay.removeChild(messageElement), 3000);
}

function flipTile() {
  let tiles = document.getElementById('guessRow-' + currentRow).childNodes;
  //console.log(tiles);
  tiles.forEach((tile, index) => {
    const tileLetter = tile.getAttribute('data');

    if (tileLetter == wordArray[index]) {
      tile.classList.add('green-overlay');
    } else if (wordArray.includes(tileLetter)) {
      tile.classList.add('yellow-overlay');
    } else {
      tile.classList.add('grey-overlay');
    }
  });
}
