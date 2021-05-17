// Show arrow depending on which page you are on
var pageName = window.location.pathname

console.log(pageName)

switch (pageName) {
    case '/listastickWeb/home.html':
        document.getElementById('homeArrow').classList.toggle('arrowActive');
        break;
    case '/listastickWeb/calendar.html':
        document.getElementById('calendarArrow').classList.toggle('arrowActive');
        break;
    case '/listastickWeb/profile.html':
        document.getElementById('profileArrow').classList.toggle('arrowActive');
        break;
}

//Funcionamiento interno del Login Form

const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

if (loginButton != null) {
    
    loginButton.addEventListener("click", (action) => {
        action.preventDefault();

        const mail = document.getElementById("mail").value
        const password = document.getElementById("password").value

        console.log(mail, password)
        console.log(loginErrorMsg.innerHTML)
        if (mail === "listastickDev" && password === "webdev") {
            window.location.href = "home.html"
        } else if (mail === "listastickDev") {
            loginErrorMsg.style.display = "block";
            loginErrorMsg.innerHTML = "Error: Wrong password"
        } else {
            loginErrorMsg.style.display = "block";
            loginErrorMsg.innerHTML = "Error: User does not exist" 
        }
   
    })

    var input1 = document.getElementById("password");

    input1.addEventListener("keyup", function(event) {

        if (event.keyCode === 13) {

            event.preventDefault();

            document.getElementById("login-form-submit").click();
    }
    })

    var input2 = document.getElementById("login-form-submit");

    input1.addEventListener("keyup", function(event) {

        if (event.keyCode === 13) {

            event.preventDefault();

            document.getElementById("login-form-submit").click();
        }
    })

}

// Termina funcionamiento interno de LoginForm


// Funcionamiento interno de RegisterForm

const registerButton = document.getElementById("register-form-submit");
const registerErrorMsg = document.getElementById("register-error-msg");

if (registerButton != null) {

    registerButton.addEventListener("click", (action) => {
        action.preventDefault();

        const email = document.getElementById("email").value
        const fullName = document.getElementById("fullName").value
        const password = document.getElementById("password").value
        const repeatPassword = document.getElementById("repeatPassword").value
        let errorCount = 0

        if (!checkEmailValidity(email)) {
            registerErrorMsg.style.display = "block"
            document.getElementById("email").style = "box-shadow: rgb(181 49 49) 0px 0px 0px 5px;"
            errorCount++;
        } else {
            document.getElementById("email").style = "box-shadow: none"
        }

        if (!checkFullName(fullName)) {
            registerErrorMsg.style.display = "block"
            document.getElementById("fullName").style = "box-shadow: rgb(181 49 49) 0px 0px 0px 5px;"
            errorCount++;
        } else {
            document.getElementById("fullName").style = "box-shadow: none"
        }

        if (!checkPassword(password)) {
            registerErrorMsg.style.display = "block"
            document.getElementById("password").style = "box-shadow: rgb(181 49 49) 0px 0px 0px 5px;"
            errorCount++;
        } else {
            document.getElementById("password").style = "box-shadow: none"
        }

        if (password != repeatPassword) {
            registerErrorMsg.style.display = "block"
            document.getElementById("repeatPassword").style = "box-shadow: rgb(181 49 49) 0px 0px 0px 5px;"
            errorCount++;
        } else {
            document.getElementById("repeatPassword").style = "box-shadow: none"
        }
        
        if (errorCount === 0) {
            window.location.href = "home.html"
        } else {
            registerErrorMsg.style.display = "block"; 
        }
})

    var input1 = document.getElementById("repeatPassword");

    input1.addEventListener("keyup", function(event) {

        if (event.keyCode === 13) {

            event.preventDefault();

            document.getElementById("register-form-submit").click();
    }
    })

    var input2 = document.getElementById("register-form-submit");

    input1.addEventListener("keyup", function(event) {

        if (event.keyCode === 13) {

            event.preventDefault();

            document.getElementById("register-form-submit").click();
    }
    })

}

// Checking if the email of Register Input is correct
function checkEmailValidity(email) {
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return (true)
  } else {
    return (false)
  }
}

// Checking if the name of Register Input is correct
function checkFullName(fullName) {
    if (/^[a-zA-Z]+( [a-zA-Z]+)+$/.test(fullName)) {
        return true
    } else {
        return false
    }
}

// Checking if password is longer than 8 characters
function checkPassword(password) {
    if(password.length < 8) {   
        return false;  
     }  else {
        return true;
     }
}

// Checking task as done

function checkingTask(e) {
    e.preventDefault();

    let checkmark = this.querySelector('.checkmark');
    let taskText = this.querySelector('label');

    checkmark.classList.toggle('checkmarkChecked');
    taskText.classList.toggle('checkedText');

    let completedList = document.querySelector('#completedTask ul');
    let taskList = document.querySelector('#currentTask ul');
    if (checkmark.classList.contains('checkmarkChecked')) {
        completedList.prepend(this);
    } else {
        taskList.prepend(this);

    }
}

document.querySelectorAll('.taskElement').forEach(function(el){
    el.addEventListener('click', checkingTask);
})

// Adding task to generalTasks

var addTaskBtn = document.querySelector('#addTaskBtn');
var addTaskInput = document.getElementById('addTaskInput');

if (addTaskBtn != null) {
addTaskBtn.addEventListener('click', function(e){

    let taskInput = document.getElementById('addTaskInput').value;
    console.log(taskInput);

    if (taskInput == '') {
        document.getElementById('noTaskAddedWarning').style = 'display: inline';
        setTimeout(function(){
            document.getElementById('noTaskAddedWarning').style = 'display: none';
        }, 6000)
    } else {
        let task = '<li class="taskElement"><input type="checkbox" name="task1" id=""><span class="checkmark"></span><label for="task1">' + 
        taskInput + '</label></li>';
        console.log(task);

        let taskList = document.querySelector('#currentTask ul');
        taskList.innerHTML = task + taskList.innerHTML;
    }

    document.getElementById('addTaskInput').value = '';

    document.querySelectorAll('.taskElement').forEach(function(el){
        el.addEventListener('click', checkingTask);
    })
})
}

if (addTaskInput != null) {
        
        addTaskInput.addEventListener('keyup', function(e){

        if (e.keyCode === 13) { 
            document.getElementById('addTaskBtn').click();
        }
    })
}


//  Delete all completed task

function deleteCompletedTasks(){

    document.getElementById('warningDeleteCompleted').style = 'display: flex';

}

function cancelDeleteCompleted(){
    document.getElementById('warningDeleteCompleted').style = 'display: none';
}

function confirmDeleteCompleted(){
    document.getElementById('ulCompletedTask').innerHTML = '';
    document.getElementById('warningDeleteCompleted').style = 'display: none';
}

// Dark/Light theme text

function themeToggle(){

    var checkbox = document.getElementById('themeCheckbox');

    if (checkbox.checked === true) {
        document.getElementById('themeDark').style = 'display: inline-block'
        document.getElementById('themeLight').style = 'display: none'
    } else {
        document.getElementById('themeDark').style = 'display: none'
        document.getElementById('themeLight').style = 'display: inline-block'
    }
}