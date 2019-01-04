//store stats
let score = 0;
let questionNumber = 0;

function startQuiz() {
    //listen for submit btn clicks
    //remove start-window when clicked
    $('.start-btn').on('click', function(event){
        $(this).parent().remove();

    })
}

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
                <input type="radio" name="answer" value="${STORE[questionNumber].answers[0]}">${STORE[questionNumber].answers[0]}
            </label>
            <label class="answer-label">
                <input type="radio" name="answer" value="${STORE[questionNumber].answers[1]}">${STORE[questionNumber].answers[1]}
            </label>
            <label class="answer-label">
                <input type="radio" name="answer" value="${STORE[questionNumber].answers[2]}">${STORE[questionNumber].answers[2]}
            </label>
            <label class="answer-label">
                <input class="a" type="radio" name="answer" value="${STORE[questionNumber].answers[3]}">${STORE[questionNumber].answers[3]}
            </label>
            <button type="submit" class="submit-btn">Submit</button>
        </fieldset>
    </form>`
}

function renderQuestion() {
    //render question
    $('.question-window').html(generateQuestion())
    updateQuestionNumber();
    checkAnswer();
}

function renderNextQuestion() {
    generateQuestion();
    renderQuestion();
}

function checkAnswer() {
    //compare submited value vs obj.correctAnswer

    $('form').on('submit', function(event) {
        event.preventDefault();
        if($('input:checked').val()===STORE[questionNumber-1].correctAnswer){
            updateScore();
        }

        generateQuestion();
        renderQuestion();
    })
}

function ifCorrect() {
    
}

function runQuiz() {
    //runs all functions
    startQuiz()
    renderQuestion()
}

$(runQuiz)