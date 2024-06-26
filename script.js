const puzzles = [
  [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  [
      [0, 0, 1, 7, 6, 0, 0, 0, 0],
      [0, 0, 0, 0, 8, 0, 2, 5, 0],
      [8, 2, 0, 4, 0, 9, 0, 1, 0],
      [0, 9, 0, 5, 1, 0, 0, 3, 0],
      [2, 1, 0, 0, 3, 6, 7, 0, 0],
      [0, 5, 0, 8, 0, 4, 0, 9, 0],
      [9, 6, 0, 0, 0, 0, 0, 0, 8],
      [1, 0, 5, 6, 7, 0, 4, 0, 0],
      [0, 7, 4, 2, 9, 0, 5, 0, 1],
  ],
  [
      [2, 0, 0, 0, 0, 0, 0, 0, 6],
      [0, 6, 0, 1, 9, 5, 0, 0, 0],
      [0, 0, 0, 0, 8, 0, 0, 6, 0],
      [0, 0, 0, 0, 6, 0, 0, 0, 0],
      [0, 5, 0, 8, 0, 3, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 0],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  [
      [4, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 7, 0, 3, 0, 0, 0, 4],
      [0, 8, 0, 0, 5, 0, 7, 0, 0],
      [0, 1, 0, 0, 9, 0, 8, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 7, 0, 0, 0, 3, 0, 2, 0],
      [1, 6, 0, 0, 0, 2, 0, 0, 8],
      [0, 3, 0, 0, 0, 1, 9, 0, 0],
      [0, 0, 0, 0, 0, 6, 4, 0, 0],
  ],
];

let currentPuzzleIndex = 0;

function initializeBoard() {
  const board = puzzles[currentPuzzleIndex];
  const boardTable = document.getElementById('sudoku-board');
  boardTable.innerHTML = '';
  for (let i = 0; i < 9; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < 9; j++) {
          const cell = document.createElement('td');
          const input = document.createElement('input');
          input.type = 'text';
          input.maxLength = 1;
          if (board[i][j] !== 0) {
              input.value = board[i][j];
              input.disabled = true;
          }
          cell.appendChild(input);
          row.appendChild(cell);
      }
      boardTable.appendChild(row);
  }
}

function isValid(board, num, r, c) {
  for (let i = 0; i < 9; i++) {
      if (board[i][c] === num || board[r][i] === num) return false;
      const boxRow = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(c / 3) + (i % 3);
      if (board[boxRow][boxCol] === num) return false;
  }
  return true;
}

function solve(board) {
  for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
          if (board[r][c] === 0) {
              for (let num = 1; num <= 9; num++) {
                  if (isValid(board, num, r, c)) {
                      board[r][c] = num;
                      if (solve(board)) return true;
                      board[r][c] = 0;
                  }
              }
              return false;
          }
      }
  }
  return true;
}

function solveSudoku() {
  const boardTable = document.getElementById('sudoku-board');
  const board = [];
  for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
          const value = boardTable.rows[i].cells[j].firstChild.value;
          row.push(value ? parseInt(value) : 0);
      }
      board.push(row);
  }
  solve(board);
  for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          boardTable.rows[i].cells[j].firstChild.value = board[i][j];
      }
  }
}

function nextPuzzle() {
  currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
  initializeBoard();
}

document.addEventListener('DOMContentLoaded', initializeBoard);