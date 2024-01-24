// psuedo coding things i need to do:
// some HTML and CSS to display quiz
// creating global Vars with Arrays for questions, choices and answers
var currentQuestion = 0
var score = 0;
var timer;
var timeRemaining = 60;
var quizStarted = true //added to keep track if quiz started

// questions var Array
var questions = [
    {
        question: "Which is NOT a type of variable in JS?",
        choices: ["A. string", "B. HTML", "C. boolean", "D. int"],
        correctAnswer: "B"
    },
    {
        question: "Java is short for JavaScript.  True or False",
        choices: ["A. True", "B. False"],
        correctAnswer: "A"
    },
    {
        question: "which is the correct syntax for a comment in JavaScript?",
        choices: ["A. // this is a comment", "B. !// this is a comment", "C. || this is a comment"],
        correctAnswer: "A"
    }
];


// Added an event listener to start button that starts quiz if clicked.


// function StartQuiz() {
//     document.getElementById("Welcome-Start").style.display = "block"
//     var startButtonEL = document.getElementById("startButton");
//     startButtonEL.addEventListener("click", showQuestion);
// }

function startQuiz() {

    document.getElementById("Welcome-Start").style.display = "none"
    quizStarted = true;
    timer = setInterval(updateTimer, 1000);
    showQuestion();

};

// function show the questions using a Carousel (thank u Bobby, for help with this!- reversed engineered code he demonstrated and various other resources)
// other resources used https://www.w3schools.com/jsref/prop_html_innerhtml.asp
// https://www.w3schools.com/jsref/met_document_createelement.asp

function showQuestion() {


    var questionEl = document.getElementById("question");
    var choicesEl = document.getElementById("choices");

    questionEl.textContent = questions[currentQuestion].question;

    choicesEl.innerHTML = "";
    for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
        var choice = document.createElement("div");
        choice.textContent = questions[currentQuestion].choices[i];

        choice.addEventListener("click", function (event) {
            checkAnswer(event);
        });

        choicesEl.appendChild(choice);
    }
    document.getElementById("timer").style.display = "block";
    document.getElementById("question").style.display = "block";
    document.getElementById("choices").style.display = "block";

}

// function to check the answers after click
function checkAnswer(event) {
    var selectedChoice = event.target.textContent;
    if (selectedChoice.charAt(0).toUpperCase() === questions[currentQuestion].correctAnswer) {
        score++;
    } else {
        timeRemaining -= 10;
        if (timeRemaining < 0)
            timeRemaining = 0;
    }


    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {

        endQuiz();
    }
}

// function to update the timer
function updateTimer() {
    document.getElementById("time").textContent = timeRemaining;
    if (timeRemaining === 0) {
        endQuiz();
    } else {
        timeRemaining--;
    }
}

// function to end quiz and display score
// used style.display to hide\show elements
function endQuiz() {
    document.getElementById("timer").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("choices").style.display = "none";
    document.getElementById("result").textContent = "The Quiz is Over.     Final Score is: " + score;
    document.getElementById("result").style.display = "block";
    document.getElementById("initials").style.display = "block";
    document.getElementById("restart").style.display = "block";
    document.getElementById("displayScores").style.display = "block";
}
// function to recored the score and initials (had to use JSON parse and stringify)
// https://www.w3schools.com/js/js_json_stringify.asp and https://www.w3schools.com/js/js_json_parse.asp


function recordScore() {

    var initials = document.getElementById("initialsInput").value;
    var highScores = JSON.parse(localStorage.getItem("highScores")) || []; //need to check this
    highScores.push({ initials: initials, score: score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    alert("Score has been saved.");
}


// function to display score in a different Window
function redirectPage() { 
    window.location.href = "scores.html";
}

// //funtion to restart quiz 
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeRemaining = 60;
    quizStarted = false;
    document.getElementById("initials").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("displayScores").style.display = "none";
    document.getElementById("result").style.display = "none";
    clearInterval(timer); // Clear the interval to stop the timer
    startQuiz();

}

// attach event listeners 


var startButtonEL = document.getElementById("startButton");
startButtonEL.addEventListener("click", startQuiz);

var recordScoreEl = document.getElementById("recordScore");
recordScoreEl.addEventListener("click", recordScore);

var clearScoreEl =document.getElementById("clearScore");

//https://www.w3schools.com/jsref/event_preventdefault.asp 
var displayScoresEl = document.getElementById("displayScores");
displayScoresEl.addEventListener("click", function(event) {
    event.preventDefault(); 
    // displayScores();
    redirectPage()
});

var restartEl = document.getElementById("restartButton");
restartEl.addEventListener("click", restartQuiz);