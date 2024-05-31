// Dejaré comentarios en el desarrollo JS para mejor comprensión.

// Al aprender sobre JSON, decidí alojar las preguntas y respuestas en un .json aparte. Usando fetch en la función loadQuestions de forma asincrónica extraemos las preguntas, opciones y respuestas.

let questions = [];
let currentQuestionIndex = 0;
let userResponses = [];

// Cargo preguntas desde el archivo JSON específico
async function loadQuestions(file) {
  const response = await fetch(file);
  questions = await response.json();
  shuffleQuestions();
  displayQuestion(questions[currentQuestionIndex]);
}

// Desordenar las preguntas
function shuffleQuestions() {
  questions = questions.sort(() => Math.random() - 0.5);
}

// Mostrar pregunta y sus opciones
function displayQuestion(questionObj) {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  // Aplico replace para los saltos de línea en las preguntas
  const formattedQuestion = questionObj.question.replace(/\n/g, "<br>");

  // animaciones a los elementos de preguntas y opciones
  questionElement.classList.remove("fade-in");
  questionElement.classList.add("fade-out");
  optionsElement.classList.remove("fade-in");
  optionsElement.classList.add("fade-out");

  setTimeout(() => {
    questionElement.innerHTML = formattedQuestion;
    optionsElement.innerHTML = "";

    questionObj.options.forEach((option) => {
      const optionElement = document.createElement("button");
      optionElement.textContent = option;
      optionElement.addEventListener("click", () =>
        checkAnswer(option, questionObj.answer)
      );
      optionsElement.appendChild(optionElement);
    });

    questionElement.classList.remove("fade-out");
    questionElement.classList.add("fade-in");
    optionsElement.classList.remove("fade-out");
    optionsElement.classList.add("fade-in");
  }, 300);
}

// Verificación de respuesta seleccionada por usuario
function checkAnswer(selectedAnswer, correctAnswer) {
  userResponses.push({
    question: questions[currentQuestionIndex].question,
    userAnswer: selectedAnswer,
    correctAnswer: correctAnswer,
  });

  // Siguiente pregunta
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    showScore();
  }
}

// Mostrar puntuación y respuestas
function showScore() {
  const scoreElement = document.getElementById("score");
  const tableElement = document.getElementById("responseTable");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  questionElement.classList.remove("fade-in");
  questionElement.classList.add("fade-out");
  optionsElement.classList.remove("fade-in");
  optionsElement.classList.add("fade-out");

  setTimeout(() => {
    questionElement.textContent = "";
    optionsElement.innerHTML = "";

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

    // Sección de corrección
    const correctionAccordion = document.getElementById("correctionAccordion");
    const toggleAccordionButton = document.getElementById("toggleAccordion");

    // Visibilidad del acordeón
    toggleAccordionButton.addEventListener("click", () => {
      if (correctionAccordion.style.display === "none") {
        correctionAccordion.style.display = "block";
      } else {
        correctionAccordion.style.display = "none";
      }
    });
    // Contenido acordeón
    correctionAccordion.style.display = "none";

    // Mostrar la sección de corrección al finalizar el quiz
    const correctionElement = document.getElementById("correction");
    correctionElement.style.display = "block";

    userResponses.forEach((response) => {
      if (response.userAnswer !== response.correctAnswer) {
        const correctionItem = document.createElement("div");
        correctionItem.innerHTML = `
        <div id ="item">
        <p class="correctionText"><strong>Pregunta:</strong> ${
          response.question
        }</p>
      <p class="correctionText"><strong>Respuesta seleccionada:</strong> ${
        response.userAnswer
      }</p>
      <p class="correctionText"><strong>Respuesta correcta:</strong> ${
        response.correctAnswer
      }</p>
      <p class="correctionText"><strong>Explicación:</strong> ${
        questions.find((question) => question.question === response.question)
          .explanation
      }</p>
      </div>
    `;
        correctionAccordion.appendChild(correctionItem);
      }
    });
  }, 800);
}

// Agrego función para modal
document.addEventListener("DOMContentLoaded", (event) => {
  var modal = document.getElementById("introModal");
  var levelSelection = document.getElementById("levelSelection");
  var startQuiz = document.getElementById("startQuiz");

  modal.classList.add("fade-in");
  modal.style.display = "flex";

  // Al pulsar el logo muestro la selección del nivel
  startQuiz.onclick = function () {
    setTimeout(() => {
      modal.style.display = "none";
      levelSelection.style.display = "block";
      levelSelection.classList.add("fade-in");
    }, 500);
  };

  var startBeginnerQuiz = document.getElementById("startBeginnerQuiz");
  var startIntermediateQuiz = document.getElementById("startIntermediateQuiz");

  // Nivel principiante
  startBeginnerQuiz.onclick = function () {
    levelSelection.classList.remove("fade-in");
    levelSelection.classList.add("fade-out");
    setTimeout(() => {
      levelSelection.style.display = "none";
      startQuizFunction("questions.json");
    }, 1000);
  };

  // Nivel intermedio
  startIntermediateQuiz.onclick = function () {
    levelSelection.classList.remove("fade-in");
    levelSelection.classList.add("fade-out");
    setTimeout(() => {
      levelSelection.style.display = "none";
      startQuizFunction("questions_intermediate-level.json");
    }, 1000);
  };
});

function startQuizFunction(file) {
  console.log("¡Empieza el Quizz!");
  loadQuestions(file);
}
