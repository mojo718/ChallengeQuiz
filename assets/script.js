// psuedo coding things i need to do:
// some HTML and CSS to display quiz
// creating global Vars with Arrays for questions, choices and answers
var currentQuestion = 0
var score = 0;
var timer;
var timeRemaining = 60;
// questions var Array
var questions = [
    {
        question: "Which is NOT a type of variable in JS?",
        choices: ["A. string", "B. HTML", "C. boolean", "D. int"],
        correctAnswer: "B"
    },
    {
        question: "Java is short for JavaScript.  True or False",
        choices: ["True", "False"],
        correctAnswer: "True"
    },
    {
        question: "which is the correct syntax for a comment in JavaScript?",
        choices: ["A. // this is a comment", "B. !// this is a comment", "C. || this is a comment"],
        correctAnswer: "A."
    }
];
// functions:
// function start quiz with a timer w\event listerner on Start Button
// https://www.w3schools.com/howto/howto_js_countdown.asp
var startButton = document.getElementById("startButton");
startButton.addEventListener("click", startQuiz)

function startQuiz() {
    document.getElementById("Welcome-Start").style.display = "none";
    showQuestion();
    timer = setInterval(updateTimer, 1000);
}
// function show the questions using a Carousel (thank u Bobby, for help with this!- reversed engineered code he demonstrated)
// other resources used https://www.w3schools.com/jsref/prop_html_innerhtml.asp
// https://www.w3schools.com/jsref/met_document_createelement.asp
function showQuestion() {
    var questionContainer = document.getElementById("question");
    var choicesContainer = document.getElementById("choices");

    questionContainer.textContent = questions[currentQuestion].question

    choicesContainer.innerHTML = "";
    for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
        var choice = document.createElement("div");
        choice.textContent = questions[currentQuestion].choices[i];

        choice.addEventListener("click", function (event) {
            checkAnswer(event);
        });

        choicesContainer.appendChild(choice);
    }
    document.getElementById("timer").style.display = "block"
    document.getElementById("question").style.display = "block"
    document.getElementById("choices").style.display = "block"

}

// function to check the answers
function checkAnswer(event) {
    var selectedChoice = event.target.textContent;
    if (selectedChoice.charAt(0).toLowerCase() === questions[currentQuestion].correct) {
        score++;
    } else {
        timeRemaining -= 10;
        if (timeRemaining < 0);
        timeRemaining = 0;
    }
}

currentQuestion++;

if (currentQuestion < questions.length) {
    showQuestion();
} else {
    endQuiz();
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
    document.getElementById("timer").style.display ="none"
    document.getElementById("question").style.display ="none"
    document.getElementById("choices").style.display ="none"
    document.getElementById("result").textContent = "The Quiz is Over.  Your Score is: " + score;

    document.getElementById("initials").style.display ="block"
    document.getElementById("restart").style.display ="block"
    document.getElementById("display-scores").style.display ="block"
}
// function to recored the score and intitials (had to use JSON parse and stringify)
// https://www.w3schools.com/js/js_json_stringify.asp and https://www.w3schools.com/js/js_json_parse.asp
function recordScore() {
    var intitials = document.getElementById("intitialsInput").value;
    var highScores = JSON.parse(localStorage.getItem("highScores")); //need to check this
    highScores.push({intitials: intitials, score: score});
    localStorage.setItem("highScores", JSON.stringify(highScores));
    alert ("Score has been saved.");
}


// function to display score in a different Window

