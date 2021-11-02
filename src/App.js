import './App.css';
import Sudoku from './sudoku'
import NumberInput from './numberInput'
import MakeSudoku from './generatorSudoku'
import { react, useEffect, useState } from "react"

let seleNumber = 1

function App() {
  const [selectedNumber, SetSelectedNumber] = useState(seleNumber)

  const [size, SetSize] = useState(9)
  const [squares, SetSquares] = useState(3)
  const [gameBoard, SetGameBoard] = useState(Array(size).fill(Array(size).fill(null)))
  
  let solveBoard

  useEffect(() => {
    let tempGameBoard = []
    for (let i = 0; i < size; i++) {
      tempGameBoard.push([])
      for (let j = 0; j < size; j++) {
        tempGameBoard[i].push(null)
      }
    }
    solveBoard = tempGameBoard

    let newBoard = MakeSudoku(size, squares)

    SetGameBoard(newBoard)
  }, [])

  function handleClick(x, y) {

    if (gameBoard == null) {
      return
    }

    let tempGameBoard = [...gameBoard]
    tempGameBoard[x][y] = Number(seleNumber)
    SetGameBoard(tempGameBoard)
  }

  const handleNumberClick = (number) => {
    seleNumber = number.target.value
    SetSelectedNumber(number.target.value)
  }

  const newBoard = (newBoard) =>{
      SetGameBoard(newBoard)
  }

  useEffect(() => {
    const handleInput = (e) => {
      if  (e.key <= size && e.key != 0){
        SetSelectedNumber(e.key)
        seleNumber = e.key
      }

    }
    document.addEventListener("keydown", handleInput);

    return () => {
      document.removeEventListener("keydown", handleInput);
    };
  }, []);
  
  
  return (
    <div>
      <NumberInput selectedNumber={selectedNumber}  size={size} callBack={handleNumberClick} />
      <p>
        <Sudoku
          size={size}
          squares={squares}
          callBack={handleClick}
          value={gameBoard}
        ></Sudoku>
      </p>
    </div>
  )
}

export default App;
