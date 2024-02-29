import { useState } from 'react';

function Square({value, onSquareClick}) {  
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({ isXNext, squares, onPlay }) {
  //const [isXNext, setIsXNext] = useState(true);
  //const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(squareIndex) {
    if(calculateWinner(squares) || squares[squareIndex])
      return;
    
    const newSquareValues = squares.slice();
    isXNext?newSquareValues[squareIndex] = 'X':newSquareValues[squareIndex] = 'O';
    //setSquares(newSquareValues);
    //setIsXNext(!isXNext);
    onPlay(newSquareValues);
  }

  const winner = calculateWinner(squares);
  let result;
  if (winner) {
    result = 'Winner: ' + winner;
  } else {
    result = 'Next player: ' + (isXNext ? 'X' : 'O');
  }

  return(
    <>
      <div className="status">{result}</div>
      <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isXNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(newSquareValues){
    const nextHistory = [...history.slice(0, currentMove + 1), newSquareValues];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(moveToJump) {
    setCurrentMove(moveToJump);
  }

  const moves = history.map((squaresOnMoveNo,moveNo)=>{
    let description;
    if (moveNo > 0) {
      description = 'Go to move #' + moveNo;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={moveNo}>
        <button onClick={() => jumpTo(moveNo)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
