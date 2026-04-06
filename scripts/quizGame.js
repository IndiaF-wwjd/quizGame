"use strict";

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultsScreen = document.getElementById("resultsScreen");
const startButton = document.getElementById("startButton");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const currentQuestionSpan = document.getElementById("currentQuestion");
const totalQuestions = document.getElementById("totalQuestions");
const scoreSpan = document.getElementById("score");
const finalScore = document.getElementById("finalScore");
const maxScore = document.getElementById("maxScore");
const resultMessage = document.getElementById("resultMessage");
const restartButton = document.getElementById("restartButton");
const progressBar = document.getElementById("progress");

const quizQuestions = [
	{
		question: "Which is NOT a primary color?",
		answers: [
			{ text: "Red", correct: false },
			{ text: "Blue-purple", correct: true },
			{ text: "yellow", correct: false },
			{ text: "blue", correct: false },
		],
	},
	{
		question: "Which color cancels out yellow?",
		answers: [
			{ text: "Red-violet", correct: false },
			{ text: "Yellow", correct: false },
			{ text: "Green", correct: false },
			{ text: "Violet", correct: true },
		],
	},
	{
		question: "Which is NOT a secondary color?",
		answers: [
			{ text: "Blue", correct: true },
			{ text: "Green", correct: false },
			{ text: "Orange", correct: false },
			{ text: "Purple", correct: false },
		],
	},
	{
		question: "Which two colors make purple?",
		answers: [
			{ text: "Blue and Red", correct: true },
			{ text: "Blue and Green", correct: false },
			{ text: "Blue and Yellow", correct: false },
			{ text: "Blue and Orange", correct: false },
		],
	},
	{
		question: "Which three colors are Analogous colors?",
		answers: [
			{ text: "Green, yellow-green, and blue", correct: false },
			{ text: "Red, blue, violet", correct: false },
			{ text: "Blue, blue-green, green", correct: true },
			{ text: "Yellow, violet, orange", correct: false },
		],
	},
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestions.textContent = quizQuestions.length;
maxScore.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	scoreSpan.textContent = score;
	startScreen.classList.remove("active");
	quizScreen.classList.add("active");
	showQuestion();
}

function showQuestion() {
	answersDisabled = false;
	const currentQuestion = quizQuestions[currentQuestionIndex];
	currentQuestionSpan.textContent = currentQuestionIndex + 1
	const progressPercent = currentQuestionIndex + 1;
	progressBar.value = progressPercent;
	question.textContent = currentQuestion.question;
	answers.innerHTML = "";
	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.textContent = answer.text;
		button.classList.add("answerButton");
		button.dataset.correct = answer.correct;
		button.addEventListener("click", selectAnswer);
		answers.appendChild(button);
	});
}

function selectAnswer(event) {
	
	if (answersDisabled) return 
	answersDisabled = true
	const selectedButton = event.target;
	const isCorrect = selectedButton.dataset.correct === "true";
	Array.from(answers.children).forEach((button) => {
		if (button.dataset.correct == "true"){
			button.classList.add("correct");
		} else if (button === selectedButton) {
			button.classList.add("incorrect");
		}
	});

	if (isCorrect) {
		score++;
		scoreSpan.textContent = score;
	}
	setTimeout (() => {
		currentQuestionIndex++;
		if (currentQuestionIndex < quizQuestions.length) {
			showQuestion();
		} else {
			showResults();
		}
	}, 1000)
}

function showResults() {
	quizScreen.classList.remove("active")
	resultsScreen.classList.add("active")
	
	finalScore.textContent = score;
	
	const percentage =(score/quizQuestions.length) * 100
	if (percentage === 100){
		resultMessage.textContent = "Perfect!";
	} else if (percentage >= 80) {
		resultMessage.textContent = "Great job!";
	} else if (percentage >= 60) {
		resultMessage.textContent = "Good effort! Keep learning!";
	} else if (percentage >= 40) {
		resultMessage.textContent = "Not bad! Try again!";
	} else {
		resultMessage.textContent = "Keep studying!";
	}
}

function restartQuiz() {
	resultsScreen.classList.remove("active");
	startQuiz();
}