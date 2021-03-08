import nevegtion from "./nevgation.js";


const startButton = document.getElementById("start-btn");
const container = document.getElementById("containerid");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const userageg = document.getElementById("age");
const generatebtn = document.getElementById("generate-btn");


let questionsArray, currentQuestionIndex;
const selectedButtonNumber = [];

let activeAnswer = false;
let useranswers = [];
let previousAnswer;



function startGame() {
  userageg.classList.add("hide");
  startButton.classList.add("hide");
  container.classList.add("forcontainer");
  questionContainerElement.classList.remove("hide");
  questionsArray = questions;
  currentQuestionIndex = 0;
  setNextQuestion();
  nextButton.classList.remove("hide");
}

nextButton.addEventListener("click", () => {
  if (activeAnswer == true) {
    currentQuestionIndex++;
    setNextQuestion();
    activeAnswer = false;
  }
});

function setNextQuestion() {
  resetState();
  showQuestion(questionsArray[currentQuestionIndex], currentQuestionIndex);
}

function showQuestion(question, currentQuestionIndex) {
  questionElement.innerText = question.question;
  var i = 0;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.dataset.number = i++;
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.remove("ok-next");
  nextButton.classList.add("block-next");
  nextButton.classList.remove("btn");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

generatebtn.addEventListener("click", function(){
  sumupp();
});

function sumupp() {
  for (var i = 0; i < useranswers.length; i++)
    useranswers[i] = parseInt(useranswers[i]);
  var sum = useranswers.reduce((a, b) => a + b, 0);
  console.log(sum);
  localStorage.setItem("useranswerssum", sum);
  console.log(localStorage.useranswerssum);
};


function selectAnswer(e) {
  const selectedButton = e.target;
  
  let selectedAnswerNumber = selectedButton.dataset.number;
  nextButton.classList.remove("block-next");
  nextButton.classList.add("ok-next");
  nextButton.classList.add("btn");
  if (activeAnswer == false) {
    previousAnswer = selectedButton;
    activeAnswer = true;
    useranswers.push(selectedAnswerNumber);
    console.log(useranswers)
    selectedButton.style.backgroundColor = "#94D6A3";
    selectedButtonNumber.push(selectedButton.dataset.number);
    nevegtion(questionsArray, currentQuestionIndex);
  } else {
    previousAnswer.style.backgroundColor = "#D1D8E5";
    useranswers.push(selectedAnswerNumber);
    useranswers.splice(currentQuestionIndex, 1);
    selectedButton.style.backgroundColor = "#94D6A3";
    previousAnswer = selectedButton;  
    localStorage.setItem("userArry", useranswers);  
  }
}


import questions from "./questions.js";

export default startGame

