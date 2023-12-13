const gameBoard = document.querySelector('#gameboard')
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let turn = 'white'
let allSquares = gameBoard.childNodes


// Event listeners functions

function dragStart (e, boardArrayPiece) {
    showValidMoves(e, boardArrayPiece)
    // e.preventDefault()
    draggedElement = e.target
    setTimeout(() => {draggedElement.classList.add('hide')}, 0)
    // e.target.parentNode.removeChild(draggedElement)
    // draggedElement.parentNode.removeChild
    console.log('drag started', draggedElement)
}

function updateBoardArray (arrPiece, newRow, newColumn) {
    let originalRow = arrPiece.position.row
    let originalColumn = arrPiece.position.column
    // let temp = currentBoardState[originalRow][originalColumn]
    currentBoardState[originalRow][originalColumn] = emptySquare
    arrPiece.position.row = newRow
    arrPiece.position.column = newColumn
    currentBoardState[newRow][newColumn] = arrPiece
}

function flipChessboard() {
    // let newChessboard = []
    console.log('Chess arr before flipping: ', currentBoardState[0][3])
    currentBoardState.reverse()
    currentBoardState.forEach(row => row.reverse())
    for (let row = 0; row<8; row++) {
        for (let column = 0; column<8; column++) {
            let arrPiece = currentBoardState[row][column]
            arrPiece.position.row = row
            arrPiece.position.column = column
        }
    }
    console.log('Chess arr after flipping: ', currentBoardState[0][3])

    console.log('allsquares: ',allSquares)

    allSquares.forEach((square) => {
        console.log(square)
        let tempRow = square.getAttribute('row')
        let tempColumn = square.getAttribute('column')
        square.setAttribute('row', Math.abs(Number(tempRow) - 7))
        square.setAttribute('column', Math.abs(Number(tempColumn) - 7))
    })

}

function dragDrop (e, boardArrayPiece) {
    e.preventDefault();

    draggedElement.parentNode.removeChild(draggedElement);
    e.target.appendChild(draggedElement);

    let newRow = e.target.getAttribute('row')
    let newColumn = e.target.getAttribute('column')

    boardArrayPiece.hasItMoved = true
    updateBoardArray(boardArrayPiece, newRow, newColumn)
    // console.log(currentBoardState)
    flipChessboard()

    if (turn == 'white') {
        turn = 'black'
    } else {
        turn = 'white'
    }


    console.log('drop started')
}

function dragOver(e) {
    e.preventDefault();
}




function dragEnd (e) {
    draggedElement.classList.remove('hide')
    hideValidMoves()
    console.log('ending drag ...')
}





// The following function is concerned with the main piece movement logic

function showValidMoves (e, boardArrayPiece) {
    let row = boardArrayPiece.position.row
    let column = boardArrayPiece.position.column
    console.log('boardArrayPiece:',boardArrayPiece)

    const pieceType = boardArrayPiece.name
    const piecePosition = Number(e.target.parentNode.getAttribute('square-id'))


    console.log('Piece position: ', piecePosition)

    if (boardArrayPiece.player == turn) {
        switch (pieceType) {
            case 'pawn':
                let oneSquareMove = document.querySelector(`div[row = "${row - 1}"][column = "${column}"]`)

                console.log('Front square id: ', oneSquareMove)

                if (oneSquareMove == null) {
                    return
                }

                if (oneSquareMove.children.length == 0) {

                    oneSquareMove.addEventListener('drop', dropFunction1 = (e) => {
                        dragDrop(e, boardArrayPiece)
                    }) 
                    oneSquareMove.classList.add('legal-move')
                    legalMoves.push(oneSquareMove)
                }
                console.log((piecePosition - width))
                let twoSquareMove = document.querySelector(`div[row = "${row - 2}"][column = "${column}"]`)

                if (twoSquareMove == null) {
                    return
                }

                if (twoSquareMove.children.length == 0 && !boardArrayPiece.hasItMoved) {
                    twoSquareMove.addEventListener('drop', dropFunction2 = (e) => {
                        dragDrop(e, boardArrayPiece)
                    })
                    twoSquareMove.classList.add('legal-move')
                    legalMoves.push(twoSquareMove)
                    // boardArrayPiece.hasItMoved = true
                }

                console.log('One square move:', oneSquareMove)

                break

        }
    }

}


function hideValidMoves () {
    legalMoves.forEach((position) => {
        position.classList.remove('legal-move')
        position.removeEventListener('drop', dropFunction1)
        position.removeEventListener('drop', dropFunction2)

    })

    legalMoves = []
}


let legalMoves = []

// let allSquares = gameBoard.childNodes

// function flipSquaresIds () {

//     if (turn == 'white') {
//         console.log('calling from white flipping')
//         console.log("allSquares:", allSquares)
//         console.log('board:', gameBoard)
//         allSquares.forEach((square, i) => {
//             square.setAttribute('square-id', (i))
//         })
//     } else if (turn == 'black') {
//         console.log('calling from black flipping')
//         allSquares.forEach((square, i) => {
//             square.setAttribute('square-id', (63 - i))
//         })
//     }
// }









// const allSquares = document.querySelectorAll('#gameboard .square')

// allSquares.forEach( square => {
//     square.addEventListener('dragstart', dragStart)
// })

// function dragStart (e) {
//     console.log(e.target.parentNode)
// }