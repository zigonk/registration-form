// var idStandOn = 1;
// localStorage.Ques = [numberQuestion+1];
// localStorage.checkNew = [numberQuestion+1];
// localStorage.currentQuestion = 1;

var cur = Number(localStorage.currentQuestion);
var numberQuestion = Number(localStorage.numberQuestion);
var idStandOn= Number(localStorage.idStandOn);
var fwButton = document.getElementById("forward-button");
var bwButton = document.getElementById("backward-button");
var smButton = document.getElementById("submit-button");

window.document.onload = f5ShowQuestion();

function getIDQues(idQuestion) {
    return "ques" + idQuestion;
}

function f5ShowQuestion() {
    for (var i = cur+1; i<=numberQuestion; ++i) {
        var ithQues = document.getElementById(getIDQues(i));
        console.log(ithQues);
        ithQues.style.display = "none";
    }
    ShowQuestion(idStandOn);
}

function turnOffNew() {
    var ithNew = "new-" + getIDQues(idStandOn);
    document.getElementById(ithNew).style.display = "none";
}

function ShowQuestion(idQuestion) {
    idStandOn = idQuestion;
    localStorage.idStandOn = idStandOn;
    console.log(idQuestion);
    if (idStandOn == numberQuestion) 
    {
        fwButton.style.display = "none";
        smButton.style.display = "inline-block";
    }
    var ithQues = document.getElementById(getIDQues(idQuestion));
    ithQues.style.display = "block";
    document.getElementById("number-ques").innerHTML = "Question " + idQuestion;
}

// ADD JS TO MENU QUESTION

// for (var i=1; i<=numberQuestion; ++i) {
//      var ithQues=document.getElementById(getIDQues(i));
//      ithQues.addEventListener("click", ShowQuestion(i));
// }
// var ithQues=document.getElementById(getIDQues(1));
// ithQues.onclick = ShowQuestion(1);
// // ithQues=document.getElementById(getIDQues(2));
// // ithQues.addEventListener("onclick", ShowQuestion(2));
// // ithQues=document.getElementById(getIDQues(3));
// // ithQues.addEventListener("onclick", ShowQuestion(3));
// // ithQues=document.getElementById(getIDQues(4));
// // ithQues.addEventListener("onclick", ShowQuestion(4));
// // ithQues=document.getElementById(getIDQues(5));
// // ithQues.addEventListener("onclick", ShowQuestion(5));


// ADD JS TO BUTTON 

if (idStandOn == 1) bwButton.style.visibility = "hidden";

fwButton.addEventListener("click",function toNextPage() {
    turnOffNew();
    idStandOn++;
    localStorage.idStandOn = idStandOn;
    if (idStandOn > cur) 
    {
        cur++;
        localStorage.currentQuestion = cur;
        var idNew = "new-" + getIDQues(idStandOn);
        var ithNew = document.getElementById(idNew);
        ithNew.style.display = "inline";
    }
    if (bwButton.style.visibility == "hidden") bwButton.style.visibility = "visible";
    ShowQuestion(idStandOn);
});


bwButton.addEventListener("click", function toPreviousPage() {
    turnOffNew();
    idStandOn--;
    localStorage.idStandOn = idStandOn;
    ShowQuestion(idStandOn);
    if (idStandOn == 1) {
        bwButton.style.visibility = "hidden";
    }
    if (fwButton.style.display == "none") 
    {
        fwButton.style.display = "inline-block";
        smButton.style.display = "none";
    }
})

smButton.addEventListener("click", function toResulPage() {
    if (confirm('Are you sure to submit your answers ?')) {
        var resultPage = document.getElementById("link-to-result");
        resultPage.click();
    } else {
    }
});
