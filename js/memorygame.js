document.addEventListener("DOMContentLoaded", () => {
    const cardsArray = [
        { name: 'apple', img: 'apple.png' },
        { name: 'banana', img: 'banana.png' },
        { name: 'cherry', img: 'cherry.png' },
        { name: 'grape', img: 'grape.png' },
        { name: 'orange', img: 'orange.png' },
        { name: 'pear', img: 'pear.png' },
        { name: 'pineapple', img: 'pineapple.png' },
        { name: 'strawberry', img: 'strawberry.png' }
    ];

    let gameBoard = [];
    let firstCard, secondCard;
    let flippedCards = 0;
    let playerTurn = 1;

    // Shuffle the cards
    function shuffleCards() {
        const shuffledArray = [...cardsArray, ...cardsArray];
        return shuffledArray.sort(() => 0.5 - Math.random());
    }

    // Create the board
    function createBoard() {
        const shuffledCards = shuffleCards();
        const boardElement = document.getElementById("memory-game-board");

        shuffledCards.forEach((card, index) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("memoryCard");
            cardElement.dataset.name = card.name;
            cardElement.dataset.index = index;
            cardElement.addEventListener("click", flipCard);
            boardElement.appendChild(cardElement);
        });
    }

    // Flip a card
    function flipCard() {
        if (firstCard && secondCard) return;

        const clickedCard = this;

        // If it's already flipped, do nothing
        if (clickedCard.classList.contains("flipped")) return;

        clickedCard.classList.add("flipped");
        clickedCard.style.backgroundImage = `url(${clickedCard.dataset.name}.png)`;

        // Handle the first card
        if (!firstCard) {
            firstCard = clickedCard;
            return;
        }

        // Handle the second card and check if they match
        secondCard = clickedCard;

        // If cards match
        if (firstCard.dataset.name === secondCard.dataset.name) {
            flippedCards += 2;
            resetTurn();
            checkForWin();
        } else {
            // If cards don't match, flip them back
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                firstCard.style.backgroundImage = "";
                secondCard.style.backgroundImage = "";
                resetTurn();
            }, 1000);
        }
    }

    // Reset the turn
    function resetTurn() {
        firstCard = null;
        secondCard = null;
        playerTurn = playerTurn === 1 ? 2 : 1;
        document.getElementById("game-status").textContent = `Turn: Player ${playerTurn}`;
    }

    // Check for win
    function checkForWin() {
        if (flippedCards === cardsArray.length * 2) {
            document.getElementById("game-status").textContent = `Player ${playerTurn} Wins!`;
            setTimeout(() => alert(`Player ${playerTurn} Wins!`), 500);
        }
    }

    // Reset the game
    function resetGame() {
        gameBoard = [];
        flippedCards = 0;
        playerTurn = 1;
        document.getElementById("game-status").textContent = "Turn: Player 1";

        const boardElement = document.getElementById("memory-game-board");
        boardElement.innerHTML = ""; // Clear the board

        createBoard();
    }

    // Add event listener to Play Again button
    document.getElementById("reset-button").addEventListener("click", resetGame);

    // Initialize the game
    createBoard();
});
