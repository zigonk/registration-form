var numberQuestion = 5;
var idStandOn = 1;
localStorage.numberQuestion = 5;
localStorage.idStandOn = 1;
localStorage.Ques = [numberQuestion+1];
localStorage.checkNew = [numberQuestion+1];
localStorage.currentQuestion = 1;

var smButton = document.getElementById("submit-button");
smButton.addEventListener("click", function toQuizPage() {
    document.getElementById("to-ques1").click();
});