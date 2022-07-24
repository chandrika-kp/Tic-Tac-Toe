const cells = document.querySelectorAll(".cell");
const Player_1 = 'X';
const Player_2 = 'O';
let turn = Player_1;

const BoardState = Array(cells.length);
BoardState.fill(null);

// Elements

const strike = document.getElementById("strike");
const GameOver = document.getElementById("GameOver");
const winning_Text = document.getElementById("winning_Text");
const PlayAgain = document.getElementById("re-start");
PlayAgain.addEventListener("click", startNewGame);

const GameOversound = new Audio('sounds/gameover.wav');
const ClickSound1 = new Audio('sounds/click.wav');
const ClickSound2 = new Audio('sounds/player2.wav');

cells.forEach((cell) => cell.addEventListener("click", cellClick));


function setHoverText() {
  // remove hovers
  cells.forEach((cell) => {
    cell.classList.remove("x-hover");
    cell.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  cells.forEach((cell) => {
    if (cell.innerText == "") {
      cell.classList.add(hoverClass);
    }
  });

}


setHoverText();


function cellClick(event) {
  if (GameOver.classList.contains('visible')) {
    return;
  }
  const cell = event.target;
  const cellNo = cell.dataset.index;
  if (cell.innerText != "") {
    return;
  }
  if (turn === Player_1) {
    cell.innerText = Player_1;
    BoardState[cellNo - 1] = Player_1;
    turn = Player_2;
    ClickSound1.play();
  }
  else {
    cell.innerText = Player_2;
    BoardState[cellNo - 1] = Player_2;
    turn = Player_1;
    ClickSound2.play();
  }
  setHoverText();
  CheckWinner();
}

function startNewGame() {
  strike.className = "strike";
  GameOver.className = "hidden";
  BoardState.fill(null);
  cells.forEach((cell) => (cell.innerText = ""));
  turn = Player_1;
  setHoverText();
}



function CheckWinner() {
  // check winner
  for (const WinningChance of WinningChances) {
    // const comb = WinningChance.comb;
    // const strikeClass = WinningChance.strikeClass;
    const { comb, strikeClass } = WinningChance;
    const cellvalue1 = BoardState[comb[0] - 1];
    const cellvalue2 = BoardState[comb[1] - 1];
    const cellvalue3 = BoardState[comb[2] - 1];

    if (cellvalue1 != null &&
      cellvalue1 === cellvalue2 &&
      cellvalue1 === cellvalue3
    ) {
      strike.classList.add(strikeClass);
      ShowGameOver(cellvalue1);
      return;
    }
  }
  // Draw
  const allcellsfilled = BoardState.every((cell) => cell !== null);
  if (allcellsfilled) {
    ShowGameOver(null);

  }
}


function ShowGameOver(winnerText) {
  let text = "It's a draw!!!! \n Fight again 😜";
  if (winnerText != null) {
    text1 = `Winner is ${winnerText} ! `;
    text2 = `Congratulations buddy you did it!!!🏆`;
    text = text1 + '\n' + text2
  }
  GameOver.className = 'visible';
  winning_Text.innerText = text;
  GameOversound.play();
}


// winning combinations

const WinningChances = [
  { comb: [1, 2, 3], strikeClass: "strike-row1" },
  { comb: [4, 5, 6], strikeClass: "strike-row2" },
  { comb: [7, 8, 9], strikeClass: "strike-row3" },

  { comb: [1, 4, 7], strikeClass: "strike-col1" },
  { comb: [2, 5, 8], strikeClass: "strike-col2" },
  { comb: [3, 6, 9], strikeClass: "strike-col3" },

  { comb: [1, 5, 9], strikeClass: "strike-diag1" },
  { comb: [3, 5, 7], strikeClass: "strike-diag2" },

];






