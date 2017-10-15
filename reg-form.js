window.URL = window.URL || window.webkitURL;

var arrInp = [5];

var mediaQuery = window.matchMedia( "(min-width: 700px)" );

document.querySelector("#file-button").onchange = showPicture;
var checkImg = false;
function showPicture(){

    debugger;
    // var linkImg = document.getElementById("file-button");
    // localStorage.linkImg = getBase64Image(linkImg);
    checkImg = true;
    // img = document.getElementById("user-picture");
    // img.src = "data:image/png;base64," + localStorage.linkImg;
}

// return the image
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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
    arrInp[0] = '';
    var ipName = document.getElementById("name-input").value;
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
    arrInp[0] = ipName;
    document.getElementById("name-error-mess").style.display = "none";
    document.getElementById("name-input").style.border = "1px solid grey";
    return true;
}

function checkEmail()
{
    arrInp[1] = '';
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
    arrInp[1] = ipEmail;
    document.getElementById("email-error-mess").style.display = "none";
    document.getElementById("email-input").style.border = "1px solid grey";
    return true;
}

function checkDob() {
    var ipDob = document.getElementById("dob-input");
    arrInp[2] = '';
    if (ipDob.value)
    {
        arrInp[2] = ipDob.value;
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
    arrInp[4] = '';
    if (ipMale.checked || ipFemale.checked) 
    {
        for (var i = 0; i < genderLabel.length; ++i)
        {
            genderLabel[i].style.color = "black";
        }
        if (ipMale.checked) arrInp[4] = "Male";
        else arrInp[4] = "Female";
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
    if (document.getElementById("check-student").checked) arrInp[5] = "Student";
    if (document.getElementById("check-teacher").checked) 
        if (arrInp[5] == '') arrInp[5] = "Teacher";
        else arrInp[5] += ",Teacher";
}

var submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click",function check(){
    var checkAll = errorImg() && checkName() && checkEmail() && checkDob() && checkGender();
    saveDept();
    arrInp[3] = document.getElementById("city-input").value;
    console.log(checkAll);
    if (checkAll) {
    alert(
    "Full Name   : " + arrInp[0] + 
    "\nEmail     : " + arrInp[1] + 
    "\nDOB       : " + arrInp[2] +
    "\nGender    : " + arrInp[3] +
    "\nCity      : " + arrInp[4] +
    "\nDepartment: " + arrInp[5] );
    document.getElementById("link-to-profile").click();
    localStorage.userInput = JSON.stringify(arrInp);
    }
    else {alert("Submit failed");}
});   

