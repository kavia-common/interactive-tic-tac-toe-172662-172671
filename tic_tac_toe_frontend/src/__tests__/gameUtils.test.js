import { calculateWinner, getLines, isDraw, nextPlayer } from '../utils/gameUtils';

test('getLines returns 8 winning lines', () => {
  const lines = getLines();
  expect(Array.isArray(lines)).toBe(true);
  expect(lines).toHaveLength(8);
});

test('calculateWinner detects row win', () => {
  const board = ['X', 'X', 'X', null, null, null, null, null, null];
  const res = calculateWinner(board);
  expect(res).toEqual({ winner: 'X', line: [0,1,2] });
});

test('calculateWinner detects column win', () => {
  const board = ['O', null, null, 'O', null, null, 'O', null, null];
  const res = calculateWinner(board);
  expect(res).toEqual({ winner: 'O', line: [0,3,6] });
});

test('calculateWinner detects diagonal win', () => {
  const board = ['X', null, null, null, 'X', null, null, null, 'X'];
  const res = calculateWinner(board);
  expect(res).toEqual({ winner: 'X', line: [0,4,8] });
});

test('calculateWinner returns null when no winner', () => {
  const board = [null, null, null, null, null, null, null, null, null];
  const res = calculateWinner(board);
  expect(res).toBeNull();
});

test('isDraw returns true for full board without winner', () => {
  const board = ['X','O','X','X','O','O','O','X','X']; // no winner
  expect(isDraw(board)).toBe(true);
});

test('nextPlayer returns X when xIsNext=true, O otherwise', () => {
  expect(nextPlayer(true)).toBe('X');
  expect(nextPlayer(false)).toBe('O');
});
