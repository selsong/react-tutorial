import { useState, useEffect } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [selected, setSelected] = useState(false);
  const [movesCount, setMovesCount] = useState(0);

  function handleClick(i){
    if (calculateWinner(squares)) {
      return;
    }
    
    let newMovesCount = movesCount +1;
    const nextSquares = squares.slice();
    const currentSym = xIsNext ? 'X' : 'O';
    // for (let i = 0; i < nextSquares.length; i++) {
    //   console.log(`Square ${i}: ${nextSquares[i]}`);
    // }
    if (newMovesCount > 6){ //enter chorus lapilli
      console.log("enter chorus lapilli");
         // Handle first click to select
    if (selected == null){
      //if empty, return bc invalid
      if (!squares[i]){ 
        console.log(squares[i]);
        console.log("Select a non-empty square!"); 
        return;
      }
      if (squares[i] !== currentSym) //can't be opponents
      {
        console.log("Select your own marker."); 
        return;
      }
      else{
        //if center square occupied, must move center
        // if (squares[4] === currentSym){
        //   if (i !== 4){
        //     console.log("Must select center square");
        //     return;
        //   }
        // }
        setSelected(i); // Store the index of the selected square
        console.log(`Selected index: ${i}, value: ${squares[i]}`);
      }
    }
    else {
      // Handle second click to move
      //if you occupy center
      if (squares[4] === currentSym){
        if (!checkCenterMove(selected, i, currentSym, squares)){
          console.log("Center occupied. Must win or vacate center.");
          setSelected(null);
          return;
        }
      }
      //doesn't occupy center
      if (i !== selected && !squares[i] && isAdjacent(selected, i)) {
        nextSquares[i] = nextSquares[selected]; // Move piece to new square
        nextSquares[selected] = null; // Clear the old square
        setSquares(nextSquares);
        setXIsNext(!xIsNext); // Switch turns
        setMovesCount(newMovesCount); // Increment move count
        setSelected(null); // Reset the selection for next turn
    
      } else {
        console.log("Invalid move: Must move to an empty, adjacent square.");
        setSelected(null); // Reset the selection if the move is invalid
    
      }
    }
    }
    //otherwise operate as normal
    else{
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setMovesCount(newMovesCount);
    }
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
  
      <div className="status">{status}</div>
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
  );
}


    // const movesCount = squares.filter(val => val).length;
    
    // let center = 4; // Index of center square

    // if (movesCount >= 6) { // Check if we are in the moving phase
    //   if (selected === null && squares[i]) { // Select the piece to move
    //     onSelect(i);
      // }
      //if there is a piece in the center, you selected it
      //move it to dest if dest is not occupied

      //else: you didn't select it
      //return since you can't move

      //if no piece in center
      //select any piece
      //move to dest if dest is not occupied

    //   else if (selected !== null && isAdjacent(selected, i) && !squares[i]) { // Move to an empty, adjacent spot
    //     const nextSquares = squares.slice();
    //     nextSquares[i] = nextSquares[selected];
    //     nextSquares[selected] = null;
    //     onPlay(nextSquares);
    //     onSelect(null); // Reset selection
    //   }
    // } 
    
  //}
function isAdjacent(src, dest) {
  if (src === null || dest === null){
    return;
  }
  const srcRow = Math.floor(src / 3);
  const srcCol = src % 3;
  const destRow = Math.floor(dest / 3);
  const destCol = dest % 3;
  return Math.abs(srcRow - destRow) <= 1 && Math.abs(srcCol - destCol) <= 1;
}

function checkCenterMove(src, dest, symbol, squares){
  const nextSquares = squares.slice();
  nextSquares[dest] = nextSquares[src];
  nextSquares[src] = null;
  //either you win or the center square vacated
  return calculateWinner(nextSquares) || src === 4;
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}