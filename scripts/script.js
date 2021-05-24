var taskArr = [];

var taskEl = {
    title: '',
    status: '',
    parentList: '',
    description: ''
}

// Show arrow depending on which page you are on

var pageName = window.location.pathname

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

switch (pageName) {
    case '/listastickWeb/home.html':
        document.getElementById('mobileHome').classList.toggle('active');
        break;
    case '/listastickWeb/calendar.html':
        document.getElementById('mobileCalendar').classList.toggle('active');
        break;
    case '/listastickWeb/profile.html':
        document.getElementById('mobileArrowMobile').classList.toggle('active');
        break;
}

switch (pageName) {
    case '/home.html':
        document.getElementById('homeArrowMobile').classList.toggle('active');
        break;
    case '/calendar.html':
        document.getElementById('calendarArrowMobile').classList.toggle('active');
        break;
    case '/profile.html':
        document.getElementById('profileArrowMobile').classList.toggle('active');
        break;
}

switch (pageName) { // Borrar luego
    case '/home.html':
        document.getElementById('homeArrow').classList.toggle('arrowActive');
        break;
    case '/calendar.html':
        document.getElementById('calendarArrow').classList.toggle('arrowActive');
        break;
    case '/profile.html':
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

// Termina funcionamiento iterno de RegisterForm

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

//Add new task

function addNewTaskFunc() {

        let taskInput = document.getElementById('addTaskInput').value;
    
        if (taskInput == '') {
            document.getElementById('noTaskAddedWarning').style = 'display: flex';
            setTimeout(function(){
                document.getElementById('noTaskAddedWarning').style = 'display: none';
            }, 6000)
        } else {

            taskEl.title = taskInput
            taskEl.status = 'Incomplete'
            taskEl.parentList = document.getElementById('addTaskList').value
            taskEl.description = document.getElementById('addTaskDescription').value
            
            if (document.getElementById('addTaskList').value == '') {

                taskEl.parentList = 'General Tasks'
            
            }

            if (document.getElementById('addTaskDescription').value == '') {

                taskEl.description = 'No description'
            
            }

            console.log(taskEl)
            console.log(taskArr)
            
            taskArr.push(taskEl)

            console.log(taskEl)
            console.log(taskArr)

            displayLast(taskArr)

        }
    
        document.getElementById('addTaskInput').value = '';
        document.getElementById('addTaskList').value = '';
        document.getElementById('addTaskDescription').value = '';
}



//Display last task added

function displayLast(taskArr){
    let task = '<li id="' + taskArr[taskArr.length - 1].title + 'listEl"><div class="taskElement"><input type="checkbox" name="task1" id=""><span class="checkmark"></span><label for="task1">' +
        taskArr[taskArr.length - 1].title + '</label></div><div style="width: 10%;"><img id="taskDetails" src="icons/arrowRightBlack.png" alt=""></div></li>' 

    let taskList = document.querySelector('#currentTask ul');
    taskList.innerHTML = task + taskList.innerHTML;

    document.querySelectorAll('.taskElement').forEach(function(el){
        el.addEventListener('click', checkingTask);
    })

    document.querySelectorAll('#taskDetails').forEach(function(el){
        el.addEventListener('click', showTaskDetails);
    })

}

// Checking task as done

function checkingTask(e) {
    e.preventDefault();

    let checkmark = this.querySelector('.checkmark');
    let taskText = this.parentNode.querySelector('label');

    checkmark.classList.toggle('checkmarkChecked');
    taskText.classList.toggle('checkedText');

    let completedList = document.querySelector('#completedTask ul');
    let taskList = document.querySelector('#currentTask ul');
    if (checkmark.classList.contains('checkmarkChecked')) {
        completedList.prepend(this.parentNode);
        let childLabel = this.childNodes;
        let textTask = childLabel[2].innerHTML

        let index = taskArr.findIndex(x => x.title == textTask);

       taskArr[index].status = 'Complete';

    } else {
        taskList.prepend(this.parentNode);
        let childLabel = this.childNodes;
        let textTask = childLabel[2].innerHTML

        let index = taskArr.findIndex(x => x.title == textTask);

       taskArr[index].status = 'Incomplete';

    }
}

function findIndexTask(taskArr, taskTitle){

    taskArr.forEach(el =>{

        if (el.title === taskTitle){
            return taskArr.indexOf(el);
        }

    })
}

document.querySelectorAll('.taskElement').forEach(function(el){
    el.addEventListener('click', checkingTask);
})


var addTaskInput = document.getElementById('addTaskInput');

if (addTaskInput != null) {
        
        addTaskInput.addEventListener('keyup', function(e){

        if (e.keyCode === 13) { 
            document.getElementById('addTaskBtn').click();
        }
    })
}


// Delete all completed task

function deleteCompletedTasks(){

    document.getElementById('warningDeleteCompleted').style = 'display: flex';

}

function cancelDeleteCompleted(){
    document.getElementById('warningDeleteCompleted').style = 'display: none';
}

function confirmDeleteCompleted(){

    document.getElementById('ulCompletedTask').innerHTML = '';
    document.getElementById('warningDeleteCompleted').style = 'display: none';

    taskArr = taskArr.filter(function(element, index) {

        return element.status === 'Incomplete'

    })  

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

// Display task when home loads


if (window.location.pathname == '/home.html' || window.location.pathname == '/listastickWeb/home.html') {

    window.addEventListener('beforeunload', function(e) {

        localStorage.setItem('taskArr', JSON.stringify(taskArr))

    })

    window.onload = function(){

        taskArr = JSON.parse(localStorage.getItem('taskArr'))

        if (taskArr != null) {

            taskArr.forEach(element => {

                if (element.status == 'Incomplete') {
                    let task = '<li id="' + element.title + 'listEl"><div class="taskElement"><input type="checkbox" name="task1" id=""><span class="checkmark"></span><label for="task1">' +
                    element.title + '</label></div><div style="width: 10%;"><img id="taskDetails" src="icons/arrowRightBlack.png" alt=""></div></li>';
                
                    let taskList = document.querySelector('#currentTask ul');
                    taskList.innerHTML = task + taskList.innerHTML

                } else if (element.status == 'Complete') {
                    let task = '<li id="' + element.title + 'list El"><div class="taskElement"><input type="checkbox" name="task1" id=""><span class="checkmark checkmarkChecked"></span><label for="task1" class="checkedText">' +
                    element.title + '</label></div><div style="width: 10%;"><img id="taskDetails" src="icons/arrowRightBlack.png" alt=""></div></li>'

                    let taskList = document.querySelector('#completedTask ul');
                    taskList.innerHTML = task + taskList.innerHTML
                    
                }

            })

            document.querySelectorAll('.taskElement').forEach(function(el){
                el.addEventListener('click', checkingTask);
            })

            document.querySelectorAll('#taskDetails').forEach(function(el){
                el.addEventListener('click', showTaskDetails);
            })

        }

    }
}

// Display add task input popup

var plusCircle = document.getElementById("plusCircleIcon")

if (plusCircle != null) {

    plusCircle.addEventListener("click", function(e){
        e.preventDefault()

        document.getElementById('addTaskInputDiv').style = "display: flex"

        document.getElementById('addTaskInput').focus()

        document.querySelector('#addTaskBtn').addEventListener('click', addNewTaskFunc)

        document.getElementById('closeAddTask').addEventListener("click", function(x){

            document.getElementById('addTaskInputDiv').style = "display: none"
            document.getElementById('addTaskInput').value = '';
            document.getElementById('addTaskList').value = '';
            document.getElementById('addTaskDescription').value = '';

        })

    })

}

var plusCircleMobile = document.getElementById("plusCircleIconMobile")

if (plusCircleMobile != null) {

    plusCircleMobile.addEventListener("click", function(e){
        e.preventDefault()

        document.getElementById('addTaskInputDiv').style = "display: flex"

        document.getElementById('addTaskInput').focus()

        document.getElementById('closeAddTask').addEventListener("click", function(x){

            document.getElementById('addTaskInputDiv').style = "display: none"
            document.getElementById('addTaskInput').value = '';
            document.getElementById('addTaskList').value = '';
            document.getElementById('addTaskDescription').value = '';

        })

    })

}

// Show task details

function showTaskDetails() {

    let detailDiv = document.getElementById('taskDetailsDiv')
    let taskTitle = this.parentNode.parentNode.childNodes[0].childNodes[2].innerHTML

    let index

    taskArr.forEach(el =>{

        if (el.title === taskTitle){
            index = taskArr.indexOf(el);

        }

    })


    if (document.getElementById(taskArr[index].title) == null) {

        let innerTaskCard = '<div id="' + taskArr[index].title + '" class="taskCard"><img id="closeTaskCard" src="icons/closeIcon.png" alt=""><h1>' +
        taskArr[index].title + '</h1><h4>' + taskArr[index].parentList + '</h4><p>' + taskArr[index].description + 
        '</p><div id="cardBtn"><button id="cardDelete" type="button" class="btn btn-danger">Delete Task</button>' + 
        '<button id="cardCompleted" type="button" class="btn btn-primary">Mark as completed</button></div></div>'

        detailDiv.innerHTML += innerTaskCard

        document.querySelectorAll('#closeTaskCard').forEach(function(el){
            el.addEventListener('click', closeDetailsCard);
        })

        document.querySelectorAll('#cardDelete').forEach(function(el){
            el.addEventListener('click', cardDeleteAcc);
        })

        document.querySelectorAll('#cardCompleted').forEach(function(el){
            el.addEventListener('click', cardCompleteAcc);
        })

    }
}

// Close task details card

function closeDetailsCard() {

    this.parentNode.remove()

}

// Card delete Button acction

function cardDeleteAcc() {

    var taskTitle = this.parentNode.parentNode.id

    document.getElementById(taskTitle).remove()
    document.getElementById(taskTitle + 'listEl').remove()


    taskArr.forEach(function deleteTaskOfCard(element, index){

           if (element.title == taskTitle) {

            taskArr.splice(index, 1);

        }

    })

}

// Card Completed Button acction

function cardCompleteAcc() {

    var taskTitle = this.parentNode.parentNode.id

    document.getElementById(taskTitle + 'listEl').childNodes[0].click()

    
}