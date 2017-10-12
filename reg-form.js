window.URL = window.URL || window.webkitURL;

var mediaQuery = window.matchMedia( "(min-width: 700px)" );

document.querySelector("#file-button").onchange = showPicture;
var checkImg=false;
function showPicture(){
    var linkImg=document.getElementById("file-button").files;
    linkImg = window.URL.createObjectURL(linkImg[0]);
    var img = document.getElementById("user-picture");
    img.src = linkImg;
    checkImg=true;
}

// var sideBar=document.getElementById("page-sidebar");

// var buttonSideBar = document.getElementById("show-side-bar");
// buttonSideBar.addEventListener("click",function showSideBar() {
//     if (sideBar.style.display == "none") sideBar.style.display = "block";
//     else 
//     {
//         sideBar.style.display = "none";
//     }
// });



function checkName() {
    localStorage.userInput[0]='';
    var ipName=document.getElementById("name-input").value;
    ipName = ipName.split(" ").filter(function(c) {return c!="";}).join(' ');
    var nameError = document.getElementById("name-error");
    if (/(^| )[a-z]/.test(ipName)) { 
        document.getElementById("name-error-mess").style.display = "flex";
        nameError.innerHTML = "Your name need capitalized";
        document.getElementById("name-input").style.borderr = "1px solid red";
        return false; 
    }
    if (ipName.length < 8) { 
        document.getElementById("name-error-mess").style.display = "flex";
        nameError.innerHTML = "Your name is at least 8 character";
        document.getElementById("name-input").style.border = "1px solid red";
        return false; 
    }
    localStorage.userInput[0] = ipName;
    document.getElementById("name-error-mess").style.display = "none";
    document.getElementById("name-input").style.border = "1px solid grey";
    return true;
}

function checkEmail()
{
    localStorage.userInput[1]='';
    var ipEmail = document.getElementById("email-input").value;
    ipEmail = ipEmail.trim();
    var emailError = document.getElementById("email-error");
    // console.log(ipEmail);
    if (ipEmail.length == 0) {
        document.getElementById("email-error-mess").style.display = "flex";
        emailError.innerHTML = "This field is required";
        document.getElementById("email-input").style.border = "1px solid red";
        return false;
    }
    if (!(/^[a-z0-9\.]+[a-z0-9]@[a-z]+\.([a-z]+\.)*[a-z0-9]+$/.test(ipEmail))) {
        document.getElementById("email-error-mess").style.display = "flex";
        emailError.innerHTML = "Your email is not valid";
        document.getElementById("email-input").style.border = "1px solid red";
        return false;
    }
    localStorage.userInput[1] = ipEmail;
    document.getElementById("email-error-mess").style.display = "none";
    document.getElementById("email-input").style.border = "1px solid grey";
    return true;
}

function checkDob() {
    var ipDob = document.getElementById("dob-input");
    localStorage.userInput[2]='';
    if (ipDob.value)
    {
        localStorage.userInput[2] = ipDob.value;
        document.getElementById("dob-error-mess").style.display = "none";
        ipDob.style.border = "1px solid grey";
        return true;
    }
    var check = true;
    if (check) document.getElementById("dob-error").innerHTML = "Your input is invalid";
    document.getElementById("dob-error-mess").style.display = "flex";
    ipDob.style.border = "1px solid red";
    return false;
}

function checkGender() {
    var ipMale = document.getElementById("male-input");
    var ipFemale = document.getElementById("female-input");
    var genderLabel = document.getElementsByClassName("gender-label");
    localStorage.userInput[4] = '';
    if (ipMale.checked || ipFemale.checked) 
    {
        for (var i = 0; i < genderLabel.length; ++i)
        {
            genderLabel[i].style.color = "black";
        }
        if (ipMale.checked) localStorage.userInput[4] = "Male";
        else localStorage.userInput[4] = "Female";
        return true;
    }
    else 
    {
        for (var i = 0; i < genderLabel.length; ++i)
        {
            genderLabel[i].style.color = "red";
        }
        return false;
    }
}

function errorImg() {
    if (checkImg) {
        var img = document.getElementById("user-picture");
        img.style.border = "none";
        return true;
    }
    else
    {
        var img = document.getElementById("user-picture");
        img.style.border = "1px solid red";
        return false;
    }
}

function saveDept() {
    if (document.getElementById("check-student").checked) localStorage.userInput[5]="Student";
    if (document.getElementById("check-teacher").checked) 
        if (localStorage.userInput[5]=='') localStorage.userInput[5]="Teacher";
        else localStorage.userInput[5] += ",Teacher";
}

var submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click",function check(){
    var checkAll = errorImg() && checkName() && checkEmail() && checkDob() && checkGender();
    saveDept();
    localStorage.userInput[3] = document.getElementById("city-input").value;
    console.log(checkAll);
    if (checkAll) {alert(
    "Full Name   : " + localStorage.userInput[0] + 
    "\nEmail     : " + localStorage.userInput[1] + 
    "\nDOB       : " + localStorage.userInput[2] +
    "\nGender    : " + localStorage.userInput[3] +
    "\nCity      : " + localStorage.userInput[4] +
    "\nDepartment: " + localStorage.userInput[5] );}
    else {alert("Submit failed");}
});   

