'use strict';

//store stats
let score = 0;
let questionNumber = 0;
let finished = false;

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

function shuffleQuestions() {
  // shuffle questions
  STORE.sort(function () {
    return .5 - Math.random();
  });
  // shuffle answers
  STORE.forEach(a => {
    a.answers.sort(function () {
      return .5 - Math.random();
    })
  })
}

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
  shuffleQuestions();
  $('.js-start-btn' || '.js-btn-restart').on('click', function (event) {
    $(this).parent().remove();
    renderQuestion();
    $('.stats').removeClass('hidden');
    genTimer();
    $('.js-start-window').remove()
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
  $('form').on('submit', function (event) {
    event.preventDefault();
    if ($('input:checked').val() === STORE[questionNumber - 1].correctAnswer) {
      updateScore();
      showCorrect();
    } else {
      showWrong();
    }
  });
};

function renderNextWindow() {
  $('.js-btn-next').on('click', function (event) {
    // renders results
    if (questionNumber === 10) {
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
  finished = true;

  // generates results
  if (score >= 8) {
    return `<div class="result-icon"><img src="assets/images/starks.png" alt="stark house icon"/></div>
        <h1>EXCELLENT!</h1>
        <p>Your score is ${score} out of 10!</p>
        <p>Excellent job refreshing your knowlege before watching the last season!</p><button type="button" class="js-btn-restart btn btn-1">Restart</button>`
  } else if (score < 8 && score >= 4) {
    return `<div class="result-icon"><img src="assets/images/targaryen.png" alt="targaryen house icon"/></div>
        <h1>Well done!</h1>
        <p>Your score is ${score} out of 10!</p>
        <p>Keep on practicing!</p><button type="button" class="js-btn-restart btn btn-1">Restart</button>`
  } else if (score < 4) {
    return `<div class="result-icon"><img src="assets/images/baratheon.png" alt="baratheon house icon"/></div>
        <h1>Fail!</h1>
        <p>Your score is ${score} out of 10!</p>
        <p>You'd better rewatch the entire show!</p><button type="button" class="js-btn-restart btn btn-1">Restart</button>`
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
  $('.js-btn-restart').on('click', function () {
    $('html').removeClass('dark');
    $('body').removeClass('dark');

    score = -1;
    updateScore();
    questionNumber = 0;
    generateQuestion();
    renderQuestion();
    renderNextWindow();
    genTimer();
    shuffleQuestions();
  });
};

function genTimer() {
  Number.prototype.pad = function(size) {
    let s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }

  finished = false;
  let m = 1;
  let s = 59;

  let countdown = function(){
    $('.timer').text(`${m}:${s.pad()}`)
    if (finished === false){
      if (s > 0) {s--}
      else if (s === 0 && m === 0) {
        s=0;
        m=0;
        winterHasCome();
        clearInterval(countdownI);
      }
      else if (s === 0) {m--; s=59}  
    }
    else {
      clearInterval(countdownI);
    }
  }
  
  let countdownI = setInterval(countdown, 1000)
}



function winterHasCome () {
  $('body').addClass('dark')
  $('html').addClass('dark')
  $('.js-question-window').html(`
  <div class="result-icon"><img src="assets/images/night_king.png" alt="the night king"/></div>
  <h1>Winter Has Come!</h1>
  <p>The Night King and his army have destroyed Westeros!</p><button type="button" class="js-btn-restart btn btn-1">Retry</button>
  `)

  restartQuiz();
}

$(startQuiz)