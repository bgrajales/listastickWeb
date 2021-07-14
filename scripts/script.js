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

function showLoader() {
    document.querySelector('#initialLoadDiv').classList.remove('d-none')
    document.querySelector('#initialLoadDiv').classList.add('d-flex')
}

function hideLoader() {
    document.querySelector('#initialLoadDiv').classList.remove('d-flex')
    document.querySelector('#initialLoadDiv').classList.add('d-none')
}

const numberOfTasksToGenerate = 22;

class Storage {

    static storeTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    static getTodos() {
        todosArr = JSON.parse(localStorage.getItem('todos'))
    }

    static clearTodos() {

    }

}

class todoElement {
    constructor(index, shouldDisplay, title, content, completed, priority, dueDate, list) {

        this.index = index
        this.shouldDisplay = shouldDisplay
        this.title = title
        this.content = content
        this.completed = completed
        this.priority = priority
        this.dueDate = dueDate
        this.list = list

    }
}
function fetchToDos() {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (todosArr.length == 0) {
                    
                for (let index = 0; index < numberOfTasksToGenerate; index++) {

                    todosArr.push(new todoElement(index + 1, true, faker.commerce.productName(), 
                    faker.commerce.productDescription(), faker.datatype.boolean(), 
                    priorityArr[Math.floor(Math.random() * priorityArr.length)], new Date(faker.date.future()), 
                    "list"))
                    
                }

                resolve()
            } else {
                resolve()
            }

        }, 400)
    })

}

function initialLoad() {

    showLoader()

    Storage.getTodos()
    
    setTimeout(function() {
        hideLoader()
        fetchToDos().then(() =>{
            renderTodosArr()
        })
    }, 800)    

}

function renderTodosArr() {

    const taskCardContainer = document.getElementById("taskSection")
    const taskCardTemplates = document.getElementById("taskCardTemplate")

    taskCardContainer.innerHTML = ""

    if (todosArr.length > 0) {

        for (let todosIndex = 0; todosIndex < todosArr.length; todosIndex++) {
            if (todosArr[todosIndex].shouldDisplay) {
                    
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
                    todosArr.splice(todosIndex, 1)
                    renderTodosArr()
                })

                if (!todosArr[todosIndex].completed) {
                    taskCloneImportanceIndicator.classList.add(
                        getTodoImportance(todosArr[todosIndex].priority)
                    )
                } else {
                    taskCloneImportanceIndicator.classList.add("completedDot")
                }
                

                if (todosArr[todosIndex].completed) {
                    taskCloneTitle.classList.add("text-decoration-line-through")
                }
                taskCloneTitle.innerText = todosArr[todosIndex].title

                taskCloneDesc.innerText = todosArr[todosIndex].content

                taskCardContainer.appendChild(taskCardClone)
            }
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

// Search Filter

function applySearchFilter() {

    
    const searchInputElement = document.getElementById("searchInput")
    let keywords = searchInputElement.value

    keywords = keywords.trim()
    keywords = keywords.toLowerCase()


    console.log(keywords)

    if (!keywords) {

        todosArr.forEach(todo =>{
            todo.shouldDisplay = true
        })
        
    } else {

        todosArr.forEach(todo =>{
            todo.shouldDisplay = false
        })

        todosArr.filter(todo =>{

            const titleMatch = todo.title.toLowerCase().includes(keywords)
            const descriptionMatch = todo.content.toLowerCase().includes(keywords)

            return titleMatch || descriptionMatch

        }).forEach(todo =>{
            todo.shouldDisplay = true
        })

    }

    renderTodosArr()
}


// Show todo expanded card

function showExpandedTodoCard(object) {

    const bodyElement = document.querySelector("body")
    const expandedTaskTemplate = document.getElementById("expandedTaskTemplate")

    const taskExpandClone = expandedTaskTemplate.content.cloneNode(true)

    const taskTitleTemplate = taskExpandClone.querySelector('#taskTitleExpanded')
    const taskListTemplate = taskExpandClone.querySelector('#taskList')
    const taskPriorityTemplate = taskExpandClone.querySelector('#taskPriority')
    const taskDeadlineTemplate = taskExpandClone.querySelector('#taskDeadline')
    const taskDescTemplate = taskExpandClone.querySelector('#taskDescriptionExpanded')
    const taskExpandedClose = taskExpandClone.querySelector('#backIcon')
    const taskExpandedSave = taskExpandClone.querySelector('#saveChangesIcon')


    taskTitleTemplate.innerText = object.title
    if (object.list != "") {
        taskListTemplate.innerText = object.list[0].toUpperCase() + object.list.slice(1)
    } else {
        taskListTemplate.innerText = 'None'
    }
    dueDate = new Date(object.dueDate)

    taskPriorityTemplate.innerText = object.priority[0].toUpperCase() + object.priority.slice(1)
    taskDeadlineTemplate.innerText = dueDate.toDateString()
    taskDescTemplate.innerText = object.content

    taskExpandedClose.addEventListener("click", () => {

        document.querySelector("#backIcon").parentNode.parentNode.parentNode.remove()

    })

    taskExpandedSave.addEventListener("click", function saveChanges() {
        
            let newTitle = document.querySelector("#taskTitleExpanded").innerHTML
            let newList = document.querySelector("#taskList").innerHTML
            let newPriority = document.querySelector("#taskPriority").innerHTML
            let newDate = document.querySelector("#taskDeadline").innerHTML
            let newDesc = document.querySelector("#taskDescriptionExpanded").innerHTML

            object.title = newTitle

            renderTodosArr()
    })

    bodyElement.prepend(taskExpandClone)

}

if (document.querySelector("#addTaskMain")) {

    let addTask
    let addTaskContainer = document.querySelector("#addTaskContainer")
    let closeTaskContainer = document.querySelector("#closeAddTask")
    let saveTaskBtn = document.querySelector("#saveTaskBtn")

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

        saveTaskBtn.addEventListener("click", () =>{

            addNewTask()

        })

    })

}

function addNewTask() {

    let currentIndex

    if (todosArr.length == 0) {
        currentIndex = 1
    } else {
        currentIndex = todosArr[todosArr.length-1].index + 1
    }
    
    todosArr.push(new todoElement(currentIndex, true, document.getElementById('taskTitleInput').value, document.getElementById('taskDescInput').value, 
    false, document.getElementById('taskPriorityInput').value, document.getElementById('taskDeadlineInput').value.replace(/-/g, '\/'), document.getElementById('taskListInput').value))

    let addTaskContainer = document.querySelector("#addTaskContainer")

    addTaskContainer.style.display = "none"

    document.querySelector("#taskTitleInput").value = ""
    document.querySelector("#taskListInput").value = ""
    document.querySelector("#taskPriorityInput"). value = ""
    document.querySelector("#taskDeadlineInput").value = ""
    document.querySelector("#taskDescInput").value = ""

    renderTodosArr()
}

