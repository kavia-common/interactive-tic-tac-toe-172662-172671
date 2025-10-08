//
// Utility functions for Tic-Tac-Toe game logic
//

// PUBLIC_INTERFACE
export function getLines() {
  /** Returns all possible winning lines as arrays of board indices. */
  return [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];
}

// PUBLIC_INTERFACE
export function calculateWinner(board) {
  /**
   * Calculate the winner of a given board.
   * @param {Array} board - Array of 9 values: 'X','O', or null
   * @returns {{winner: 'X'|'O', line: number[]} | null}
   */
  const lines = getLines();
  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function isDraw(board) {
  /**
   * Returns true if the board is full and there is no winner.
   * @param {Array} board
   * @returns {boolean}
   */
  return board.every((cell) => cell !== null) && !calculateWinner(board);
}

// PUBLIC_INTERFACE
export function nextPlayer(xIsNext) {
  /**
   * Returns the symbol for the next player.
   * @param {boolean} xIsNext
   * @returns {'X'|'O'}
   */
  return xIsNext ? 'X' : 'O';
}
