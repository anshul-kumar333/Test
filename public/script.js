let questions = [
  {
    question: "What is the correct way to define an attribute in an HTML tag?",
    options: ["<tag attribute='value'>", "<tag attribute=value>", "<tag=attribute:value>3", "<tag>attribute='value'4"],
    correctAnswer: "<tag attribute='value'>"
  },
  {
    question: "Which tag is used to underline text in HTML?",
    options: ["<i>", "<u>", "<b>", "<underline>"],
    correctAnswer: "<u>"
  },
  {
    question: "What is the purpose of the <hr> tag?",
    options: ["To break a line", "To create a horizontal rule", "To highlight text", "To italicize text"],
    correctAnswer: "To create a horizontal rule"
  },
  {
    question: "Which tag is used for displaying an image in HTML?",
    options: ["<img>", "<image>", "<src>", "<pic>"],
    correctAnswer: "<img>"
  },
  {
    question: "How do you create an ordered list in HTML?",
    options: ["<ul>", "<ol>", "<li>", "<dl>"],
    correctAnswer: "<ol>"
  },
  {
  question: "The <b> tag is used to bold text.",
  options: ["True", "False"],
  correctAnswer: "True"
  },
  {
    question: "You can use <br> to create a line break.",
    options: ["True", "False"],
    correctAnswer: "True"
  },
  {
    question: "The <i> tag is used for inline images.",
    options: ["True", "False"],
    correctAnswer: "False"
  },
  {
    question: "<ul> is used for ordered lists.",
    options: ["True", "False"],
    correctAnswer: "False"
  },
  {
    question: "<marquee> is used to create scrolling text.",
    options: ["True", "False"],
    correctAnswer: "True"
  },
  {
    question: "The <_______> tag is used to insert a line break in HTML",
    options: ["<br>", "<hr>"],
    correctAnswer: "<br>"
},

{
  question: "The attribute used to set the URL in an <a> tag is ________.",
  options: ["href", "target"],
  correctAnswer: "href"
},

{
  question: "The <_______> tag is used to display images in HTML.",
  options: ["<img>", "<pic>"],
  correctAnswer: "<img>"
},

{
  question: "<_______> are used to merge table rows.",
  options: ["rowspan", "colspan"],
  correctAnswer: "rowspan"
},

{
  question: "You use <_______> to create an input field for a form.",
  options: ["<input>", "<textarea>"],
  correctAnswer: "<input>"
},

{
  question: "What is the correct way to change the color of text in CSS?",
  options: ["text-color: red;", "color: red;", "font-color: red;", "style-color: red;"],
  correctAnswer: "color: red;"
},

{
  question: "Which property is used to change the background color?",
  options: ["bgcolor", "background", "background-color", "color"],
  correctAnswer: "background-color"
},

{
  question: "How do you make text bold using CSS?",
  options: ["bgcolorfont-weight: bold;", "text-style: bold;", "text-bold: true;", "font-style: bold;"],
  correctAnswer: "font-weight: bold;"
},

{
  question: "What property is used to change the font size in CSS?",
  options: ["font-weight", "font-size", "text-size", "size"],
  correctAnswer: "font-size"
},

{
  question: "How do you add space between the content and the border of an element?",
  options: ["margin", "spacing", "padding", "border-spacing"],
  correctAnswer: "padding"
},

{
  question: "CSS stands for Cascading Style Sheets.",
  options: ["True", "False"],
  correctAnswer: "True"
},

{
  question: "The margin property is used to add space inside an element.",
  options: ["True", "False"],
  correctAnswer: "False"
},

{
  question: "You can set an image as a background in CSS.",
  options: ["True", "False"],
  correctAnswer: "True"
},

{
  question: "The display property controls the visibility of elements.",
  options: ["True", "False"],
  correctAnswer: "False"
},

{
  question: "The float property is used to align elements left or right.",
  options: ["True", "False"],
  correctAnswer: "True"
},

{
  question: "The __________ property is used to make the text italic in CSS.",
  options: ["font-style", "text-decoration"],
  correctAnswer: "font-style"
},

{
  question: "To create rounded corners, the __________ property is used.",
  options: ["border-style", "border-radius"],
  correctAnswer: "border-radius"
},

{
  question: "You use the __________ property to change the width of an element.",
  options: ["width", "size"],
  correctAnswer: "width"
},

{
  question: "The __________ property is used to change the height of an element.",
  options: ["Height", "top"],
  correctAnswer: "Height"
},

{
  question: "To center text inside an element, use __________.",
  options: ["text-align", "align-center"],
  correctAnswer: "text-align"
}
  
];

let currentQuestionIndex = 0;
let timeLeft = 30;
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
    timeLeft = 30;  // Reset the timer for the next question
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
    button.style.backgroundColor = '#fffb00';  // Correct answer
    score++;  // Increment score for correct answer
  } else {
    button.style.backgroundColor = 'rgb(231, 70, 70)';  // Wrong answer
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

document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
  });


  document.addEventListener("keydown", function(e) {
   
    if (e.keyCode === 123) {
      e.preventDefault();
    }
    
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
    }
    
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
    }
    
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
    }
  });



// Start the game when the page loads
window.onload = showQuestion;
