// Quiz questions
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correctAnswer: 3
    },
    {
        question: "What year was JavaScript launched?",
        options: ["1996", "1995", "1994", "none of the above"],
        correctAnswer: 1
    }
];

// DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const resultMessageElement = document.getElementById('result-message');

// Quiz variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

// Event listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;

    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    resultsScreen.classList.add('hidden');

    updateScore();
    startTimer();
    showQuestion();
}

function startTimer() {
    clearInterval(timer);
    timerElement.textContent = `Time: ${timeLeft}`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    questionText.textContent = question.question;

    optionsContainer.innerHTML = '';
    nextBtn.classList.add('hidden');

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');

    options.forEach(option => {
        option.disabled = true;
    });

    if (selectedIndex === question.correctAnswer) {
        options[selectedIndex].classList.add('correct');
        score++;
        updateScore();
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correctAnswer].classList.add('correct');
    }

    nextBtn.classList.remove('hidden');
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function endQuiz() {
    clearInterval(timer);

    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    finalScoreElement.textContent = `Your final score is: ${score} out of ${quizQuestions.length}`;

    const percentage = (score / quizQuestions.length) * 100;
    let message = '';

    if (percentage >= 80) {
        message = "Excellent! You're a quiz master! 🎉";
    } else if (percentage >= 60) {
        message = "Good job! You know your stuff! 👍";
    } else if (percentage >= 40) {
        message = "Not bad! Keep learning! 📚";
    } else {
        message = "Keep practicing! You'll get better! 💪";
    }

    resultMessageElement.textContent = message;
}
