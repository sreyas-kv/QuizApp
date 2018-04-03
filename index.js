let questionNumber= 0;
let score= 0;

function generateQuestion(){
  if(questionNumber < STORE.length){
    return `<div class="question ${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form role="questions">
    <fieldset>
    <legend> Choose the correct answer from the below options:</legend>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answer[0]}" name="answer" required>
    <span>${STORE[questionNumber].answer[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answer[1]}" name="answer" required>
    <span>${STORE[questionNumber].answer[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answer[2]}" name="answer" required>
    <span>${STORE[questionNumber].answer[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answer[3]}" name="answer" required>
    <span>${STORE[questionNumber].answer[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
  }
function changeQuestionNumber(){
  questionNumber++;
  $('.questionNumber').text(questionNumber+1);
}
function changeScore(){
  score++;
}

function startQuiz(){
  $('.container').on('click', '.startButton', function(event){
    $('.container').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
  });
}

function renderQuestion () {
  // console.log($('questionAnswerForm').is(":visible"));
  $('.questionAnswerForm').html(generateQuestion());
}

function userSelectAnswer(){
  $('form').on('submit', function(event){
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    // console.log('user selected answer', questionNumber);
    if(answer === correctAnswer){
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    }
    else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect(){
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong(){
  userAnswerFeedbackWrong();
}

function userAnswerFeedbackCorrect(){
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="https://i.imgur.com/D1q59O8.gif" alt="yes"/></div>
  <p><b>Correct Answer!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function userAnswerFeedbackWrong(){
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="https://deshannonspeaks.files.wordpress.com/2015/05/keep-calm-and-try-again-444.png" alt="wrong answer"/></div><p>
  <b>Wrong Answer!</b><br>The correct answer is, <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function updateScore(){
  changeScore();
  $('.score').text(score);
}

function renderResults(){
  if(score >= 8){
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You're on fire!</h3><p>You got ${score} / 10</p><p>You are an expert</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Almost there!</h3><p>You got ${score} / 10</p><p>You have good knowledge!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Bad Score</h3><p>You got ${score} / 10</p><p>By reading more about software testing you will be able to do better!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

function renderNextQuestion(){
  $('main').on('click', '.nextButton', function(event){
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
    let a = 0;
    console.log('renderNextQuestion = ',a=a+1);
  });
}

function restartQuiz() {
    score= 0;
    questionNumber = 0;
    $('main').on('click', '.restartButton', function(event) {
    $('.score').text(0);
    $('.questionNumber').text(1);
   //renderQuestion(); changed this
  
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  console.log("after userSelectAnswer");
  //renderNextQuestion();
  });
}


function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
  console.log('render question ***');
}

$(createQuiz);

