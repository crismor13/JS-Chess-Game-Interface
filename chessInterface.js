

function createBoard () {

    let i = -1

    currentBoardState.forEach((array, row) => {

        array.forEach((piece, column) => {

            i++ 
            const square = document.createElement('div')
            square.classList.add('square')
            piece.position.row = row
            piece.position.column = column
            square.innerHTML = piece.pieceHtml;
            square.firstChild?.setAttribute('draggable', true)

            square.firstChild?.addEventListener('dragend', dragEnd)

            square.firstChild?.addEventListener('dragstart', (e) => {
                dragStart(e, piece)
            })
            square.addEventListener('dragover', dragOver)
            // square.addEventListener('dragleave', dragLeave)

            square.setAttribute('row', row)
            square.setAttribute('column', column)

            const fila = Math.floor((63 - i) / 8) + 1
            if ( fila % 2 === 0) {
                square.classList.add(i % 2 === 0 ? 'beige' : 'brown')
            } else {
                square.classList.add(i % 2 === 0 ? 'brown' : 'beige')
            }

            // square.classList.add('beige')
            gameBoard.append(square)
            
        })


        
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