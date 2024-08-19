import React, { useState } from 'react';
import './App.css';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);

    const winnerInfo = calculateWinner(newSquares);
    if (winnerInfo) {
      setWinner(winnerInfo.winner);
      setWinningSquares(winnerInfo.squares);
      if (winnerInfo.winner === 'X') {
        setXScore(xScore + 1);
      } else {
        setOScore(oScore + 1);
      }
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const calculateWinner = (squares) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], squares: [a, b, c] };
      }
    }
    return null;
  };

  const renderSquare = (index) => (
    <button
      className={`square ${winningSquares.includes(index) ? 'winning' : ''} ${squares[index] === 'X' ? 'square-x' : squares[index] === 'O' ? 'square-o' : ''}`}
      onClick={() => handleClick(index)}
    >
      {squares[index]}
    </button>
  );

  return (
    <div className="game">
      <div className="status">{winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}</div>
      <div className="scoreboard">
        <div className="score">X: {xScore}</div>
        <div className="score">O: {oScore}</div>
      </div>
      <div className="board">
        {[0, 1, 2].map(i => (
          <React.Fragment key={i}>
            {renderSquare(i * 3)}
            {renderSquare(i * 3 + 1)}
            {renderSquare(i * 3 + 2)}
          </React.Fragment>
        ))}
      </div>
      <button onClick={() => {
        setSquares(Array(9).fill(null));
        setWinner(null);
        setWinningSquares([]);
        setXIsNext(true);
      }}>Reset Game</button>
    </div>
  );
};

export default App;
