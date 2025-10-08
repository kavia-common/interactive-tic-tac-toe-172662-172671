import React from 'react';

/**
 * Returns the aria-label for a square based on its content and coordinates.
 */
function getAriaLabel(value, row, col) {
  if (!value) {
    return `Place X or O at row ${row} column ${col}`;
  }
  return `Cell row ${row} column ${col} contains ${value}`;
}

// PUBLIC_INTERFACE
export default function Square({
  value,
  onClick,
  disabled,
  row,
  col,
  isWinning,
}) {
  /** A single square as a button with accessible labeling and focus ring. */
  const classes = [
    'ttt-square',
    value === 'X' ? 'is-x' : '',
    value === 'O' ? 'is-o' : '',
    isWinning ? 'is-winning' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="button"
      className={classes}
      aria-label={getAriaLabel(value, row, col)}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="ttt-square-content" aria-hidden="true">
        {value}
      </span>
    </button>
  );
}
