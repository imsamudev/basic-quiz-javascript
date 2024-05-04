let questions = [
  {
    question: "",
    options: [],
    answer: "",
    explanation: "",
  },
];

function shuffleQuestions() {
  questions = questions.sort(() => Math.random() - 0.5);
}

let currentQuestionIndex = 0;
let userResponses = [];

function displayQuestion(questionObj) {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  questionElement.textContent = questionObj.question;
  optionsElement.innerHTML = "";

  questionObj.options.forEach((option, index) => {
    const optionElement = document.createElement("button");
    optionElement.textContent = option;
    optionElement.addEventListener("click", () =>
      checkAnswer(option, questionObj.answer)
    );
    optionsElement.appendChild(optionElement);
  });
}

function checkAnswer(selectedAnswer, correctAnswer) {
  userResponses.push({
    question: questions[currentQuestionIndex].question,
    userAnswer: selectedAnswer,
    correctAnswer: correctAnswer,
  });

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    showScore();
  }
}

// execute
shuffleQuestions();

displayQuestion(questions[currentQuestionIndex]);
