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
var confirmYes = document.getElementById("confirm-yes");
var confirmNo = document.getElementById("confirm-no");

window.document.onload = f5ShowQuestion();

function getIDQues(idQuestion) {
    return "ques" + idQuestion;
}

function f5ShowQuestion() {
    for (var i = cur+1; i<=numberQuestion; ++i) {
        var ithQues = document.getElementById(getIDQues(i));
        ithQues.style.display = "none";
    }
    ShowQuestion(idStandOn);
}

function turnOffNew() {
    var ithNew = "new-" + getIDQues(idStandOn);
    document.getElementById(ithNew).style.display = "none";
}

function showMultipleQuestion(questionContent) {
    document.getElementById('content-multiple').style.display = 'block';
    document.getElementById('content-single').style.display = 'none';
    document.getElementById('content-multiple-question').innerHTML = questionContent.question;
    var resultArray = JSON.parse(localStorage.resultArray);
    for (var i = 1; i <= 4; ++i) {
        var idAns = 'mul-ans' + i +'-content';
        var idSelect = 'mul-ans' + i;
        document.getElementById(idAns).innerHTML = questionContent.ansContent[i-1];
        document.getElementById(idSelect).checked = resultArray[idStandOn][i];
    }

}

function showSingleQuesiton(questionContent) {
    document.getElementById('content-multiple').style.display = 'none';
    document.getElementById('content-single').style.display = 'block';
    document.getElementById('content-single-question').innerHTML = questionContent.question;
    var resultArray = JSON.parse(localStorage.resultArray);
    for (var i = 1; i <= 4; ++i) {
        var idAns = 'sin-ans' + i +'-content';
        var idSelect = 'sin-ans' + i;
        document.getElementById(idAns).innerHTML = questionContent.ansContent[i-1];
        document.getElementById(idSelect).checked = resultArray[idStandOn][i];
    }
}

function ShowQuestion(idQuestion) {
    idStandOn = idQuestion;
    localStorage.idStandOn = idStandOn;
    if (idStandOn == 1) {
        bwButton.style.visibility = "hidden";
    }
    if (fwButton.style.display == "none") 
    {
        fwButton.style.display = "inline-block";
        smButton.style.display = "none";
    }
    if (idStandOn == numberQuestion) 
    {
        fwButton.style.display = "none";
        smButton.style.display = "inline-block";
    }
    var ithQues = document.getElementById(getIDQues(idQuestion));
    ithQues.style.display = "block";
    document.getElementById("number-ques").innerHTML = "Question " + idQuestion;
    var arrQues = JSON.parse(localStorage.Ques);
    var question = arrQues[idQuestion-1];
    if (question.isMultiple) {
        showMultipleQuestion(question);
    }
    else {
        showSingleQuesiton(question);
    }
    document.getElementById('answered-progress').value = Number(localStorage.progress);
}


function convert(isMultiple) {
    if (isMultiple) return 'mul-ans';
    else return 'sin-ans';
}

function checkQuestionIsDone(idQuestion) {
    var answered = false;
    var resultArray = JSON.parse(localStorage.resultArray);
    for (var j = 1; j <= 4; ++j) 
    {
        answered |= resultArray[idQuestion][j];
    }
    return answered;
}

function updateResult (idQuestion) {
    var arrQues = JSON.parse(localStorage.Ques);
    var resultArray = JSON.parse(localStorage.resultArray);
    var question = arrQues[idQuestion-1];
    for (var i = 1; i <= 4; ++i)
    {
        var idAns = convert(question.isMultiple) + i;
        resultArray[idQuestion][i] = document.getElementById(idAns).checked;
    }
    localStorage.resultArray = JSON.stringify(resultArray);
    var progress = 0;
    for (var i = 1; i <= numberQuestion; ++i) {
        if (checkQuestionIsDone(i)) progress++;
    }
    document.getElementById('answered-progress').value = progress;
    localStorage.progress = progress;
}

if (idStandOn == 1) bwButton.style.visibility = "hidden";

fwButton.addEventListener("click",function toNextPage() {
    updateResult(idStandOn);
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
    updateResult(idStandOn);
    turnOffNew();
    idStandOn--;
    localStorage.idStandOn = idStandOn;
    ShowQuestion(idStandOn);
})

// smButton.addEventListener("click", function toResultPage() {
//     if (confirm('Are you sure to submit your answers ?')) {
//         var resultPage = document.getElementById("link-to-result");
//         resultPage.click();
//     } else {
//     }
// });

smButton.addEventListener("click", function toResultPage() {
    // document.getElementById("myDIV").style.transition = "all 2s";
    updateResult(idStandOn);
    document.getElementById("confirm").style.display = "block";
    confirmYes.addEventListener("click", function() {
        var resultPage = document.getElementById("link-to-result");
        resultPage.click();
    });
    confirmNo.addEventListener("click", function() {
        document.getElementById("confirm").style.display = "none";
        for (var i = 1; i <= numberQuestion; ++i) {
            if (!checkQuestionIsDone(i)) 
            {
                ShowQuestion(i);
                break;
            }
        }
    });
});

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}   

// document.addEventListener("load", function countTime() {
function countTime() {    
    var start = new Date().getTime();
    setInterval(function() {
        var now  = new Date().getTime();
        var timeOnQuestionIth = JSON.parse(localStorage.timeOnQuestionIth);
        timeOnQuestionIth[idStandOn]++;
        localStorage.timeOnQuestionIth = JSON.stringify(timeOnQuestionIth);
        var distance = now - start;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (minutes == 1) {
            var resultPage = document.getElementById("link-to-result");
            resultPage.click();
        }
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        document.getElementById("timecount").innerHTML = minutes + ":" + seconds;
    }, 1000);
}