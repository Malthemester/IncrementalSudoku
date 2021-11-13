function SaveBoard(board, key) {

    let saveValue = `${board.length}::${board}`

    localStorage.setItem(key, saveValue)
}

function SaveResources(key, value) {
    localStorage.setItem(key, value)
}

function LoadResources(key) {
    return Number(localStorage.getItem(key))
}

function LoadSolution(key) {
    return localStorage.getItem(key)
}

function LocalToArray(value) {
    let lengthValue = value.split('::')

    if (lengthValue.length <= 1) {
        return null
    }

    let length = lengthValue[0]

    let splitValue = lengthValue[1].split(',')

    let count = 0
    let newBoard = []
    for (let i = 0; i < length; i++) {
        newBoard.push([])
        for (let j = 0; j < length; j++) {
            newBoard[i].push(String(splitValue[count]))
            count++
        }
    }

    return newBoard
}

export { SaveBoard, LocalToArray, SaveResources, LoadResources , LoadSolution}