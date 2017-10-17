var numberQuestion = 5;
var idStandOn = 1;
localStorage.numberQuestion = 5;
localStorage.idStandOn = 1;
localStorage.currentQuestion = 1;
localStorage.progress = 0;
localStorage.isSubmit = 0;

var timeOnQuestionIth = [6];
for (var i = 0; i < 6; ++i) timeOnQuestionIth[i]=0;
localStorage.timeOnQuestionIth = JSON.stringify(timeOnQuestionIth);

var resultArray = new Array(6);

for (var i = 0; i <= 5; ++i) resultArray[i] = new Array(5);

for (var i = 1; i <= 5; ++i) 
    for (var j=1; j <= 4; ++j) resultArray[i][j]=0;

localStorage.resultArray = JSON.stringify(resultArray);

var smButton = document.getElementById("submit-button");
smButton.addEventListener("click", function toQuizPage() {
    document.getElementById("to-ques1").click();
});

function addUserInput() {
    var arrInp = JSON.parse(localStorage.userInput);
    for (var i = 0; i <= 5; ++i)
    {
        var idInput = document.getElementById("userinput" + i);
        idInput.innerHTML = arrInp[i];
    }
    document.getElementById("user-picture").src = "data:image/png;base64," + localStorage.linkImg;
}

addUserInput();
debugger;
function initQuestion() {
    var arrQuestion = [5];
    arrQuestion = [ 
    {'isMultiple': 0, 'question': 'Are you ok?', 'ansContent': ['Yes', 'No', 'Okey', 'Fine'], 'answer': [0,1,0,0]},
    {'isMultiple': 1, 'question': 'Are you ok?', 'ansContent': ['Yes', 'No', 'Okey', 'Fine'], 'answer': [0,1,0,0]},
    {'isMultiple': 0, 'question': 'Are you ok?', 'ansContent': ['Yes', 'No', 'Okey', 'Fine'], 'answer': [0,1,0,0]},
    {'isMultiple': 1, 'question': 'Are you ok?', 'ansContent': ['Yes', 'No', 'Okey', 'Fine'], 'answer': [0,1,0,0]},
    {'isMultiple': 0, 'question': 'Are you ok?', 'ansContent': ['Yes', 'No', 'Okey', 'Fine'], 'answer': [0,1,0,0]}
    ];
    localStorage.Ques = JSON.stringify(arrQuestion);
}

initQuestion();
