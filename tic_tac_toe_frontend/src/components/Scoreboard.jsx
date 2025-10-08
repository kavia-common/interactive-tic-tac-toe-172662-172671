import React from 'react';

// PUBLIC_INTERFACE
export default function Scoreboard({ scores, onNewMatch }) {
  /** Displays current scores and provides a new match button. */
  return (
    <div className="scoreboard" aria-label="Scoreboard">
      <div className="score">
        <span className="badge badge-x" aria-label="Score for X">X</span>
        <span className="score-value">{scores.X ?? 0}</span>
      </div>
      <div className="score">
        <span className="badge badge-o" aria-label="Score for O">O</span>
        <span className="score-value">{scores.O ?? 0}</span>
      </div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onNewMatch}
        aria-label="Start a new match"
      >
        New Match
      </button>
    </div>
  );
}
