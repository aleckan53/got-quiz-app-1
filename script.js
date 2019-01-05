//store stats
let score = 0;
let questionNumber = 0;

function updateScore() {
    // increse score by 1 and renders it
    score++;
    $('.js-score').text(score);
};

function updateQuestionNumber() {
    //increse questionNumber by 1 and renderes it
    questionNumber++;
    $('.js-question-number').text(questionNumber);
};

function generateQuestion() {
    //generates new question
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
};

function startQuiz() {
    // listen for start btn click => removes start-window when clicked
    $('.js-start-btn').on('click', function(event){
        $(this).parent().remove();
        renderQuestion();
        $('.stats').removeClass('hidden');
    });
};

function renderQuestion() {
    // renders a question, checks answer
    $('.js-question-window').html(generateQuestion())
    updateQuestionNumber();
    checkAnswer();
}

function checkAnswer() {
    // compares submited value vs obj.correctAnswer
    // shows feedback on selected answer
    $('form').on('submit', function(event) {
        event.preventDefault();
        if($('input:checked').val()===STORE[questionNumber-1].correctAnswer){
            updateScore();
            showCorrect();
        } else {
            showWrong();
        }
    });
};

function renderNextWindow() {
    $('.js-btn-next').on('click', function(event){
        // renders results
        if (questionNumber===10){
            $('.js-question-window').html(results());
            restartQuiz();   
        // renders next question          
        } else {
            generateQuestion();
            renderQuestion();    
        }
    });
};

function results() {
    // generates results
    if (score>=8){
        return `<div class="result-icon"><img src="assets/images/starks.png" alt="stark house icon"/></div>
        <h1>EXCELLENT!</h1>
        <p>Your score is ${score} out of 10!</p>
        <p>Excellent job refreshing your knowlege before watching the last season!</p><button type="button" class="js-btn-restart btn btn-1">Restart</button>`
    } else if (8>score>=4) {
        return `<div class="result-icon"><img src="assets/images/targaryen.png" alt="targaryen house icon"/></div>
        <h1>Well done!</h1>
        <p>Your score is ${score} out of 10!</p>
        <p>Keep on practicing to become a truth Stark!</p><button type="button" class="js-btn-restart btn btn-1">Restart</button>`
    } else if (score<4) {
        return `<div class="result-icon"><img src="assets/images/baratheon.png" alt="baratheon house icon"/></div>
        <h1>Shame on you!</h1>
        <p>Your score is ${score} out of 10!</p>
        <p>You'd better watching GOT now!</p><button type="button" class="js-btn-restart btn btn-1">Restart</button>`
    }
};

function showCorrect() {
    // if answer is correct, generates feedback
    $('.js-question-window').html(`<div class="answer-icon"><img src="assets/images/starks.png" alt="stark house icon"/></div>
    <h1>Correct!</h1>
    <p>Keep it up Young Wolf!</p>
    <button type="button" class="js-btn-next btn btn-1">Next</button>`);
    renderNextWindow();
}

function showWrong() {
    // generates feedback if wrong
    $('.js-question-window').html(`<div class="answer-icon"><img src="assets/images/boltons.png" alt="bolton house icon"/></div>
    <h1>Wrong!</h1>
    <p>The correct answer is: <span class="correct-answer">"${STORE[questionNumber-1].correctAnswer}"</span>
    <button type="button" class="js-btn-next btn btn-1">Next</button>`);
    renderNextWindow();
};

function restartQuiz() {
    // restarts page
    $('.js-btn-restart').on('click', function(event){
        location.reload();
    });
};

$(startQuiz)