// QUESTIONS

const questions = [
  {
    "question": "You're in the woods! What animal have you magically turned into?",
    "answer1": "A rabbit",
    "answer1Total": "1",
    "answer2": "A wolf",
    "answer2Total": "2",
    "answer3": "A horse",
    "answer3Total": "3",
    "answer4": "A lion",
    "answer4Total": "4"
  },
  {
    "question": "Walking along a path, you spot a talking cat! He gives you a pot of gold. What do you do with it?",
    "answer1": "I don't need it! The cat can keep his money.",
    "answer1Total": "1",
    "answer2": "Fine...I'll take a handful of coins. If you insist!",
    "answer2Total": "2",
    "answer3": "Woah! I will fill my pockets with the gold coins. I will leave the cat with a few coins.",
    "answer3Total": "3",
    "answer4": "Ha! The entire pot is mine. This cat must be so generous!",
    "answer4Total": "4"
  },
  {
    "question":
      "Wait! Before you leave, the cat wants to ask you a question. \"Which of these four matters the most to you now?\" ",
    "answer1": "Love! My relationships with others are very important.",
    "answer1Total": "1",
    "answer2": "Education...studies are my priority!",
    "answer2Total": "3",
    "answer3": "Career! My work matters the most.",
    "answer3Total": "2",
    "answer4": "Money...! I just need a lot of money now.",
    "answer4Total": "4"
  },
  {
    "question": "Off you go! You ",
    "answer1": "You feel superior to other people.",
    "answer1Total": "3",
    "answer2": "You consider yourself more practical than creative.",
    "answer2Total": "2",
    "answer3":
      "Winning a debate matters less to you than making sure no one gets upset.",
    "answer3Total": "1"
  },
  {
    "question": "Which best describes your relationship with food",
    "answer1": "You tend to over-eat when you have company.",
    "answer1Total": "1",
    "answer2": "You tend to eat snacks secretly.",
    "answer2Total": "2",
    "answer3": "You prepare food and don\’t even look at the recipe.",
    "answer3Total": "3"
  },
  {
    "question":
      "You make plans with a friend and they cancel on you, what do you do?",
    "answer1":
      "Say \"whatever\" and plan a night that'll be GREAT so they don't cancel again.",
    "answer1Total": "3",
    "answer2": "Feel hurt because you were looking forward to tonight.",
    "answer2Total": "2",
    "answer3": "No problem, you kinda wanted to stay home anyway.",
    "answer3Total": "1"
  },
  {
    "question": "Which of the following colours do you like most?",
    "answer1": "Black",
    "answer1Total": "1",
    "answer2": "Yellow or light blue",
    "answer2Total": "2",
    "answer3": "Red or orange",
    "answer3Total": "3"
  }
]


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    const option4Total = questions[index].answer4Total;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option4.setAttribute('data-total', `${option4Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
    option4.innerHTML = `${question.answer4}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your score: ${totalScore}</h1>
         <div class="summary">
            <h1>Summary</h1>
            <p>Possible - Personality Traits, see below for a summary based on your results:</p>
            <p>15 - 21- You Need Help</p>
            <p>10 - 15 - Good Soul</p>
            <p>5 - 10 - Meh </p>
            <p>5 - Are You Even Real</p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);