const gameBoard = document.querySelector('#gameboard')

const playerDisplay = document.querySelector("#player")

const infoDisplay = document.querySelector("#info-display")

const width = 8

let turn = 'white'


const startPieces = [
    dRook1, dKnight1, dBishop1, dQueen, dKing, dBishop2, dKnight2, dRook2,
    dPawn1, dPawn2, dPawn3, dPawn4, dPawn5, dPawn6, dPawn7, dPawn8,
    emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,
    emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,
    emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,
    emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,emptySquare,
    lPawn1, lPawn2, lPawn3, lPawn4, lPawn5, lPawn6, lPawn7, lPawn8,
    lRook1, lKnight1, lBishop1, lQueen, lKing, lBishop2, lKnight2, lRook2
]

let legalMoves = []

let allSquares = gameBoard.childNodes

function flipSquaresIds () {

    if (turn == 'white') {
        console.log('calling from white flipping')
        console.log("allSquares:", allSquares)
        console.log('board:', gameBoard)
        allSquares.forEach((square, i) => {
            square.setAttribute('square-id', (i))
        })
    } else if (turn == 'black') {
        console.log('calling from black flipping')
        allSquares.forEach((square, i) => {
            square.setAttribute('square-id', (63 - i))
        })
    }
}

function createBoard () {

    let draggedElement

    function dragStart (e, startPiece) {
        showValidMoves(e, startPiece)
        // e.preventDefault()
        draggedElement = e.target
        setTimeout(() => {draggedElement.classList.add('hide')}, 0)
        // e.target.parentNode.removeChild(draggedElement)
        // draggedElement.parentNode.removeChild
        
       
        console.log('drag started', draggedElement)
    }

    function dragDrop (e, startPiece) {
        e.preventDefault();
    
        draggedElement.parentNode.removeChild(draggedElement);
        e.target.appendChild(draggedElement);

        startPiece.hasItMoved = true
        flipSquaresIds()

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


    function hideValidMoves () {
        legalMoves.forEach((position) => {
            position.classList.remove('legal-move')
            position.removeEventListener('drop', dropFunction1)
            position.removeEventListener('drop', dropFunction2)

        })

        legalMoves = []
    }
     

    function showValidMoves (e, startPiece) {
        console.log('startPiece:',startPiece)

        const pieceType = startPiece.name
        const piecePosition = Number(e.target.parentNode.getAttribute('square-id'))


        console.log('Piece position: ', piecePosition)

        if (startPiece.player == turn) {
            switch (pieceType) {
                case 'pawn':
                    let oneSquareMove = document.querySelector(`[square-id = "${piecePosition + width}"]`)

                    console.log('Front square id: ', oneSquareMove)

                    if (oneSquareMove == null) {
                        return
                    }

                    if (oneSquareMove.children.length == 0) {

                        oneSquareMove.addEventListener('drop', dropFunction1 = (e) => {
                            dragDrop(e, startPiece)
                        }) 
                        oneSquareMove.classList.add('legal-move')
                        legalMoves.push(oneSquareMove)
                    }
                    console.log((piecePosition - width))
                    let twoSquareMove = document.querySelector(`[square-id = "${piecePosition + 2*width}"]`)

                    if (twoSquareMove == null) {
                        return
                    }

                    if (twoSquareMove.children.length == 0 && !startPiece.hasItMoved) {
                        twoSquareMove.addEventListener('drop', dropFunction2 = (e) => {
                            dragDrop(e, startPiece)
                        })
                        twoSquareMove.classList.add('legal-move')
                        legalMoves.push(twoSquareMove)
                        // startPiece.hasItMoved = true
                    }
    
                    console.log('One square move:', oneSquareMove)

                    break
    
            }
        }

        

    }

    // function dragLeave(e) {
    //     e.preventDefault();
    //     console.log('drag leave')
    // }

    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece.pieceHtml;

        // if (startPiece.pieceHtml !== '') {
        //     startPiece.addEventListener('click', showValidMoves)
        // }

        square.firstChild?.setAttribute('draggable', true)
        // square.firstChild?.addEventListener('click', (e) => {
        //     showValidMoves(e, startPiece)
        // })

        square.firstChild?.addEventListener('dragend', dragEnd)

        square.firstChild?.addEventListener('dragstart', (e) => {
            dragStart(e, startPiece)
        })
        square.addEventListener('dragover', dragOver)
        // square.addEventListener('dragleave', dragLeave)

        square.setAttribute('square-id', (63 - i))

        const row = Math.floor((63 - i) / 8) + 1
        if ( row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? 'beige' : 'brown')
        } else {
            square.classList.add(i % 2 === 0 ? 'brown' : 'beige')
        }

        // square.classList.add('beige')
        gameBoard.append(square)
    })
}

createBoard()





// const allSquares = document.querySelectorAll('#gameboard .square')

// allSquares.forEach( square => {
//     square.addEventListener('dragstart', dragStart)
// })

// function dragStart (e) {
//     console.log(e.target.parentNode)
// }