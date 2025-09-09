
let currentQuestion = 0;
let score = 0;
let results = [];

function showQuestion() {
  const q = questions[currentQuestion];
  const quizDiv = document.getElementById('quiz');
  quizDiv.innerHTML = `<p><strong>Q${currentQuestion + 1}:</strong> ${q.question}</p>`;
  q.choices.forEach((choice, index) => {
    quizDiv.innerHTML += `<button onclick="checkAnswer('${String.fromCharCode(65 + index)}')">${String.fromCharCode(65 + index)}. ${choice}</button><br>`;
  });
}

function checkAnswer(answer) {
  const q = questions[currentQuestion];
  const isCorrect = answer === q.correctAnswer;
  if (isCorrect) score++;
  results.push({
    question: q.question,
    selected: answer,
    correct: q.correctAnswer,
    explanation: q.explanation,
    isCorrect: isCorrect
  });
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const quizDiv = document.getElementById('quiz');
  const resultDiv = document.getElementById('result');
  quizDiv.innerHTML = '';
  resultDiv.innerHTML = `<h2>Your Score: ${score} out of ${questions.length}</h2>`;
  results.forEach((r, i) => {
    resultDiv.innerHTML += `<p><strong>Q${i + 1}:</strong> ${r.question}<br>
      Your Answer: ${r.selected} (${r.isCorrect ? '<span class="correct">Correct</span>' : '<span class="incorrect">Incorrect</span>'})<br>
      Correct Answer: ${r.correct}<br>
      Explanation: ${r.explanation}</p>`;
  });
  document.getElementById('email-section').style.display = 'block';
}

function sendEmail() {
  const userEmail = document.getElementById('userEmail').value;
  const templateParams = {
    user_email: userEmail,
    score: `${score} out of ${questions.length}`,
    results: results.map(r => `Q: ${r.question}
Your Answer: ${r.selected} (${r.isCorrect ? 'Correct' : 'Incorrect'})
Correct Answer: ${r.correct}
Explanation: ${r.explanation}
`).join('
')
  };

  emailjs.init('0AwCWeDvX62Fxyhy2');
  emailjs.send('service_jnozcupt', 'template_2omlska', templateParams)
    .then(() => alert('Results sent!'))
    .catch(err => alert('Failed to send email: ' + err));
}
