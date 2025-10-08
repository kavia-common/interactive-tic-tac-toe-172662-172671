import React from 'react';
import './App.css';
import './index.css';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import ThemeToggle from './components/ThemeToggle';
import { useTicTacToe } from './hooks/useTicTacToe';

// PUBLIC_INTERFACE
function App() {
  /**
   * Application entry point for Tic-Tac-Toe. Renders the board, status, controls,
   * scoreboard, and theme toggle with Ocean Professional styling.
   */
  const {
    board,
    winner,
    winningLine,
    isDraw,
    statusText,
    handleSquareClick,
    resetBoard,
    newMatch,
    scores,
  } = useTicTacToe();

  const disabledAll = Boolean(winner || isDraw);

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-content">
          <h1 className="title">Tic-Tac-Toe</h1>
          <ThemeToggle />
        </div>
        <div className="banner" aria-hidden="true" />
      </header>

      <main className="main">
        <section className="game-area">
          <Scoreboard scores={scores} onNewMatch={newMatch} />
          <Board
            board={board}
            onSquareClick={handleSquareClick}
            disabledAll={disabledAll}
            winningLine={winningLine}
          />

          <div
            className="status"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            data-testid="status-text"
          >
            {statusText}
          </div>

          <div className="controls">
            <button
              className="btn"
              type="button"
              onClick={resetBoard}
              aria-label="Reset the current board"
            >
              Reset Board
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={newMatch}
              aria-label="Start a new match and update scores"
            >
              New Match
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
