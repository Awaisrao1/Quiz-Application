const quizData = [
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    correct: 3
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Oracle"],
    correct: 1
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    correct: 1
  },
  {
    question: "Which method is used to print in the console?",
    options: ["console.print()", "console.write()", "console.log()", "print.console()"],
    correct: 2
  },
  {
    question: "What is the default value of an uninitialized variable?",
    options: ["null", "0", "undefined", "false"],
    correct: 2
  }
];

const quiz = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const reviewBtn = document.getElementById("reviewBtn");
const result = document.getElementById("result");
const progress = document.getElementById("progress");

let currentQuiz = 0;
let score = 0;
let selected = false;
let answers = [];

function loadQuiz() {
  selected = false;
  quiz.innerHTML = `
    <h2>${quizData[currentQuiz].question}</h2>
    ${quizData[currentQuiz].options.map((opt, index) => `
      <div class="option" onclick="selectOption(${index}, this)">${opt}</div>
    `).join("")}
  `;
  updateProgress();
}

function selectOption(index, element) {
  if (selected) return;
  selected = true;

  const options = document.querySelectorAll(".option");

  if (index === quizData[currentQuiz].correct) {
    element.classList.add("correct");
    score++;
    answers.push({ q: quizData[currentQuiz].question, chosen: quizData[currentQuiz].options[index], correct: true });
  } else {
    element.classList.add("wrong");
    options[quizData[currentQuiz].correct].classList.add("correct");
    answers.push({ q: quizData[currentQuiz].question, chosen: quizData[currentQuiz].options[index], correct: false });
  }
}

nextBtn.addEventListener("click", () => {
  if (!selected) {
    alert("Please select an option!");
    return;
  }

  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
});

function showResult() {
  quiz.style.display = "none";
  nextBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
  reviewBtn.style.display = "inline-block";
  let status = score >= 3 ? "🎉 Pass" : "❌ Fail";
  result.innerHTML = `Your Score: ${score}/${quizData.length} <br> Result: ${status}`;
}

function updateProgress() {
  let progressPercent = ((currentQuiz) / quizData.length) * 100;
  progress.style.width = `${progressPercent}%`;
}

restartBtn.addEventListener("click", () => {
  currentQuiz = 0;
  score = 0;
  answers = [];
  quiz.style.display = "block";
  nextBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
  reviewBtn.style.display = "none";
  result.innerHTML = "";
  loadQuiz();
});

reviewBtn.addEventListener("click", () => {
  quiz.style.display = "block";
  restartBtn.style.display = "inline-block";
  reviewBtn.style.display = "none";
  nextBtn.style.display = "none";

  quiz.innerHTML = `
    <h2>Review Answers</h2>
    ${answers.map(a => `
      <div class="option ${a.correct ? "correct" : "wrong"}">
        <b>Q:</b> ${a.q} <br>
        <b>Your Answer:</b> ${a.chosen}
      </div>
    `).join("")}
  `;
});

loadQuiz();
