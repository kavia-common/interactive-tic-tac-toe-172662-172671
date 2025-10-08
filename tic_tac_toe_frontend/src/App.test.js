import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders 9 board buttons and plays a game with winner detection and reset', () => {
  render(<App />);

  const squares = screen.getAllByRole('button', { name: /row/i });
  expect(squares).toHaveLength(9);

  const status = screen.getByTestId('status-text');
  expect(status).toHaveTextContent(/Next player: X/i);

  // X moves
  fireEvent.click(squares[0]); // X
  expect(status).toHaveTextContent(/Next player: O/i);

  // O moves
  fireEvent.click(squares[3]); // O
  expect(status).toHaveTextContent(/Next player: X/i);

  // X moves
  fireEvent.click(squares[1]); // X
  // O moves
  fireEvent.click(squares[4]); // O

  // X winning move
  fireEvent.click(squares[2]); // X wins row 0
  expect(status).toHaveTextContent(/Winner: X/i);

  // Further clicks should be ignored
  fireEvent.click(squares[5]);
  expect(status).toHaveTextContent(/Winner: X/i);

  // Reset the board
  const resetBtn = screen.getByRole('button', { name: /Reset the current board/i });
  fireEvent.click(resetBtn);

  expect(status).toHaveTextContent(/Next player: X/i);
});
