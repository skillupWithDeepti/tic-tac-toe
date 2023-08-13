const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('button');
let currentPlayer = 'X';
let gameover = false;

// Function to check if there's a winner
function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            gameover = true;
            cells[a].style.backgroundColor = 'lightgreen';
            cells[b].style.backgroundColor = 'lightgreen';
            cells[c].style.backgroundColor = 'lightgreen';
            return cells[a].innerText;
        }
    }

    if ([...cells].every(cell => cell.innerText)) {
        gameover = true;
        return 'draw';
    }

    return null;
}

// // Function to make a move
// function makeMove(cellIndex) {
//     if (!gameover && !cells[cellIndex].innerText) {
//         cells[cellIndex].innerText = currentPlayer;
//         cells[cellIndex].style.backgroundColor = 'white';
//         const winner = checkWinner();
//         if (winner) {
//             if (winner === 'draw') {
//                 alert("It's a draw!");
//             } else {
//                 alert(`Player ${winner} wins!`);
//             }
//         } else {
//             currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//             if (currentPlayer === 'O' && !gameover) {
//                 setTimeout(computerMove, 1000); // Introduce a delay of 1 second for the computer's move
//             }
//         }
//     }
// }

// Function for computer's move
function computerMove() {
    let emptyCells = [...cells].filter(cell => !cell.innerText);
    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let randomCell = emptyCells[randomIndex];
        makeMove([...cells].indexOf(randomCell));
    }
}

// Function to reset the board
function resetBoard() {
    gameover = false;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = 'lightgray';
    });
}

// // ... (rest of the code remains the same)
 // Function to make a move
function makeMove(cellIndex) {
    if (!gameover && !cells[cellIndex].innerText) {
        cells[cellIndex].innerText = currentPlayer;
        cells[cellIndex].style.backgroundColor = 'white';
        const winner = checkWinner();
        if (winner) {
            if (winner === 'draw') {
                alert("It's a draw!");
            } else {
                highlightWinningMove(winner);
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O' && !gameover) {
                setTimeout(computerMove, 1000); // Introduce a delay of 1 second for the computer's move
            }
        }
    }
}

// Function to highlight the winning move
function highlightWinningMove(winner) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            gameover = true;
            cells[a].style.backgroundColor = 'lightgreen';
            cells[b].style.backgroundColor = 'lightgreen';
            cells[c].style.backgroundColor = 'lightgreen';
            setTimeout(() => {
                alert(`Player ${winner} wins!`);
            }, 500); // Delay the alert by 0.5 seconds after highlighting the winning move
            return;
        }
    }

    if ([...cells].every(cell => cell.innerText)) {
        gameover = true;
        setTimeout(() => {
            alert("It's a draw!");
        }, 500); // Delay the alert by 0.5 seconds after checking for a draw
    }
}
