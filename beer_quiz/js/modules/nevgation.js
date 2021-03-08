const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const generate = document.getElementById('generate-btn')


// function setNextQuestion() {
//     resetState()
//     showQuestion(questionsArray[currentQuestionIndex],currentQuestionIndex)
// }


function nevegtion(questionsArray, currentQuestionIndex){
    if (currentQuestionIndex < 1) {
        nextButton.classList.remove('hide')    }
    else if (questionsArray.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }
    else {
        nextButton.classList.add('hide')
        generate.classList.remove('hide')
        
    }
}


export default nevegtion
