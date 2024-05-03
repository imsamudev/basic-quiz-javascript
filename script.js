let questions = [
  {
    question: "",
    answer: "",
    explanation: "",
  },
];

function shuffleQuestions() {
  questions = questions.sort(() => Math.random() - 0.5);
}
