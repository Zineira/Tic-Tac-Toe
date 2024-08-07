import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = gameWinner(squares);
  let gameStatus;
  if (winner) {
    gameStatus = "Winner " + winner;
  } else {
    gameStatus = "Next Player: " + (xIsNext ? "X" : "O");
  }
  function handleClick(i) {
    if (squares[i] || gameWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  const board = [];
  for (let i = 0; i < squares.length; i += 3) {
    const row = (
      <div className="board-row" key={i}>
        <Square value={squares[i]} onSquareClick={() => handleClick(i)} />
        <Square
          value={squares[i + 1]}
          onSquareClick={() => handleClick(i + 1)}
        />
        <Square
          value={squares[i + 2]}
          onSquareClick={() => handleClick(i + 2)}
        />
      </div>
    );
    board.push(row);
  }
  return (
    <div className="game-board">
      <div className="game-status">{gameStatus}</div>
      <div className="board">{board}</div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    console.log({ move });
    return (
      <li key={move}>
        <button className="history" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div class-Name="game-row">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

function gameWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
