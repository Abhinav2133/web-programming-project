const questionBank = [
  { category: "web", label: "WEB DEVELOPMENT", question: "Which language is used to define the structure of a web page?", options: ["CSS", "HTML", "JavaScript", "SQL"], answer: 1, explanation: "HTML provides the structure and content of a web page." },
  { category: "web", label: "WEB DEVELOPMENT", question: "Which CSS property changes the text color?", options: ["font-style", "text-size", "color", "background-image"], answer: 2, explanation: "The CSS color property sets the foreground color of text." },
  { category: "web", label: "WEB DEVELOPMENT", question: "Which HTML element is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1, explanation: "The anchor element <a> creates hyperlinks, usually with an href attribute." },
  { category: "web", label: "WEB DEVELOPMENT", question: "Which JavaScript keyword declares a block-scoped variable that can be reassigned?", options: ["const", "static", "let", "fixed"], answer: 2, explanation: "let declares a block-scoped variable that can be reassigned." },
  { category: "web", label: "WEB DEVELOPMENT", question: "What does CSS stand for?", options: ["Computer Style Syntax", "Creative Styling System", "Cascading Style Sheets", "Colorful Style Sheets"], answer: 2, explanation: "CSS stands for Cascading Style Sheets." },
  { category: "web", label: "WEB DEVELOPMENT", question: "Which HTML attribute provides alternative text for an image?", options: ["title", "alt", "src", "name"], answer: 1, explanation: "The alt attribute provides alternative text for an image." },
  { category: "computer", label: "COMPUTER FUNDAMENTALS", question: "Which component is often called the brain of a computer?", options: ["CPU", "Monitor", "Keyboard", "SSD"], answer: 0, explanation: "The CPU executes instructions and processes data." },
  { category: "computer", label: "COMPUTER FUNDAMENTALS", question: "Which of these is an example of an operating system?", options: ["Google Chrome", "Windows", "Microsoft Word", "HTML"], answer: 1, explanation: "Windows is an operating system that manages computer resources." },
  { category: "computer", label: "COMPUTER FUNDAMENTALS", question: "Which unit is commonly used to measure computer memory capacity?", options: ["Watt", "Meter", "Byte", "Hertz only"], answer: 2, explanation: "A byte is a standard unit used to express digital data size." },
  { category: "computer", label: "COMPUTER FUNDAMENTALS", question: "Which device is primarily used to enter text into a computer?", options: ["Printer", "Speaker", "Keyboard", "Projector"], answer: 2, explanation: "A keyboard is an input device commonly used to enter text." },
  { category: "general", label: "GENERAL KNOWLEDGE", question: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Jaipur", "Lucknow"], answer: 1, explanation: "New Delhi is the capital of India." },
  { category: "general", label: "GENERAL KNOWLEDGE", question: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Mercury"], answer: 2, explanation: "Mars appears reddish because of iron oxide on its surface." },
  { category: "general", label: "GENERAL KNOWLEDGE", question: "How many days are there in a leap year?", options: ["364", "365", "366", "367"], answer: 2, explanation: "A leap year has 366 days, including February 29." },
  { category: "general", label: "GENERAL KNOWLEDGE", question: "Which is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: 3, explanation: "The Pacific Ocean is the largest ocean on Earth." },
  { category: "computer", label: "COMPUTER FUNDAMENTALS", question: "What does URL stand for?", options: ["Uniform Resource Locator", "Universal Record Link", "Unified Reference Language", "User Route Location"], answer: 0, explanation: "URL stands for Uniform Resource Locator, the address of a resource on the web." },
  { category: "web", label: "WEB DEVELOPMENT", question: "Which method can select an element by its ID in JavaScript?", options: ["document.getByClass()", "document.getElementById()", "document.queryAllId()", "window.selectId()"], answer: 1, explanation: "document.getElementById() returns the element matching the supplied ID." },
  { category: "computer", label: "COMPUTER FUNDAMENTALS", question: "Which of these is a common example of secondary storage?", options: ["CPU register", "Cache", "SSD", "RAM"], answer: 2, explanation: "An SSD stores data persistently, even when the computer is powered off." },
  { category: "general", label: "GENERAL KNOWLEDGE", question: "Which gas do plants absorb from the atmosphere during photosynthesis?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"], answer: 1, explanation: "Plants absorb carbon dioxide during photosynthesis." },
  { category: "web", label: "WEB DEVELOPMENT", question: "Which HTML tag is used to create a numbered list?", options: ["<ul>", "<li>", "<ol>", "<list>"], answer: 2, explanation: "The <ol> element creates an ordered, numbered list." },
  { category: "computer", label: "COMPUTER FUNDAMENTALS", question: "What is the main purpose of a web browser?", options: ["Compile every programming language", "Display and interact with web content", "Replace the operating system", "Design computer hardware"], answer: 1, explanation: "A web browser retrieves and displays web pages and other web content." }
];

const TOTAL_QUESTIONS = 10;
const QUIZ_SECONDS = 600;
const letters = ["A", "B", "C", "D"];

const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const categorySelect = document.getElementById("categorySelect");
const startButton = document.getElementById("startButton");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const progressText = document.getElementById("progressText");
const questionNumber = document.getElementById("questionNumber");
const answeredText = document.getElementById("answeredText");
const progressFill = document.getElementById("progressFill");
const categoryPill = document.getElementById("categoryPill");
const timerText = document.getElementById("timerText");
const timerBox = document.getElementById("timerBox");
const nextButton = document.getElementById("nextButton");
const quitButton = document.getElementById("quitButton");

let questions = [];
let currentIndex = 0;
let selectedAnswers = [];
let secondsLeft = QUIZ_SECONDS;
let timerInterval = null;
let finishedByTimer = false;

function showScreen(screen) {
  [welcomeScreen, quizScreen, resultScreen].forEach(item => item.classList.remove("active"));
  screen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startQuiz() {
  const selectedCategory = categorySelect.value;
  const filtered = selectedCategory === "all"
    ? questionBank
    : questionBank.filter(question => question.category === selectedCategory);
  questions = shuffle(filtered).slice(0, Math.min(TOTAL_QUESTIONS, filtered.length));
  currentIndex = 0;
  selectedAnswers = Array(questions.length).fill(null);
  secondsLeft = QUIZ_SECONDS;
  finishedByTimer = false;
  timerBox.classList.remove("warning");
  showScreen(quizScreen);
  renderQuestion();
  updateTimer();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    secondsLeft -= 1;
    updateTimer();
    if (secondsLeft <= 0) {
      finishedByTimer = true;
      finishQuiz();
    }
  }, 1000);
}

function updateTimer() {
  const minutes = Math.floor(Math.max(0, secondsLeft) / 60);
  const seconds = Math.max(0, secondsLeft) % 60;
  timerText.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  if (secondsLeft <= 60) timerBox.classList.add("warning");
}

function renderQuestion() {
  const question = questions[currentIndex];
  const number = String(currentIndex + 1).padStart(2, "0");
  questionText.textContent = question.question;
  categoryPill.textContent = question.label;
  progressText.innerHTML = `QUESTION ${number} <span class="muted">/ ${questions.length}</span>`;
  questionNumber.textContent = `${number} / ${String(questions.length).padStart(2, "0")}`;
  answeredText.textContent = `${selectedAnswers.filter(answer => answer !== null).length} answered`;
  progressFill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  optionsList.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button" + (selectedAnswers[currentIndex] === index ? " selected" : "");
    button.setAttribute("aria-pressed", selectedAnswers[currentIndex] === index ? "true" : "false");
    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = letters[index];
    const label = document.createElement("span");
    label.textContent = option;
    button.append(letter, label);
    button.addEventListener("click", () => {
      selectedAnswers[currentIndex] = index;
      renderQuestion();
    });
    optionsList.appendChild(button);
  });

  nextButton.innerHTML = currentIndex === questions.length - 1
    ? 'Finish quiz <span>✓</span>'
    : 'Next question <span>→</span>';
}

function goNext() {
  if (selectedAnswers[currentIndex] === null) {
    const firstOption = optionsList.querySelector(".option-button");
    if (firstOption) {
      firstOption.focus();
      firstOption.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "translateX(0)" }],
        { duration: 220 }
      );
    }
    document.querySelector(".choose-hint").textContent = "Please select an answer before continuing.";
    document.querySelector(".choose-hint").style.color = "#ff9bab";
    return;
  }
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  clearInterval(timerInterval);
  const correct = questions.reduce((total, question, index) => total + (selectedAnswers[index] === question.answer ? 1 : 0), 0);
  const total = questions.length;
  const percent = Math.round((correct / total) * 100);
  document.getElementById("scoreValue").textContent = `${correct}/${total}`;
  document.getElementById("correctCount").textContent = correct;
  document.getElementById("wrongCount").textContent = total - correct;
  document.getElementById("percentValue").textContent = `${percent}%`;
  document.getElementById("scoreRing").style.setProperty("--score-angle", `${percent * 3.6}deg`);
  const title = percent === 100 ? "Perfect score!" : percent >= 70 ? "Brilliant effort!" : percent >= 40 ? "Good progress!" : "Keep learning!";
  const message = finishedByTimer
    ? "Time is up! Review your answers and try again to improve your score."
    : percent >= 70
      ? "Excellent work. Keep that curiosity going and challenge yourself again."
      : "Every attempt helps you improve. Review the answers and give it another try.";
  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultMessage").textContent = message;
  document.getElementById("resultIcon").textContent = percent >= 70 ? "🏆" : percent >= 40 ? "✨" : "📚";
  document.getElementById("reviewPanel").hidden = true;
  document.getElementById("reviewButton").textContent = "Review answers →";
  renderReview();
  showScreen(resultScreen);
}

function renderReview() {
  const reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = "";
  const correct = questions.reduce((total, question, index) => total + (selectedAnswers[index] === question.answer ? 1 : 0), 0);
  document.getElementById("reviewSummary").textContent = `${correct} of ${questions.length} correct`;
  questions.forEach((question, index) => {
    const isCorrect = selectedAnswers[index] === question.answer;
    const item = document.createElement("article");
    item.className = "review-item";
    const heading = document.createElement("h3");
    heading.textContent = `${String(index + 1).padStart(2, "0")}. ${question.question}`;
    const answerLine = document.createElement("div");
    answerLine.className = "review-answer";
    const yourAnswer = selectedAnswers[index] === null ? "Not answered" : question.options[selectedAnswers[index]];
    const yourSpan = document.createElement("span");
    yourSpan.textContent = `Your answer: ${yourAnswer}`;
    if (!isCorrect) yourSpan.className = "wrong-answer";
    const correctLine = document.createElement("div");
    correctLine.className = "review-answer";
    const correctStrong = document.createElement("strong");
    correctStrong.textContent = `Correct answer: ${question.options[question.answer]}`;
    answerLine.appendChild(yourSpan);
    correctLine.appendChild(correctStrong);
    const explanation = document.createElement("p");
    explanation.className = "review-explanation";
    explanation.textContent = question.explanation;
    item.append(heading, answerLine, correctLine, explanation);
    reviewList.appendChild(item);
  });
}

function restartQuiz() {
  clearInterval(timerInterval);
  showScreen(welcomeScreen);
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", goNext);
quitButton.addEventListener("click", () => {
  if (confirm("Exit this quiz? Your current progress will be lost.")) {
    clearInterval(timerInterval);
    showScreen(welcomeScreen);
  }
});
document.getElementById("restartButton").addEventListener("click", restartQuiz);
document.getElementById("reviewButton").addEventListener("click", () => {
  const panel = document.getElementById("reviewPanel");
  panel.hidden = !panel.hidden;
  document.getElementById("reviewButton").textContent = panel.hidden ? "Review answers →" : "Hide answer review ↑";
  if (!panel.hidden) panel.scrollIntoView({ behavior: "smooth", block: "start" });
});
