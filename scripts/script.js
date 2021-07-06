var todosArr = []

const priority = {
    LOW: 'low',
    MID: 'mid',
    HIGH: 'high'
}

var priorityArr = [priority.LOW, priority.MID, priority.HIGH]

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

const numberOfTasksToGenerate = 8;

function fetchToDos() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dueDate = new Date()
            dueDate.setDate(dueDate.getDate() + 3)

            for (let index = 0; index < numberOfTasksToGenerate; index++) {

                todosArr.push({
                    id: index + 1,
                    title: faker.commerce.productName(),
                    content: faker.commerce.productDescription(),
                    completed: faker.datatype.boolean(),
                    priority: priorityArr[Math.floor(Math.random() * priorityArr.length)],
                    dueDate: dueDate,
                    list: '',
                    location: {
                        latitude: -56.1887393,
                        longitude: -34.8921648
                },

                })
                
            }

            resolve()
        }, 400)
    })

}

function initialLoad() {
    fetchToDos().then(() =>{
        renderTodosArr()
    })
}

function renderTodosArr() {

    const taskCardContainer = document.getElementById("taskSection")
    const taskCardTemplates = document.getElementById("taskCardTemplate")

    taskCardContainer.innerHTML = ""

    if (todosArr.length > 0) {

        for (let todosIndex = 0; todosIndex < todosArr.length; todosIndex++) {

            const taskCardClone = taskCardTemplate.content.cloneNode(true)

            const taskCloneCardElement = taskCardClone.querySelector(".taskCard")
            const taskCloneImportanceIndicator = taskCardClone.querySelector(".importanceIndicator")
            const taskCloneTrashIcon = taskCardClone.querySelector(".trashCardIcon")
            const taskCloneTitle = taskCardClone.querySelector(".taskTitle")
            const taskCloneDesc = taskCardClone.querySelector(".taskDesc")
            const taskCloneActions = taskCardClone.querySelector("#taskHoverDiv")
            const taskCloneChangeStatus = taskCardClone.querySelector(".changeStatus")
            const taskCloneViewTodo = taskCardClone.querySelector(".viewTodo")

            taskCloneCardElement.addEventListener("mouseenter", () =>{
                taskCloneTrashIcon.classList.remove("d-none")
                taskCloneActions.classList.remove("d-none")
            })

            taskCloneCardElement.addEventListener("mouseleave", () =>{
                taskCloneTrashIcon.classList.add("d-none")
                taskCloneActions.classList.add("d-none")
            })

            taskCloneChangeStatus.addEventListener("click", () =>{
                todosArr[todosIndex].completed = !todosArr[todosIndex].completed
                renderTodosArr()
            })

            taskCloneViewTodo.addEventListener("click", () =>{
                showExpandedTodoCard(todosArr[todosIndex])
            })

            taskCloneTrashIcon.addEventListener("click", () =>{
                alert("Delete todo ID: " + todosIndex)
            })

            taskCloneImportanceIndicator.classList.add(
                getTodoImportance(todosArr[todosIndex].priority)
            )

            taskCloneTitle.innerText = todosArr[todosIndex].title

            taskCloneDesc.innerText = todosArr[todosIndex].content

            taskCardContainer.appendChild(taskCardClone)
        }



    }


}

//Get todo priority

function getTodoImportance(todoPriority) {
    switch (todoPriority) {
        case priority.HIGH:
            return 'high'
        case priority.MID:
            return 'mid'
        default:
            return 'low'
    }
}

// Show todo expanded card

function showExpandedTodoCard(object) {

    const mainContainer = document.querySelector(".mainContainer")
    const expandedTaskTemplate = document.getElementById("expandedTaskTemplate")

    const taskExpandClone = expandedTaskTemplate.content.cloneNode(true)

    mainContainer.innerHTML = ""

    const taskTitleTemplate = taskExpandClone.querySelector('#taskTitleExpanded')
    const taskListTemplate = taskExpandClone.querySelector('#taskList')
    const taskPriorityTemplate = taskExpandClone.querySelector('#taskPriority')
    const taskDeadlineTemplate = taskExpandClone.querySelector('#taskDeadline')
    const taskDescTemplate = taskExpandClone.querySelector('#taskDescriptionExpanded')

    taskTitleTemplate.innerText = object.title
    taskListTemplate.innerText = 'List: ' + object.list
    taskPriorityTemplate.innerText = 'Priority: ' + object.priority
    taskDeadlineTemplate.innerText = 'Deadline: ' + object.dueDate
    taskDescTemplate.innerText = object.content

    mainContainer.appendChild(taskExpandClone)
}

if (document.querySelector("#addTaskMain")) {

    let addTask
    let addTaskContainer = document.querySelector("#addTaskContainer")
    let closeTaskContainer = document.querySelector("#closeAddTask")
    let pickLocation = document.querySelector("#openMapBtn")
    let saveTask = document.querySelector("#saveTaskBtn")

    addTask = document.querySelector("#addTaskMain")
    
    addTask.addEventListener("click", () => {

        addTaskContainer.style.display = "flex"

        closeTaskContainer.addEventListener("click", () =>{
            addTaskContainer.style.display = "none"

            document.querySelector("#taskTitleInput").value = ""
            document.querySelector("#taskListInput").value = ""
            document.querySelector("#taskPriorityInput"). value = ""
            document.querySelector("#taskDeadlineInput").value = ""
            document.querySelector("#taskDescInput").value = ""

        })

        openMapBtn.addEventListener("click", () =>{

                console.log("Open map")

        })

        saveTaskBtn.addEventListener("click", () =>{

            console.log("Save Task")

        })

    })

}