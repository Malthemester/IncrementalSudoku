import './App.css';
import Sudoku from './Components/sudoku'
import NumberInput from './Components/numberInput'
import Solved from './Components/solved'
import { MakeSudoku, RemoveNumbers, CheckSukoku } from './HelperFunctions/generatorSudoku'
import { react, useEffect, useState } from "react"

let seleNumber = 1

function App() {
  const [selectedNumber, SetSelectedNumber] = useState(seleNumber)

  const [size, SetSize] = useState(4)
  const [squares, SetSquares] = useState(2)
  const [gameBoard, SetGameBoard] = useState(Array(size).fill(Array(size).fill(null)))

  const [solved, SetSolved] = useState(false)

  useEffect(() => {

    SetSolved(CheckSukoku(size, gameBoard, squares))

  }, [gameBoard])


  useEffect(() => {
    let newBoard = MakeSudoku(size, squares)
    newBoard = RemoveNumbers(newBoard, 5)
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

  const newBoard = (newBoard) => {
    SetGameBoard(newBoard)
  }

  useEffect(() => {
    const handleInput = (e) => {
      if (e.key <= size && e.key != 0) {
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
      <NumberInput selectedNumber={selectedNumber} size={size} callBack={handleNumberClick} />
      <p>
        <Sudoku
          size={size}
          squares={squares}
          callBack={handleClick}
          value={gameBoard}
        ></Sudoku>
      </p>
      <Solved solved={solved}></Solved>
    </div>
  )
}

export default App;
