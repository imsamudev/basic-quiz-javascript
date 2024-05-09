let questions = [
  {
    question: "",
    options: [],
    answer: "",
    explanation: "",
  },
];

// desordenar las preguntas
function shuffleQuestions() {
  questions = questions.sort(() => Math.random() - 0.5);
}
// mantener índice pregunta actual
let currentQuestionIndex = 0;
let userResponses = [];

// mostrar pregunta y sus opciones
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

// verificación de respuesta seleccionada por usuario
function checkAnswer(selectedAnswer, correctAnswer) {
  userResponses.push({
    question: questions[currentQuestionIndex].question,
    userAnswer: selectedAnswer,
    correctAnswer: correctAnswer,
  });

  // siguiente pregunta
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    showScore();
  }
}

// mostrar puntuación y respuestas
function showScore() {
  const scoreElement = document.getElementById("score");
  const tableElement = document.getElementById("responseTable");

  let correctCount = 0;

  userResponses.forEach((response) => {
    if (response.userAnswer === response.correctAnswer) {
      correctCount++;
    }

    const row = tableElement.insertRow();
    row.insertCell(0).textContent = response.question;
    row.insertCell(1).textContent = response.userAnswer;
    row.insertCell(2).textContent = response.correctAnswer;
  });

  const percentage = (correctCount / questions.length) * 100;
  scoreElement.textContent = `Puntuación final: ${correctCount}/${
    questions.length
  } respuestas correctas (${percentage.toFixed(2)}%).`;

  // Ejecutar tabla de puntuación al finalizar el quizz.
  tableElement.style.display = "block";

  // sección de corrección
  const correctionAccordion = document.getElementById("correctionAccordion");
  const toggleAccordionButton = document.getElementById("toggleAccordion");

  // visibilidad del acordeón
  toggleAccordionButton.addEventListener("click", () => {
    if (correctionAccordion.style.display === "none") {
      correctionAccordion.style.display = "block";
    } else {
      correctionAccordion.style.display = "none";
    }
  });
  // Contenido acordeón
  correctionAccordion.style.display = "none";

  // mostrar la sección de corrección al finalizar el quiz
  const correctionElement = document.getElementById("correction");
  correctionElement.style.display = "block";
}

// ejecución de preguntas y azar de preguntas.
shuffleQuestions();

displayQuestion(questions[currentQuestionIndex]);
