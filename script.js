
var quizBod = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var FNLScoreEl = document.getElementById("finalScore");
var GODiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var HSContain = document.getElementById("highscoreContainer");
var HSDiv = document.getElementById("high-scorePage");
var HSInputName = document.getElementById("initials");
var HSDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var HSDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz question object
var quizQuestions = [{
    question: "What tag defines a division or beginning/end of an individual section in an HTML document?",
    choiceA: "table",
    choiceB: "meta",
    choiceC: "div",
    choiceD: "img",
    correctAnswer: "c"},
  {
    question: "In JavaScript, what is a block of code called that is used to perform a specific task?",
    choiceA: "Function",
    choiceB: "Declaration",
    choiceC: "Variable",
    choiceD: "String",
    correctAnswer: "a"},
   {
    question: "What is used primarily to add styling to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Python",
    choiceD: "React.js",
    correctAnswer: "b"},
    {
    question: "Name of the statement that is used to exit or end a loop?",
    choiceA: "Falter statement",
    choiceB: "Close statement",
    choiceC: "Conditional statement",
    choiceD: "Break statement",
    correctAnswer: "d"},
    {
    question: "What can loops offer JavaScript code as a whole?",
    choiceA: "Improved performance",
    choiceB: "Cleaner syntax",
    choiceC: "Added plug-ins",
    choiceD: "Cross-platform support",
    correctAnswer: "a"},  
    {
    question: "What does WWW stand for?",
    choiceA: "Web World Workings",
    choiceB: "Weak Winter Wind",
    choiceC: "World Wide Web",
    choiceD: "Wendy Wants Waffles",
    correctAnswer: "c"},
    {
    question: "HTML attribute that references a JavaScript file",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b"},
        
    
    ];
// Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    GODiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    GODiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBod.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizBod.style.display = "none"
    GODiv.style.display = "flex";
    clearInterval(timerInterval);
    HSInputName.value = "";
    FNLScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(HSInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = HSInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        GODiv.style.display = "none";
        HSContain.style.display = "flex";
        HSDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    HSDisplayName.innerHTML = "";
    HSDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        HSDisplayName.appendChild(newNameSpan);
        HSDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages from 
function showHighscore(){
    startQuizDiv.style.display = "none"
    GODiv.style.display = "none";
    HSContain.style.display = "flex";
    HSDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    HSDisplayName.textContent = "";
    HSDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    HSContain.style.display = "none";
    GODiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);
