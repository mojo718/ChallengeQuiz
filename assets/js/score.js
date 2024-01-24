


function displayScores() {

    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    if (highScores.length === 0) {
        document.write("<p>No scores recorded.</p>");
    } else {
        document.write("<ul>");
        for (var i = 0; i < highScores.length; i++) {
            document.write("<li>" + highScores[i].initials + ": " + highScores[i].score + "</li>");
        }
        document.write("</ul>");
    }
}

displayScores()

function clearScores() {
    localStorage.clear();
    displayScores()
}

function returnToStart() {
    window.location.href = "index.html"
}

var clearScoreEl = document.getElementById("clearScore");
clearScoreEl.addEventListener("click", clearScores)

var returnToStartEL =document.getElementById("returnToStart");
returnToStartEL.addEventListener("click", returnToStart)