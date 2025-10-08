import React from 'react';
import Square from './Square';

// PUBLIC_INTERFACE
export default function Board({
  board,
  onSquareClick,
  disabledAll = false,
  winningLine = [],
}) {
  /** Renders a 3x3 grid of squares and highlights the winning line */
  const isWinningIndex = (i) => winningLine.includes(i);

  return (
    <div className="board" role="grid" aria-label="Tic-Tac-Toe board">
      {board.map((value, i) => {
        const row = Math.floor(i / 3) + 1;
        const col = (i % 3) + 1;
        const disabled = disabledAll || value !== null || winningLine.length > 0;
        return (
          <div role="row" className="board-row" key={`cell-${i}`}>
            <Square
              value={value}
              row={row}
              col={col}
              disabled={disabled}
              isWinning={isWinningIndex(i)}
              onClick={() => onSquareClick(i)}
            />
          </div>
        );
      })}
    </div>
  );
}
