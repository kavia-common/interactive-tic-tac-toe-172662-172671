import { useEffect, useMemo, useState } from 'react';
import { calculateWinner, isDraw as isDrawUtil, nextPlayer } from '../utils/gameUtils';

const STORAGE_KEY = 'tictactoe_scores_v1';

// Safe localStorage helpers (guard for tests/SSR)
function readStorage(key, fallback) {
  try {
    const v = window?.localStorage?.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    window?.localStorage?.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage issues
  }
}

// PUBLIC_INTERFACE
export function useTicTacToe() {
  /**
   * Manage tic-tac-toe board state, scores and actions.
   * Returns state fields and handlers to be used by UI components.
   */
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState(() => readStorage(STORAGE_KEY, { X: 0, O: 0 }));

  const winnerInfo = useMemo(() => calculateWinner(board), [board]);
  const winner = winnerInfo?.winner ?? null;
  const winningLine = winnerInfo?.line ?? [];
  const draw = useMemo(() => isDrawUtil(board), [board]);
  const currentPlayer = useMemo(() => nextPlayer(xIsNext), [xIsNext]);

  useEffect(() => {
    writeStorage(STORAGE_KEY, scores);
  }, [scores]);

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    /** Handles click on a square; ignores if occupied, winner exists, or draw */
    if (board[index] || winner || draw) return;
    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const resetBoard = () => {
    /** Clears the board and resets turn to X */
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  // PUBLIC_INTERFACE
  const newMatch = () => {
    /**
     * Starts a new match and updates the scores based on the last result.
     * If last game had a winner, increments that player's score.
     */
    if (winner) {
      setScores((s) => ({ ...s, [winner]: (s[winner] || 0) + 1 }));
    }
    resetBoard();
  };

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return 'Draw game';
    return `Next player: ${currentPlayer}`;
  }, [winner, draw, currentPlayer]);

  return {
    board,
    xIsNext,
    scores,
    winner,
    winningLine,
    isDraw: draw,
    currentPlayer,
    statusText,
    handleSquareClick,
    resetBoard,
    newMatch,
  };
}
