import './App.css';
import Sudoku from './Components/sudoku'
import NumberInput from './Components/numberInput'
import Solved from './Components/solved'
import { MakeSudoku, RemoveNumbers, CheckSukoku } from './HelperFunctions/generatorSudoku'
import { useEffect, useState } from "react"
import Header from './Components/header'

let seleNumber = 1

function App() {
  const [selectedNumber, SetSelectedNumber] = useState(seleNumber)

  const [size, SetSize] = useState(4)
  const [squares, SetSquares] = useState(2)
  const [gameBoard, SetGameBoard] = useState(Array(size).fill(Array(size).fill(null)))

  let remove = 1

  const [solved, SetSolved] = useState(false)

  useEffect(() => {

    SetSolved(CheckSukoku(size, gameBoard, squares))

  }, [gameBoard])


  function NewGame(size, squares) {
    let newBoard = MakeSudoku(size, squares)
    newBoard = RemoveNumbers(newBoard, remove)
    SetGameBoard(newBoard)
  }

  useEffect(() => {
    NewGame(size, squares);
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
      <Header></Header>
      <div className="game">
        <NumberInput selectedNumber={selectedNumber} size={size} callBack={handleNumberClick} />

        <div className="sudoku" >
          <Sudoku
            size={size}
            squares={squares}
            callBack={handleClick}
            value={gameBoard}
          ></Sudoku>
          <Solved solved={solved} newGame={NewGame}></Solved>
        </div>

      </div>
    </div>
  )
}

export default App;
