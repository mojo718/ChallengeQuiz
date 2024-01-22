var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

if (highScores.length === 0) {
    document.write("<p> No Scores recorded yet. </P>")
} else {
    document.write("<ul>");
    for (var i=0; i < highScores.length; i++) {
        document.write("<li>" + highScores[i].intiials + ": " +highScores [i].score + "<li>");
    }
    document.write("<ul>");

}