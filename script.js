let questions = [
  {
    question: "What is 2 + 2?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "4"
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Rome", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Saturn"],
    correctAnswer: "Jupiter"
  },
  {
    question: "Who is the author of the book 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Harriet Tubman", "George Orwell", "Jane Austen"],
    correctAnswer: "Harper Lee"
  }
];

let currentQuestionIndex = 0;
let timeLeft = 5;
let timerInterval;
let score = 0;  // Initialize user score

// Function to display the next question
function showQuestion() {
  let questionElement = document.getElementById('question');
  let optionsElement = document.getElementById('options');
  let timerElement = document.getElementById('timer');

  let question = questions[currentQuestionIndex];

  // Display the question
  questionElement.innerText = question.question;
  optionsElement.innerHTML = '';  // Clear previous options
  
  // Create and display the options
  question.options.forEach(option => {
    let button = document.createElement('button');
    button.innerText = option;
    button.disabled = false;  // Ensure the buttons are enabled when new question appears
    button.addEventListener('click', function() {
      checkAnswer(option, button);
    });
    optionsElement.appendChild(button);
  });

  // Display and start the countdown
  timerElement.innerText = `Time left: ${timeLeft}`;
  startCountdown();
}

// Function to start the countdown timer
function startCountdown() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = `Time left: ${timeLeft}`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      disableButtons(); // Disable options after time is up
      document.getElementById('question').innerText = 'Time is up!';
      setTimeout(nextQuestion, 1000); // Automatically go to the next question after 1 second
    }
  }, 1000);
}

// Function to disable buttons after time is up
function disableButtons() {
  let buttons = document.querySelectorAll('#options button');
  buttons.forEach(button => {
    button.disabled = true;
  });
}

// Function to go to the next question
async function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    timeLeft = 5;  // Reset the timer for the next question
    showQuestion();  // Show the next question
  } else {
    await submitScore(localStorage.getItem('username'), score); // Submit score after the last question
    alert(`Game Over! Your score is: ${score}`);
    window.location.href = 'login.html'; // Redirect to login page after game over
  }
}

// Function to check the selected answer
function checkAnswer(selectedOption, button) {
  let correctAnswer = questions[currentQuestionIndex].correctAnswer;

  // Stop the timer
  clearInterval(timerInterval);

  // Change background color based on the answer
  if (selectedOption === correctAnswer) {
    button.style.backgroundColor = 'green';  // Correct answer
    score++;  // Increment score for correct answer
  } else {
    button.style.backgroundColor = 'red';  // Wrong answer
    // Highlight the correct answer in green
    document.querySelectorAll('#options button').forEach(btn => {
      if (btn.innerText === correctAnswer) {
        btn.style.backgroundColor = 'green'; // Highlight correct answer
      }
    });
  }

  // Disable all buttons after selection
  disableButtons();

  setTimeout(nextQuestion, 1000);  // Move to the next question after a short delay
}

// Function to submit the score to the server
async function submitScore(username, score) {
  await fetch('/api/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, score }),
  });
}

// Start the game when the page loads
window.onload = showQuestion;
