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
