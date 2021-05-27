var taskArr = [];

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

// Login function

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

// Register Function

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

//Add new task

function addNewTaskFunc() {

        let taskInput = document.getElementById('addTaskInput').value
        let isTaskThere = 0

        taskArr.forEach(el =>{

            if (el.title === taskInput) { isTaskThere++ }
           
        })
    
        if (taskInput == '') {
            document.getElementById('noTaskAddedWarning').innerHTML = 'Warning: No task added below'

            document.getElementById('noTaskAddedWarning').style = 'display: flex'
            setTimeout(function(){
                document.getElementById('noTaskAddedWarning').style = 'display: none'
            }, 6000)
        } else if (isTaskThere > 0 ) {
            document.getElementById('noTaskAddedWarning').innerHTML = 'Caution: Task Title already exist'

            document.getElementById('noTaskAddedWarning').style = 'display: flex'
            setTimeout(function(){
                document.getElementById('noTaskAddedWarning').style = 'display: none'
            }, 6000)

        } else {

            let taskEl = {
                title: taskInput,
                status: 'Incomplete',
                deadline: document.getElementById('deadline').value,
                parentList: document.getElementById('addTaskList').value,
                description: document.getElementById('addTaskDescription').value
            }

            if (document.getElementById('addTaskList').value == '') {

                taskEl.parentList = 'General Tasks'
            
            }

            if (document.getElementById('addTaskDescription').value == '') {

                taskEl.description = 'No description'
            
            }

            if (document.getElementById('deadline').value == '') {

                taskEl.deadline = 'No deadline'
            
            }
            
            taskArr.push(taskEl)

            displayLast(taskArr)

            console.log(taskArr)
            
            document.getElementById('deadline').value = ''
            document.getElementById('addTaskInput').value = ''
            document.getElementById('addTaskList').value = ''
            document.getElementById('addTaskDescription').value = ''
        }
    
}

//Display last task added

function displayLast(taskArr){

    let itemTemplate = document.getElementById('taskElementTemplate')
    let itemClone = itemTemplate.content.cloneNode(true)

    let identifier = taskArr[taskArr.length - 1].title.replace(/\s+/g, '-') + 'listEl'

    itemClone.querySelector('li').id = identifier

    itemClone.querySelector('label').innerHTML = taskArr[taskArr.length - 1].title

    let taskList = document.querySelector('#currentTask ul')
    taskList.prepend(itemClone)

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
    console.log(this)
    let checkmark = this.querySelector('.checkmark');
    let taskText = this.parentNode.querySelector('label');

    checkmark.classList.toggle('checkmarkChecked');
    taskText.classList.toggle('checkedText');

    let completedList = document.querySelector('#completedTask ul');
    let taskList = document.querySelector('#currentTask ul');
    if (checkmark.classList.contains('checkmarkChecked')) {

        completedList.prepend(this.parentNode);
        let childLabel = this.childNodes;
        let textTask = childLabel[5].innerHTML
        let index = taskArr.findIndex(x => x.title == textTask);

       taskArr[index].status = 'Complete';

    } else {

        taskList.prepend(this.parentNode);
        let childLabel = this.childNodes;
        let textTask = childLabel[5].innerHTML

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

        
        if (JSON.parse(localStorage.getItem('taskArr')) != null) {
            
            taskArr = JSON.parse(localStorage.getItem('taskArr'))
        
        } else {

            taskArr = [];

        }

        if (taskArr != []) {

            taskArr.forEach(element => {

                if (element.status == 'Incomplete') {

                    let itemTemplate = document.getElementById('taskElementTemplate')
                    let itemClone = itemTemplate.content.cloneNode(true)

                    let identifier = element.title.replace(/\s+/g, '-') + 'listEl'

                    itemClone.querySelector('li').id = identifier

                    itemClone.querySelector('label').innerHTML = element.title

                    document.querySelector('#currentTask ul').prepend(itemClone)

                } else if (element.status == 'Complete') {
                    let itemTemplate = document.getElementById('taskElementTemplate')
                    let itemClone = itemTemplate.content.cloneNode(true)

                    let identifier = element.title.replace(/\s+/g, '-') + 'listEl'

                    itemClone.querySelector('li').id = identifier
                    itemClone.querySelector('span').classList.add('checkmarkChecked')
                    itemClone.querySelector('label').innerHTML = element.title
                    itemClone.querySelector('label').classList.add('checkedText')

                    document.querySelector('#completedTask ul').prepend(itemClone)
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
            document.getElementById('addTaskInput').value = ''
            document.getElementById('addTaskList').value = ''
            document.getElementById('addTaskDescription').value = ''
            document.getElementById('deadline').value = ''

        })

    })

}

var plusCircleMobile = document.getElementById("plusCircleIconMobile")

if (plusCircleMobile != null) {

    plusCircleMobile.addEventListener("click", function(e){
        e.preventDefault()

        document.getElementById('addTaskInputDiv').style = "display: flex"

        document.getElementById('addTaskInput').focus()

        document.querySelector('#addTaskBtn').addEventListener('click', addNewTaskFunc)

        document.getElementById('closeAddTask').addEventListener("click", function(x){

            document.getElementById('addTaskInputDiv').style = "display: none"
            document.getElementById('addTaskInput').value = ''
            document.getElementById('addTaskList').value = ''
            document.getElementById('addTaskDescription').value = ''
            document.getElementById('deadline').value = ''

        })

    })

}

// Show task details

function showTaskDetails() {

    let detailDiv = document.getElementById('taskDetailsDiv')
    let taskTitle = this.parentNode.parentNode.querySelector('label').innerHTML

    let index

    taskArr.forEach(el =>{

        if (el.title == taskTitle){
            index = taskArr.indexOf(el);

        }

    })

    let deadlineOutput

    if (document.getElementById(taskArr[index].title) == null) {

        let identifier = taskArr[index].title.replace(/\s+/g, '-')

        if (taskArr[index].deadline != 'No deadline') {
            deadlineOutput = new Date(taskArr[0].deadline)

            deadlineOutput.setDate(deadlineOutput.getDate() + 1)


            deadlineOutput = deadlineOutput.toDateString()
        } else {

            deadlineOutput = 'None'

        }

        let cardTemplate = document.getElementById('taskCardTemplate')
        let cardClone = cardTemplate.content.cloneNode(true)

        cardClone.childNodes[1].id = identifier

        cardClone.querySelector('#detailTitle').innerHTML = taskArr[index].title
        cardClone.querySelector('h3').innerHTML = 'Deadline:' + deadlineOutput
        cardClone.querySelector('h4').innerHTML = taskArr[index].parentList
        cardClone.querySelector('p').innerHTML = taskArr[index].description


        console.log(cardClone)

        
        detailDiv.prepend(cardClone)

        document.querySelectorAll('#closeTaskCard').forEach(function(el){
            el.addEventListener('click', closeDetailsCard);
        })

        document.querySelectorAll('#cardDelete').forEach(function(el){
            el.addEventListener('click', cardDeleteAcc);
        })

        document.querySelectorAll('#cardCompleted').forEach(function(el){
            el.addEventListener('click', cardCompleteAcc);
        })

        document.querySelectorAll('#editIcon').forEach(function(el){
            el.addEventListener('click', editTask);
        })

    }
}

// Edit task function

function editTask(){

    let parentDiv = this.parentNode.parentNode
    let taskCurrentTitle = parentDiv.id.replace(/-/g, ' ');
    let index

   taskArr.forEach(el =>{

       if (el.title == taskCurrentTitle){
           index = taskArr.indexOf(el);

       }

   })

   let editCardTemplate = document.getElementById('editCardTemplate')
   let editCardClone = editCardTemplate.content.cloneNode(true)

   editCardClone.querySelector('#changeTaskTitle').placeholder = taskArr[index].title
   editCardClone.querySelector('#changeTaskList').placeholder = taskArr[index].parentList
   editCardClone.querySelector('#changeTaskDesc').placeholder = taskArr[index].description

   console.log(this.parentNode.parentNode)

   parentDiv.innerHTML = ''
   parentDiv.prepend(editCardClone)

    document.querySelectorAll('#cardCancelChange').forEach(function(el){
        el.addEventListener('click', cancelChange);
    })

    document.querySelectorAll('#cardSaveChange').forEach(function(el){
        el.addEventListener('click', saveChange);
    })

    document.querySelectorAll('#closeTaskCard').forEach(function(el){
        el.addEventListener('click', closeDetailsCard);
    })
}

// Save Change

function saveChange(){

    let inputsDivs = this.parentNode.parentNode
    
    let newTaskTitle = inputsDivs.childNodes[5].value
    let newTaskList = inputsDivs.childNodes[13].value
    let newTaskDesc = inputsDivs.childNodes[17].value
    let newTaskDeadline = inputsDivs.childNodes[9].value

    let index

    taskArr.forEach(el =>{

       if (el.title == inputsDivs.id.replace('-',' ')){
           index = taskArr.indexOf(el);
       }

    })

    if (newTaskTitle != '') {
        taskArr[index].title = newTaskTitle
    }
    
    if (newTaskList != '') {
        taskArr[index].parentList = newTaskList
    }

    if (newTaskDesc != '') {
        taskArr[index].description = newTaskDesc
    }

    if (newTaskDeadline != '') {
        taskArr[index].deadline = newTaskDeadline
    }

    if (newTaskTitle != '') {
        document.getElementById(inputsDivs.id+'listEl').querySelector('label').innerHTML = newTaskTitle
        document.getElementById(inputsDivs.id+'listEl').id = newTaskTitle.replace(/\s+/g, '-')+'listEl'
    
       inputsDivs.id = newTaskTitle.replace(/\s+/g, '-')
    }

    let deadlineOutput

    if (taskArr[index].deadline != 'No deadline') {
        deadlineOutput = new Date(taskArr[0].deadline)

        deadlineOutput.setDate(deadlineOutput.getDate() + 1)


        deadlineOutput = deadlineOutput.toDateString()
    } else {

        deadlineOutput = taskArr[index].deadline

    }

    let cardTemplate = document.getElementById('taskCardTemplate')
    let cardClone = cardTemplate.content.cloneNode(true)

    cardClone.childNodes[1].id = taskArr[index].title.replace(/\s+/g, '-')

    cardClone.querySelector('#detailTitle').innerHTML = taskArr[index].title
    cardClone.querySelector('h3').innerHTML = 'Deadline:' + deadlineOutput
    cardClone.querySelector('h4').innerHTML = taskArr[index].parentList
    cardClone.querySelector('p').innerHTML = taskArr[index].description

    inputsDivs.innerHTML = cardClone.childNodes[1].innerHTML

    document.querySelectorAll('#closeTaskCard').forEach(function(el){
        el.addEventListener('click', closeDetailsCard);
    })

    document.querySelectorAll('#cardDelete').forEach(function(el){
        el.addEventListener('click', cardDeleteAcc);
    })

    document.querySelectorAll('#cardCompleted').forEach(function(el){
        el.addEventListener('click', cardCompleteAcc);
    })

    document.querySelectorAll('#editIcon').forEach(function(el){
        el.addEventListener('click', editTask);
    })
    
}

// Cancel change

function cancelChange(){

    let cardDiv = this.parentNode.parentNode
    let taskCurrentTitle = cardDiv.id.replace(/-/g,' ')

    let index

    taskArr.forEach(el =>{

        if (el.title == taskCurrentTitle){
            index = taskArr.indexOf(el);

        }

    })

        let deadlineOutput

        if (taskArr[index].deadline != 'No deadline') {
            deadlineOutput = new Date(taskArr[0].deadline)

            deadlineOutput.setDate(deadlineOutput.getDate() + 1)


            deadlineOutput = deadlineOutput.toDateString()
        } else {

            deadlineOutput = taskArr[index].deadline

        }

    let cardTemplate = document.getElementById('taskCardTemplate')
    let cardClone = cardTemplate.content.cloneNode(true)

    cardClone.childNodes[1].id = taskArr[index].title.replace(/\s+/g, '-')

    cardClone.querySelector('#detailTitle').innerHTML = taskArr[index].title
    cardClone.querySelector('h3').innerHTML = 'Deadline:' + deadlineOutput
    cardClone.querySelector('h4').innerHTML = taskArr[index].parentList
    cardClone.querySelector('p').innerHTML = taskArr[index].description

    cardDiv.innerHTML = cardClone.childNodes[1].innerHTML

    document.querySelectorAll('#closeTaskCard').forEach(function(el){
        el.addEventListener('click', closeDetailsCard);
    })

    document.querySelectorAll('#cardDelete').forEach(function(el){
        el.addEventListener('click', cardDeleteAcc);
    })

    document.querySelectorAll('#cardCompleted').forEach(function(el){
        el.addEventListener('click', cardCompleteAcc);
    })

    document.querySelectorAll('#editIcon').forEach(function(el){
        el.addEventListener('click', editTask);
    })

}

// Close task details card

function closeDetailsCard() {

    this.parentNode.remove()

}

// Card delete Button acction

function cardDeleteAcc() {

    var taskTitle = this.parentNode.parentNode.id
    console.log(taskTitle)

    document.getElementById(taskTitle).remove()
    console.log(taskTitle+'listEl')
    document.getElementById(taskTitle + 'listEl').remove()


    taskArr.forEach(function deleteTaskOfCard(element, index){

        if (element.title == taskTitle.replace(/-/g, ' ')) {
            console.log(element.title)
            taskArr.splice(index, 1);
            console.log(taskArr)
        }

    })

}

// Card Completed Button acction

function cardCompleteAcc() {

    var taskTitle = '#' + this.parentNode.parentNode.id + 'listEl' 

    document.querySelector(taskTitle).querySelector('.taskElement').click()

    
}