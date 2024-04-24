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

// Anagram Hunt


import GameScore from './GameScore';
import GameTimer from './GameTimer';
import GameEquation from './GameEquation';
import anagrams from '../helpers/anagrams';

export default {
  name: 'GamePlay',
  components: {
    GameScore,
    GameTimer,
    GameEquation,
  },
  data() {
    return {
      wordLengths: [5, 6, 7, 8],
      wordLength: 5,
      currentWord: '',
      anagrams: [],
      userInput: '',
      answered: false,
      score: 0,
      gameLength: 60,
      timeLeft: 0,
      equationClass: '',
      completedAnagrams: [],
    };
  },
  methods: {
    config() {
      //this.$router.push('/');
    },
    newWord() {
    const wordLength = this.wordLength; // Use the selected word length
    console.log('Word Length:', wordLength);
    const wordArrays = anagrams[wordLength];
    console.log('Word Arrays:', wordArrays);

   if (wordArrays && wordArrays.length > 0) {
    const randomArray = wordArrays[Math.floor(Math.random() * wordArrays.length)];
    console.log('Random Array:', randomArray);

    if (randomArray && randomArray.length > 0) {
      // Filter words to ensure the selected word has the correct length
      const filteredArray = randomArray.filter(word => word.length === wordLength);
      console.log('Filtered Array:', filteredArray);

      if (filteredArray.length > 0) {
        this.currentWord = filteredArray[Math.floor(Math.random() * filteredArray.length)];
        console.log('New word:', this.currentWord);
        this.anagrams = filteredArray.filter(word => word !== this.currentWord);
        console.log('Updated anagrams:', this.anagrams);
        // Reset completedAnagrams
        this.completedAnagrams = [];
      } else {
        console.error('No words with the selected length in the random array.');
      }
    } else {
      console.error('Random array is empty or undefined.');
    }
  } else {
    console.error('Word arrays are empty or undefined for the given word length.');
   }

  // Reset answered status
  this.answered = false;
},
    checkAnswer() {
  // Check if the user input is a valid anagram
  if (this.anagrams.includes(this.userInput)) {
    this.score++;
    this.completedAnagrams.push(this.userInput);
    // Remove the guessed anagram
    this.anagrams = this.anagrams.filter(word => word !== this.userInput);
    // Clear the user input
    this.userInput = '';

    // Check if all anagrams are guessed, then get a new word
    if (this.anagrams.length === 0) {
      this.newWord(); // Add this line to get a new word
      console.log('Getting a new word...');
    }
  }
  this.answered = false; // Set answered to false after checking the answer
},
    startTimer() {
      window.addEventListener('keyup', this.handleKeyUp);
      this.timeLeft = this.gameLength; // This should be initialized with some value
      if (this.timeLeft > 0) {
        this.timer = setInterval(() => {
          this.timeLeft--;
          if (this.timeLeft === 0) {
            clearInterval(this.timer);
            window.removeEventListener('keyup', this.handleKeyUp);
          }
        }, 1000);
      }
    },
    restart() {
      this.score = 0;
      this.startTimer();
      this.newWord();
    },

  },
  mounted() {
    console.log('Word Length:', this.$route.params.wordLength);
    this.newWord();
    this.startTimer();
  },
 computed: {
    remainingAnagrams() {
    return this.anagrams.length;
    },
  },
};