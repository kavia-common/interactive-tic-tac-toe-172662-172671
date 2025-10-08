import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('squares are buttons with aria-labels and status is aria-live=polite', () => {
  render(<App />);

  const squares = screen.getAllByRole('button', { name: /row/i });
  expect(squares).toHaveLength(9);

  squares.forEach((sq) => {
    expect(sq).toHaveAttribute('type', 'button');
    expect(sq.getAttribute('aria-label')).toMatch(/row \d column \d/i);
  });

  const status = screen.getByTestId('status-text');
  expect(status).toHaveAttribute('aria-live', 'polite');

  // play a move and ensure status updates
  fireEvent.click(squares[0]);
  expect(status.textContent).toMatch(/Next player: O/i);
});
