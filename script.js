//store stats
let score = 0;
let questionNumber = 0;

function updateScore() {
    //should increase score by 1 if answer was correct
    score++
    $('.js-score').text(score)
}

function updateQuestionNumber() {
    //increse questionNumber by 1 
    questionNumber++
    //update html
    $('.js-question-number').text(questionNumber)
}

function generateQuestion() {
    //generate questions html
    return `
    <h1>${STORE[questionNumber].question}</h1>
    <form class="question-from">
        <fieldset>
            <label class="answer-label">
                <input required type="radio" name="answer" value="${STORE[questionNumber].answers[0]}">${STORE[questionNumber].answers[0]}
            </label>
            <label class="answer-label">
                <input required type="radio" name="answer" value="${STORE[questionNumber].answers[1]}">${STORE[questionNumber].answers[1]}
            </label>
            <label class="answer-label">
                <input required type="radio" name="answer" value="${STORE[questionNumber].answers[2]}">${STORE[questionNumber].answers[2]}
            </label>
            <label class="answer-label">
                <input required class="a" type="radio" name="answer" value="${STORE[questionNumber].answers[3]}">${STORE[questionNumber].answers[3]}
            </label>
            <button type="submit" class="js-submit-btn btn">Submit</button>
        </fieldset>
    </form>`
}

function startQuiz() {
    //listen for submit btn clicks
    //remove start-window when clicked
    $('.js-start-btn').on('click', function(event){
        $(this).parent().remove();
        renderQuestion();
        $('.stats').removeClass('hidden')
    })
}

function renderQuestion() {
    //render question
    $('.js-question-window').html(generateQuestion())
    updateQuestionNumber();
    checkAnswer();
}

function checkAnswer() {
    //compare submited value vs obj.correctAnswer

    $('form').on('submit', function(event) {
        event.preventDefault();
        if($('input:checked').val()===STORE[questionNumber-1].correctAnswer){
            updateScore();
            showCorrect();
        } else {
            showWrong();
        }

        // generateQuestion();
        // renderQuestion();
    })
}

function renderNextWindow() {
    $('.js-btn-next').on('click', function(event){
        // renders finish window
        if (questionNumber===10){
            $('.js-question-window').html(`<h1>FINISH!</h1>
            <button type="button" class="js-btn-restart btn btn-1">Next</button>`);
            restartQuiz()   
        // renders next question window          
        } else {
            generateQuestion()
            renderQuestion()    
        }
    })
}

function showCorrect() {
    $('.js-question-window').html(`<div class="answer-icon"><img src="assets/images/starks.png" alt="correct answer icon"/></div>
    <h1>Correct!</h1>
    <p>Keep it up Young Wolf!</p>
    <button type="button" class="js-btn-next btn btn-1">Next</button>`);
    renderNextWindow()
}

function showWrong() {
    $('.js-question-window').html(`<div class="answer-icon"><img src="assets/images/boltons.png" alt="correct answer icon"/></div>
    <h1>Wrong!</h1>
    <p>The correct answer is: <span class="correct-answer">"${STORE[questionNumber-1].correctAnswer}"</span>
    <button type="button" class="js-btn-next btn btn-1">Next</button>`);
    renderNextWindow()
}

function restartQuiz() {
    $('.js-btn-restart').on('click', function(event){
        location.reload()
    })
}

$(startQuiz)