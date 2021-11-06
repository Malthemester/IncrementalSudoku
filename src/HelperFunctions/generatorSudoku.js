function FillArray(size) {
    const fullNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return fullNumberList.splice(0, size)
}

function CheckRowAndCulumn(arrayIndex, board, size) {
    let checkRow = FillArray(size)
    let checkColumn = FillArray(size)

    for (let i = 0; i < size; i++) {
        checkRow = checkRow.filter(number => number != board[arrayIndex][i])
        checkColumn = checkColumn.filter(number => number != board[i][arrayIndex])
    }

    return checkRow.length == 0 && checkColumn.length == 0 ? true : false
}

function CheckSquare(board, size, squareSize, squareX, squareY) {
    let checkSquare = FillArray(size)

    for (let i = 0; i < squareSize; i++) {
        for (let j = 0; j < squareSize; j++) {
            checkSquare = checkSquare.filter(number => number != board[i + squareY][j + squareX])
        }
    }
    return checkSquare.length == 0 ? true : false
}

function CheckSukoku(size, board, squares) {
    for (let i = 0; i < size; i++) {
        if (!CheckRowAndCulumn(i, board, size))
            return false
    }

    for (let i = 0; i < squares; i++) {
        for (let j = 0; j < squares; j++) {
            if (!CheckSquare(board, size, squares, i * squares, j * squares))
                return false
        }
    }
    return true
}

function MakeSudoku(size, square) {
    let numArry = FillArray(size)
    let newBoard = Array(size).fill(null).map(() => Array(size).fill(numArry))
    let pickerArr = [[Math.floor(Math.random() * size), Math.floor(Math.random() * size)]]
    let pickerIndex = []

    let index, randomNumber, randomIndexNumber

    let notFull = true
    while (notFull) {

        pickerArr.sort((arr1, arr2) => arr1.length - arr2.length)

        index = 0
        if (pickerArr.length > 0) {

            if (newBoard[pickerArr[index][0]][pickerArr[index][1]].length > 1) {

                randomIndexNumber = Math.floor(Math.random() * newBoard[pickerArr[index][0]][pickerArr[index][1]].length)
                randomNumber = newBoard[pickerArr[index][0]][pickerArr[index][1]][randomIndexNumber]

                newBoard[pickerArr[index][0]][pickerArr[index][1]] = [randomNumber]
                RemovePencelmark(pickerArr[index][0], pickerArr[index][1], newBoard, size, randomNumber, (square / size), pickerIndex, pickerArr)
            }
            pickerArr.splice(index, 1)
            pickerIndex.splice(index, 1)

        }

        if (pickerArr.length <= 0) {
            notFull = false
        }
    }

    if (!CheckSukoku(size, newBoard, square)) {
        return MakeSudoku(size, square)
    }

    return newBoard
}

function RemovePencelmark(rowID, culumnID, newBoard, size, randomNumber, squareSize, pickerIndex, pickerArr) {

    for (let i = 0; i < size; i++) {
        if (newBoard[rowID][i].length > 1) {
            newBoard[rowID][i] = newBoard[rowID][i].filter(number => number != randomNumber)

            if (newBoard[rowID][i].length <= 1) {
                RemovePencelmark(rowID, i, newBoard, size, newBoard[rowID][i][0], squareSize, pickerIndex, pickerArr)

                if (pickerIndex.includes(`${rowID}${i}`)) {
                    pickerArr.splice(pickerIndex.indexOf(`${rowID}${i}`), 1)
                    pickerIndex.splice(pickerIndex.indexOf(`${rowID}${i}`), 1)
                }
            }
            else if (!pickerIndex.includes(`${rowID}${i}`)) {
                pickerIndex.push(`${rowID}${i}`)
                pickerArr.push([rowID, i])
            }
        }

        if (newBoard[i][culumnID].length > 1) {
            newBoard[i][culumnID] = newBoard[i][culumnID].filter(number => number != randomNumber)

            if (newBoard[i][culumnID].length <= 1) {
                RemovePencelmark(i, culumnID, newBoard, size, newBoard[i][culumnID][0], squareSize, pickerIndex, pickerArr)

                if (pickerIndex.includes(`${i}${culumnID}`)) {
                    pickerArr.splice(pickerIndex.indexOf(`${i}${culumnID}`), 1)
                    pickerIndex.splice(pickerIndex.indexOf(`${i}${culumnID}`), 1)
                }
            }
            else if (!pickerIndex.includes(`${i}${culumnID}`)) {
                pickerIndex.push(`${i}${culumnID}`)
                pickerArr.push([i, culumnID])
            }
        }
    }

    let curSquareY = Math.floor(rowID / squareSize) * squareSize
    let curSquareX = Math.floor(culumnID / squareSize) * squareSize

    for (let i = 0; i < squareSize; i++) {
        for (let j = 0; j < squareSize; j++) {
            if (newBoard[i + curSquareY][j + curSquareX].length > 1) {
                newBoard[i + curSquareY][j + curSquareX] = newBoard[i + curSquareY][j + curSquareX].filter(number => number != randomNumber)

                if (newBoard[i + curSquareY][j + curSquareX].length <= 1) {
                    RemovePencelmark(i + curSquareY, j + curSquareX, newBoard, size, newBoard[i + curSquareY][j + curSquareX][0], squareSize, pickerIndex, pickerArr)

                    if (pickerIndex.includes(`${i + curSquareY}${j + curSquareX}`)) {
                        pickerArr.splice(pickerIndex.indexOf(`${i + curSquareY}${j + curSquareX}`), 1)
                        pickerIndex.splice(pickerIndex.indexOf(`${i + curSquareY}${j + curSquareX}`), 1)
                    }
                }
                else if (!pickerIndex.includes(`${i + curSquareY}${j + curSquareX}`)) {
                    pickerIndex.push(`${i + curSquareY}${j + curSquareX}`)
                    pickerArr.push([i + curSquareY, j + curSquareX])
                }
            }
        }
    }
}

function RemoveNumbers(board, remove) {

    let size = board.length
    let randomIndex = RandomNewIndex(size, remove)

    randomIndex.forEach(index => {
        let removeIndex = GetIndex(size, index)
        board[removeIndex[0]][removeIndex[1]] = []
    });

    return board
}

function RandomNewIndex(size, remove) {
    let arrOfIndex = []
    let removeIndex = []

    for (let i = 0; i < size * size; i++) {
        arrOfIndex.push(i)
    }

    arrOfIndex.sort(() => (Math.random() > 0.5) ? 1 : -1);

    for (let i = 0; i < remove; i++) {
        removeIndex.push(arrOfIndex[i])
    }

    return removeIndex
}

function GetIndex(size, number) {
    let row = Math.floor(number / size)
    let culumn = number % size
    return [row, culumn]
}



export { MakeSudoku, RemoveNumbers, CheckSukoku, FillArray, CheckSquare, CheckRowAndCulumn}