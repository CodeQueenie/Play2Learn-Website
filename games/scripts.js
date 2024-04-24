// Global variables
var score = 0;
var timeLeft = 30;
var interval;
var currentProblem = null;
var container = document.getElementById("final-score");
var playAgainButton = document.getElementById("play-again");

// Updating the score
function updateScore(score) {
    document.getElementById("score").innerHTML =
        "<span class='bold'>Score:</span> <span class='underline'>" + score + "</span>";
}

// Appending to the answer
function appendToAnswer(number) {
    var answerInput = document.getElementById("answer");
    answerInput.value = number;
    answerInput.focus();
}

// Clearing the answer
function clearAnswer() {
    var answerInput = document.getElementById("answer");
    answerInput.value = '';
    answerInput.focus();
}

// Generating the problem
function generateProblem() {
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * (10 - num1));

    var answer = num1 + num2;
    currentProblem = {
        num1: num1,
        num2: num2,
        answer: answer,
    };

    document.getElementById("question").innerHTML = num1 + " + " + num2;
    document.getElementById("feedback").innerHTML = "";

    clearAnswer();
}

// Checking user's answer
function checkAnswer() {
    var userAnswer = parseInt(document.getElementById("answer").value);
    var correctAnswer = currentProblem.answer;

    if (!isNaN(userAnswer)) {
        if (userAnswer === correctAnswer) {
            score++;
            updateScore(score);
            generateProblem();
            document.getElementById("feedback").innerHTML = "Correct";
        } else {
            document.getElementById("feedback").innerHTML = "Incorrect";
            clearAnswer();
        }
    }
}

// Updating the time left
function updateTimeLeft(timeLeft) {
    document.getElementById("time-left").innerHTML =
        "<span class='bold'>Time Left:</span> <span class='underline'>" + timeLeft + " seconds</span>";
}

// Start the game
function startGame() {
    // Hiding unnecessary elements
    document.getElementById("operation-select-container").style.display = "none";
    document.querySelector(".instructions").style.display = "none";

    // Displaying the interactive elements
    document.getElementById("question").style.display = "block";
    document.getElementById("answer").style.display = "block";
    document.getElementById("feedback").style.display = "block";
    document.getElementById("score").style.display = "block";
    document.getElementById("time-left").style.display = "block";
    document.getElementById("calculator").style.display = "grid";

    // Generate problem and update time
    generateProblem();
    updateTimeLeft(timeLeft);

    // Setting up the event listeners for gameplay
    document.querySelectorAll(".green-box").forEach(function (button) {
        button.addEventListener("click", function () {
            var number = parseInt(this.innerText);
            appendToAnswer(number);
            checkAnswer();
        });
    });

    // Setting up the event listener for keyboard
    document.addEventListener("keydown", function (event) {
        var digit = event.key;
        if (digit >= 0 && digit <= 9) {
            document.getElementById("answer").value = digit;
            checkAnswer();
        } else if (digit === "Backspace") {
            clearAnswer();
        }
    });

    // Initiate countdown timer
    interval = setInterval(function () {
        timeLeft--;
        updateTimeLeft(timeLeft); 

        if (timeLeft === 0) {
            clearInterval(interval);
            // Displaying end game results
            document.getElementById("play-again").style.display = "block";
            document.getElementById("go").style.display = "none";
            document.getElementById("question").style.display = "none";
            document.getElementById("answer").style.display = "none";
            document.getElementById("feedback").style.display = "none";
            document.getElementById("score").style.display = "none";
            document.getElementById("calculator").style.display = "none";

            document.getElementById("time-left").innerHTML = "<b>Time's up!</b>";
            document.getElementById("time-left").style.display = "block";

            let finalScoreElement = document.createElement("h4");
            finalScoreElement.innerHTML = 'Your final score is:';
            let scoreElement = document.createElement("div");
            scoreElement.innerHTML = score;
            scoreElement.style.paddingBottom = '40px';

            finalScoreElement.appendChild(scoreElement);
            container.appendChild(finalScoreElement);
            container.appendChild(playAgainButton);
        }
    }, 1000);
}

// Set up the replay button click event
window.onload = function() {
    playAgainButton.addEventListener("click", function() {
        window.location.reload(); 
    });
};