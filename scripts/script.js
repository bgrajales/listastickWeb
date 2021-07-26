var todosArr = []
var isLoggedIn = []
var userDataBase = []
var categoriesArr = ["General"]

var maxDisplayed

if (screen.width < 1240) {
    maxDisplayed = 8
} else {
    maxDisplayed = 8
}

const priority = {
    LOW: 'Low',
    MID: 'Medium',
    HIGH: 'High'
}

class Storage {

    static storeTodos(users, isLoggedIn) {

        if (isLoggedIn.length != 0) {
            const locIndex = document.getElementById("indexBody") 
            const locLogin = document.getElementById("bodyLoginRegister")

            const pos = userDataBase.map(function(e) { return e.email; }).indexOf(isLoggedIn[0].email);
        
            if ((locIndex == null) && (locLogin == null)) {
                userDataBase[pos].tasks = todosArr
                userDataBase[pos].listgroup = categoriesArr
            }
            
        }

        localStorage.setItem('users', JSON.stringify(users))
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
    }

    static getTodos() {

        userDataBase = JSON.parse(localStorage.getItem('users'))

        isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

        if (isLoggedIn == null) {
            isLoggedIn = []
        }

        if (userDataBase == null) {
            userDataBase = []
        }
        
        if (isLoggedIn.length == 1) {
            const pos = userDataBase.map(function(e) { return e.email; }).indexOf(isLoggedIn[0].email)
            todosArr = userDataBase[pos].tasks

            if (userDataBase[pos].listgroup.length == 0) {
                categoriesArr = ["General"]
            } else {
                categoriesArr = userDataBase[pos].listgroup
            }
        }

        if (todosArr == null) {
            todosArr = []
        }

    }

}

class todoElement {
    constructor(index, shouldDisplay, title, content, completed, priority, dueDate, list, subtask) {

        this.index = index
        this.shouldDisplay = shouldDisplay
        this.title = title
        this.content = content
        this.completed = completed
        this.priority = priority
        this.dueDate = dueDate
        this.list = list
        this.subtask = subtask

    }
}

class user {
    constructor(email, fullName, password, pfp, theme, tasks, listgroup) {
        this.email = email
        this.fullName = fullName
        this.password = password
        this.pfp = pfp
        this.theme = theme
        this.tasks = tasks
        this.listgroup = listgroup
    }
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
        
        const user = userDataBase.filter(user => user.email === mail) 

        if ((user.length != 0) && password === user[0].password) {
            isLoggedIn = user
            Storage.storeTodos(userDataBase, isLoggedIn)
            window.location.href = "home.html"
        } else if (user.length != 0) {
            loginErrorMsg.style.display = "block";
            if (storedLeng == "spanish") {
                loginErrorMsg.innerHTML = "Error: Contraseña incorrecta" 
            } else if (storedLeng == "english") {
                loginErrorMsg.innerHTML = "Error: Wrong password"
            }
        } else {
            loginErrorMsg.style.display = "block";
            if (storedLeng == "spanish") {
                loginErrorMsg.innerHTML = "Error: Usuario no existe" 
            } else if (storedLeng == "english") {
                loginErrorMsg.innerHTML = "Error: User does not exist" 
            }
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

        let errorEmails, errorFullname, errorPasword, errorRepeatPassword

        if (!checkEmailValidity(email)) {
            document.getElementById("email").style = "box-shadow: rgb(181 49 49) 0px 0px 0px 2px !important;"
            errorCount++
            errorEmails = true
        } else {
            document.getElementById("email").style = "box-shadow: none"
        }

        if (!checkFullName(fullName)) {
            document.getElementById("fullName").style = "box-shadow: rgb(181 49 49) 0px 0px 0px 2px !important;"
            errorCount++
            errorFullname = true
        } else {
            document.getElementById("fullName").style = "box-shadow: none"
        }

        if (!checkPassword(password)) {
            document.getElementById("password").style = "box-shadow: rgb(181 49 49) 0px 0px 0px 2px !important;"
            errorCount++;
            errorPasword = true
        } else {
            document.getElementById("password").style = "box-shadow: none"
        }

        if (password != repeatPassword || repeatPassword == "") {
            document.getElementById("repeatPassword").style = "box-shadow: rgb(181 49 49) 0px 0px 0px 2px !important;"
            errorCount++
            errorRepeatPassword = true
        } else {
            document.getElementById("repeatPassword").style = "box-shadow: none"
        }
        
        if (errorCount === 0) {
            userDataBase.push(new user(email, fullName, password, "images/pfp.png", "default", [], []));
            isLoggedIn= userDataBase.filter(user => user.email === email)
            Storage.storeTodos(userDataBase, isLoggedIn)
            window.location.href = "home.html"
        } else {
            registerErrorMsg.style.display = "block";
            if (storedLeng == "english") {
                registerErrorMsg.innerHTML = "Check marked input fields for errors"
            } else if (storedLeng == "spanish") {
                registerErrorMsg.innerText = "Revise los campos marcados por errores"
            }

            let message = ""

            if (errorEmails) {
                if (storedLeng == "spanish") {
                    message = message + "<li>Email Invalido</li>"
                } else {
                    message = message + "<li>Invalid Email</li>"
                }
            }

            if (errorFullname) {
                if (storedLeng == "spanish") {
                    message = message + "<li>Nombre Completo Invalido</li>"
                } else {
                    message = message + "<li>Invalid Full Name</li>"
                }
            }

            if (errorPasword) {
                if (storedLeng == "spanish") {
                    message = message + "<li>Contraseña demasiado corta</li>"
                } else {
                    message = message + "<li>Password too short</li>"
                }
            }

            if (errorRepeatPassword) {
                if (storedLeng == "spanish") {
                    message = message + "<li>Contraseñas no coinciden</li>"
                } else {
                    message = message + "<li>Passwords don't match</li>"
                }
            }

            Swal.fire({
                toast: true,
                title: "Please check the following:",
                html: '<ul>'+message+'</ul>',
            })
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

        const exist = userDataBase.filter(user => user.email == email)

        if (exist.length == 0) {
            return (true);
        } else { 
            return (false)
        }

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
    document.getElementById("taskSection").innerHTML = ""
    document.querySelector('#initialLoadDiv').classList.remove('d-none')
    document.querySelector('#initialLoadDiv').classList.add('d-flex')

}

function hideLoader() {
    document.querySelector('#initialLoadDiv').classList.remove('d-flex')
    document.querySelector('#initialLoadDiv').classList.add('d-none')
}

const numberOfTasksToGenerate = 0

function fetchToDos() {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (todosArr.length == 0) {
                    
                for (let index = 0; index < numberOfTasksToGenerate; index++) {

                    todosArr.unshift(new todoElement(index + 1, false, faker.commerce.productName(), 
                    faker.commerce.productDescription(), faker.datatype.boolean(), 
                    priorityArr[Math.floor(Math.random() * priorityArr.length)], faker.date.between('2021-07-24', '2021-12-31'), 
                    "list", [{title: "task1", status: false}, {title: "task2", status: true}]))
                    
                }

                if (todosArr.length >= 6 ) {
                    for (let display = 0; display < maxDisplayed; display++) {
                        todosArr[display].shouldDisplay = true;
                    }
                }
                
                resolve()
            } else {
                Storage.getTodos()

                if (todosArr != []) {
                    if (todosArr.length <= maxDisplayed) {
                        todosArr.forEach(todo => {
                            todo.shouldDisplay = true;
                        })
                    } else {
                        for (let q = 0; q < maxDisplayed; q++){
                            todosArr[q].shouldDisplay = true
                        }

                        for (let p = maxDisplayed; p < todosArr.length; p++) {
                            todosArr[p].shouldDisplay = false
                        }
                    }
                    
                }
                resolve()
            }

        }, 400)
    })

}

function initialLoad() {

    Storage.getTodos()

    if (isLoggedIn.length == 0 && (document.querySelector("#homeBody") != null || document.querySelector("#statsBody") != null)) {
        window.location.href = "index.html"
    }

    if (document.getElementById("homeBody") != null) {
        showLoader()

        setTimeout(function() {
            hideLoader()

            fetchToDos().then(() =>{
                todosArr.sort(function(a,b){
                    return b.index - a.index;
                })
                
                renderTodosArr()
                
                if (isLoggedIn[0].theme == "dark") {
                    document.querySelectorAll(".trashCardIcon").forEach(element => element.src = "icons/trashIconWhite.svg")
                }

                if (todosArr.length > maxDisplayed) {

                    document.getElementById("pagesNavigation").classList.remove("d-none")

                }
            })
        }, 800)

        
    }

    if (document.getElementById("statsBody") != null) {
        statsPageSetup()
    }

    if (isLoggedIn[0].pfp == "images/pfp.png") {
        document.querySelector("#pfp").setAttribute("src", "images/pfp.png")
        document.querySelector("#photo").setAttribute("src", "images/pfp.png")
    } else {
        document.querySelector("#pfp").setAttribute("src", isLoggedIn[0].pfp)
        document.querySelector("#photo").setAttribute("src", isLoggedIn[0].pfp)
    }

    if (isLoggedIn[0].theme == "dark") {
        document.querySelector("#darkCheck").click()

        document.documentElement.setAttribute("data-theme", "dark")
        
    }

    if (document.getElementById("homeBody") != null) {
        document.getElementById("dropdownMenuButton1").innerText = "Todos"
    }

}

function renderTodosArr() {

    Storage.storeTodos(userDataBase, isLoggedIn)
    Storage.getTodos()

    const taskCardContainer = document.getElementById("taskSection")
    const taskCardTemplates = document.getElementById("taskCardTemplate")

    if (todosArr.length > 0 && document.getElementById("homeBody") != null) {

        taskCardContainer.innerHTML = ""

        for (let todosIndex = 0; todosIndex < todosArr.length; todosIndex++) {

            if (todosArr[todosIndex].shouldDisplay) {
                    
                const taskCardClone = taskCardTemplates.content.cloneNode(true)

                const taskCloneCardElement = taskCardClone.querySelector(".taskCard")
                const taskCloneImportanceIndicator = taskCardClone.querySelector(".importanceIndicator")
                const taskCloneTrashIcon = taskCardClone.querySelector(".trashCardIcon")
                const taskCloneTitle = taskCardClone.querySelector(".taskTitle")
                const taskCloneDesc = taskCardClone.querySelector(".taskDesc")
                const taskCloneActions = taskCardClone.querySelector("#taskHoverDiv")
                const taskCloneChangeStatus = taskCardClone.querySelector(".changeStatus")
                const taskCloneViewTodo = taskCardClone.querySelector(".viewTodo")
                const taskCloneDateData = taskCardClone.querySelector("h2")
                const taskCloneYearData = taskCardClone.querySelector("h3")

                let totalDate = new Date(todosArr[todosIndex].dueDate)

                var month = totalDate.getUTCMonth() + 1; //months from 1-12
                var day = totalDate.getUTCDate();
                var year = totalDate.getUTCFullYear();

                taskCloneDateData.innerText = day + '/' + month
                taskCloneYearData.innerText = year

                if (isLoggedIn[0].theme == "dark") {
                    taskCloneTrashIcon.setAttribute("src", "icons/trashIconWhite.svg")
                }
                
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
                    showExpandedTodoCard(todosArr[todosIndex], todosIndex)
                })

                taskCloneTrashIcon.addEventListener("click", () =>{
                    Swal.fire({
                        template: '#aboutToDeleteTask'
                    }).then(result => {
                        if (result.isConfirmed) {
                            for (let index = todosIndex; index < todosArr.length; index++) {
                            
                                if (todosArr[index].shouldDisplay == false && todosArr[index-1].shouldDisplay == true) {
                                    todosArr[index].shouldDisplay = true
                                    break;
                                }
                                
                            }

                            todosArr.splice(todosIndex, 1)
                            
                            renderTodosArr()
                        }
                    })
                    
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
    } else if (document.getElementById("homeBody") != null && todosArr.length == 0) {
        taskCardContainer.innerHTML = "<h1 style='text-align: center;'>No task added yet</h1>"
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

    let today = new Date()
    today.setHours(0,0,0,0)

    const searchInputElement = document.getElementById("searchInput")
    let keywords = searchInputElement.value

    keywords = keywords.trim()
    keywords = keywords.toLowerCase()

    let currentTab
    currentTab = document.querySelector(".activeSelBtn").innerText

    if (keywords == "") {

        switch (currentTab) {

            case "To-Dos":
                todosArr.forEach(todo =>{
                    todo.shouldDisplay = false
                })

                for (let display = 0; display < maxDisplayed; display++) {
                    todosArr[display].shouldDisplay = true;
                }

                renderTodosArr()
                break;
            case "My Day" || "Mi día":
                todosArr.forEach(todo =>{
                    todo.shouldDisplay = true
                })
                filterMyDay()
                break;

        }         
    
    } else {

        switch (currentTab) {

            case "To-Dos":
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
                break;
            case "My Day" || "Mi día":
                todosArr.forEach(todo =>{
                    todo.shouldDisplay = false
                })

                todosArr.filter(todo =>{
        
                    const todoDate = new Date(todo.dueDate)
                    const titleMatch = todo.title.toLowerCase().includes(keywords)
                    const descriptionMatch = todo.content.toLowerCase().includes(keywords)
        
                    return (titleMatch || descriptionMatch) && (today.getYear() == todoDate.getYear() && today.getMonth() == todoDate.getMonth() && today.getDay() == todoDate.getDay())
        
                }).forEach(todo =>{
                    todo.shouldDisplay = true
                })

                break;

        }         
       

    }

    renderTodosArr()
}

// Show todo expanded card

function showExpandedTodoCard(object, todosIndex) {

    const taskSec = document.querySelector(".expandedTodoCardDivNew")

    taskSec.innerHTML = ""

    taskSec.classList.remove("d-none")

    const expandedTaskTemplate = document.getElementById("expandedTaskTemplate")

    const taskExpandClone = expandedTaskTemplate.content.cloneNode(true)

    const closeExpandedTaskTemplate = taskExpandClone.querySelector("#backIcon")
    const taskDayNMonth = taskExpandClone.querySelector("h2")
    const taskYear = taskExpandClone.querySelector("h3")
    const taskPriorShow = taskExpandClone.querySelector(".importanceIndicatorExpanded")

    const addSubTaskInput = taskExpandClone.querySelector("#newSubTaskInput")
    const addSubTaskBtn = taskExpandClone.querySelector("#newSubTaskBtn")

    const taskSubTaskDiv = taskExpandClone.querySelector("#subTaskEach")
    const taskTitleTemplate = taskExpandClone.querySelector('#taskTitleExpanded')
    const taskListTemplate = taskExpandClone.querySelector('#taskList')

    const taskPriorityTemplate = taskExpandClone.querySelector('#taskPriority')
    const taskDescTemplate = taskExpandClone.querySelector('#taskDescriptionExpanded')

    const markAsCompleted = taskExpandClone.querySelector("#markAsCompleted")
    const deleteTaskExpanded = taskExpandClone.querySelector("#deleteTaskBtn")

    taskTitleTemplate.innerText = object.title
    taskListTemplate.innerText = object.list

    let totalDate = new Date(object.dueDate)

    var month = totalDate.getUTCMonth() + 1;
    var day = totalDate.getUTCDate();
    var year = totalDate.getUTCFullYear();

    taskDayNMonth.innerText = day + '/' + month
    taskYear.innerText = year

    if (object.priority == "Medium") {
        taskPriorShow.classList.add("mid")
    } else if (object.completed == true){
        taskPriorShow.classList.add("completedDot")
    } else {
        taskPriorShow.classList.add(object.priority.toLowerCase())
    }

    taskPriorShow.classList.add(object.priority.toLowerCase())
    taskPriorityTemplate.innerText = object.priority[0].toUpperCase() + object.priority.slice(1)
    taskDescTemplate.innerText = object.content

    object.subtask.forEach(element => {
        if (element.status) {
            taskSubTaskDiv.innerHTML += '<div class="subTaskandTrash"><div class="form-check" onclick="checkSubTask(this)" style="flex: 1;"><input class="form-check-input" type="checkbox" value="" id="'+ todosIndex + '-' + element.title.trim() +'" checked><label class="form-check-label" for="'+ todosIndex + '-' + element.title.trim() +'">' + 
            element.title + '</label></div><img class="trashSubTask" src="icons/trashIcon.svg" onclick="deleteSubTask(this)"></div>'

        } else {
            taskSubTaskDiv.innerHTML += '<div class="subTaskandTrash"><div class="form-check" onclick="checkSubTask(this)" style="flex: 1;"><input class="form-check-input" type="checkbox" value="" id="'+ todosIndex + '-' + element.title.trim() +'"><label class="form-check-label" for="'+ todosIndex + '-' + element.title.trim() +'">' + 
            element.title + '</label></div><img class="trashSubTask" src="icons/trashIcon.svg" onclick="deleteSubTask(this)"></div>'
        }
    })

    closeExpandedTaskTemplate.addEventListener("click", function(){
        closeExpandedTaskTemplate.parentNode.parentNode.parentNode.classList.add("d-none")
    })

    markAsCompleted.addEventListener("click", function(){
        todosArr.forEach(element =>{
            if (element.index == object.index) {
                element.completed = !element.completed

                taskPriorShow.className = "importanceIndicatorExpanded"

                if (element.priority == "Medium") {
                    taskPriorShow.classList.add("mid")
                } else if (element.completed == true){
                    taskPriorShow.classList.add("completedDot")
                } else {
                    taskPriorShow.classList.add(element.priority.toLowerCase())
                }
            }
        })
        
        renderTodosArr()
    })

    deleteTaskExpanded.addEventListener("click", function(){
        Swal.fire({
            template: '#aboutToDeleteTask'
        }).then(result => {
            if (result.isConfirmed) {
                for (let index = todosIndex; index < todosArr.length; index++) {
                
                    if (todosArr[index].shouldDisplay == false && todosArr[index-1].shouldDisplay == true) {
                        todosArr[index].shouldDisplay = true
                        break;
                    }
                    
                }

                todosArr.splice(todosIndex, 1)
                closeExpandedTaskTemplate.click()
                renderTodosArr()
            }
        })
    })

    addSubTaskBtn.addEventListener("click", function(){
        if (addSubTaskInput.value != "") {
            todosArr[todosIndex].subtask.push({title: addSubTaskInput.value, status: false})
            closeExpandedTaskTemplate.click()
            showExpandedTodoCard(todosArr[todosIndex], todosIndex)
        }
    })

    if (storedLeng == "spanish") {
        taskExpandClone.querySelector(".categorylabel").innerText = "Categoria:"
        taskExpandClone.querySelector(".prioritylabel").innerText = "Prioridad:"
        taskExpandClone.querySelector(".subtasklabel").innerText = "Sub tareas:"

        markAsCompleted.innerText = "Marcar completado"
        deleteTaskExpanded.innerText = "Borrar Tarea"
    }

    taskSec.prepend(taskExpandClone)

}

function checkSubTask(e) {
    
    const parentTaskIndexCompound = e.querySelector("input").id
    const subTaskTitle = e.querySelector("label").innerText

    let parentTaskIndex = parentTaskIndexCompound.split("-")[0]

    todosArr[parentTaskIndex].subtask.forEach(element => {
        if (element.title == subTaskTitle) {
            element.status = !element.status
        }
    })

    document.querySelector("#backIcon").click()
    showExpandedTodoCard(todosArr[parentTaskIndex], parentTaskIndex)

}

function deleteSubTask(e) { 
    const taskIdandSubtask = e.parentNode.querySelector("input").id.split("-")

    Swal.fire({
        title: 'Delete ' + taskIdandSubtask[1] + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#2E4052',
        confirmButtonText: 'Yes, delete'
    }).then((result) => {
        if (result.isConfirmed) {
          todosArr[taskIdandSubtask[0]].subtask.forEach(function(item, index, object) {
              if (item.title == taskIdandSubtask[1]) {
                  object.splice(index, 1)
              }
          })
          document.querySelector("#backIcon").click()
          showExpandedTodoCard(todosArr[taskIdandSubtask[0]], taskIdandSubtask[0])
        }
    })

    console.log(taskIdandSubtask)
}

if (document.querySelector("#addTaskMain")) {

    let addTask = document.querySelector("#addTaskMain")
    let addTaskContainer = document.querySelector("#addTaskContainer")
    let closeTaskContainer = document.querySelector("#closeAddTask")
    let userLists = document.querySelector("#taskListInput")

    addTask.addEventListener("click", () => {

        if (screen.width < 600) {
            addTaskContainer.classList.remove("d-none")
            addTaskContainer.classList.remove("animate__slideOutDown")
            addTaskContainer.classList.add("animate__slideInUp")
        
            closeTaskContainer.addEventListener("click", () =>{
                addTaskContainer.classList.remove("animate__slideInUp")
                addTaskContainer.classList.add("animate__slideOutDown")

            setTimeout(function(){ addTaskContainer.classList.add("d-none"); }, 300);

                document.querySelector("#taskTitleInput").value = ""
                document.querySelector("#taskDeadlineInput").value = ""
                document.querySelector("#taskDescInput").value = ""
            })
        } else {
            addTaskContainer.classList.remove("d-none")
            addTaskContainer.classList.remove("animate__slideOutLeft")
            addTaskContainer.classList.add("animate__slideInLeft")

            closeTaskContainer.addEventListener("click", () =>{

                addTaskContainer.classList.remove("animate__slideInLeft")
                addTaskContainer.classList.add("animate__slideOutLeft")
    
                setTimeout(function(){ addTaskContainer.classList.add("d-none"); }, 300);
    
    
                document.querySelector("#taskTitleInput").value = ""
                document.querySelector("#taskDeadlineInput").value = ""
                document.querySelector("#taskDescInput").value = ""
    
            })
        }

        userLists.innerHTML = ""
        
        for (let listIndex = 0; listIndex < categoriesArr.length; listIndex++) {
            let elem = '<option value="' + listIndex + '">' + categoriesArr[listIndex] + '</option>'
            userLists.innerHTML = userLists.innerHTML + elem;
        }

    })

}

function addNewTask() {

    if ( document.getElementById('taskTitleInput').value !== "" ) {
            
        let currentIndex

        if (todosArr.length == 0) {
            currentIndex = 1
        } else {
            currentIndex = todosArr.length + 1
        }
        
        let deadlineInput = document.getElementById('taskDeadlineInput').value.replace(/-/g, '\/')

        if (deadlineInput == "") {
            deadlineInput = "No deadline"
        }
        todosArr.unshift(new todoElement(currentIndex, 
            false, 
            document.getElementById('taskTitleInput').value, 
            document.getElementById('taskDescInput').value, 
            false, 
            document.querySelector("#taskPriorityInput").selectedOptions[0].label, 
            deadlineInput, 
            document.querySelector("#taskListInput").selectedOptions[0].label,
            [{title: "Task1", status: false}, {title: "Task2", status: true}]))

        let addTaskContainer = document.querySelector("#addTaskContainer")

        addTaskContainer.classList.add("d-none")

        document.querySelector("#taskTitleInput").value = ""
        document.querySelector("#taskDeadlineInput").value = ""
        document.querySelector("#taskDescInput").value = ""

        todosArr.forEach(element => {element.shouldDisplay = false;})
            
        for (let display = 0; display < maxDisplayed; display++) {
            todosArr[display].shouldDisplay = true;
        }
            
        renderTodosArr()
    }
}

function filterMyDay() {

    document.querySelector("#pagesNavigation").classList.add("d-none")

    Storage.storeTodos(userDataBase, isLoggedIn)
    Storage.getTodos()

    let today = new Date()
    let numberOfTask = 0
    let taskDate

    today.setHours(0,0,0,0)

    todosArr.forEach(todo =>{

        taskDate = new Date(todo.dueDate)

        taskDate.setHours(0,0,0,0)

        if (today.getYear() == taskDate.getYear() && today.getMonth() == taskDate.getMonth() && today.getDay() == taskDate.getDay()) {

            todo.shouldDisplay = true
            numberOfTask += 1

        } else {

            todo.shouldDisplay = false

        }


    })

    document.querySelector(".activeSelBtn").classList.remove("activeSelBtn")
    document.querySelector("#myDayBtn").classList.add("activeSelBtn")

    renderTodosArr()

    if (numberOfTask == 0) {

        document.getElementById("taskSection").innerHTML = "<h1 id='noTaskText'>No task for today :)</h1>"
        
    }

    document.getElementById("dropdownMenuButton1").innerText = "My Day"

}

function changeActiveSel(){
    document.querySelector(".activeSelBtn").classList.remove("activeSelBtn")
    document.querySelector("#generalTodosBtn").classList.add("activeSelBtn")
}

function toggleExpandedProfile() {

    if (storedLeng == "spanish") {
        document.querySelector("#spanishCheck").click()
    } else {
        document.querySelector("#englishCheck").click()
    }
    
    if (screen.width < 600) {
        document.getElementById("profileExpandedCard").classList.remove("d-none")
        document.getElementById("profileExpandedCard").classList.remove("animate__slideOutDown")
        document.getElementById("profileExpandedCard").classList.add("animate__slideInUp")

        const backIcon = document.querySelector(".backIconPfp")
    
        backIcon.addEventListener("click", () =>{
            document.getElementById("profileExpandedCard").classList.remove("animate__slideInUp")
            document.getElementById("profileExpandedCard").classList.add("animate__slideOutDown")

            setTimeout(function(){ document.getElementById("profileExpandedCard").classList.add("d-none"); }, 300);
        })

        const logOut = document.querySelector("#logoutBtn")

        document.getElementById("userName").innerText = isLoggedIn[0].fullName
        document.getElementById("userEmail").innerText = isLoggedIn[0].email
    
        logOut.addEventListener("click", function(){
            const pos = userDataBase.map(function(e) { return e.email; }).indexOf(isLoggedIn[0].email);
        
            userDataBase[pos].tasks = todosArr
        
            localStorage.setItem('users', JSON.stringify(userDataBase))
        
            isLoggedIn = []
        
            localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))

            window.location.href = "index.html"
        })

        changePfp()
    
        themeSelection()

        lenguageSelection()
    } else {
        document.getElementById("profileExpandedCard").classList.remove("d-none")
        document.getElementById("profileExpandedCard").classList.remove("animate__slideOutLeft")
        document.getElementById("profileExpandedCard").classList.add("animate__slideInLeft")

        const backIcon = document.querySelector(".backIconPfp")
        const logOut = document.querySelector("#logoutBtn")
    
        document.getElementById("userName").innerText = isLoggedIn[0].fullName
        document.getElementById("userEmail").innerText = isLoggedIn[0].email
    
    
        backIcon.addEventListener("click", () =>{
            document.getElementById("profileExpandedCard").classList.remove("animate__slideInLeft")
            document.getElementById("profileExpandedCard").classList.add("animate__slideOutLeft")

            setTimeout(function(){ document.getElementById("profileExpandedCard").classList.add("d-none"); }, 300);

        })
    
        logOut.addEventListener("click", function(){
            const pos = userDataBase.map(function(e) { return e.email; }).indexOf(isLoggedIn[0].email);
        
            userDataBase[pos].tasks = todosArr
        
            localStorage.setItem('users', JSON.stringify(userDataBase))
        
            isLoggedIn = []
        
            localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))

            window.location.href = "index.html"
        })

        changePfp()
    
        themeSelection()
    
        lenguageSelection()
    }

}

function checkLogIn() {

   Storage.getTodos()

   if (isLoggedIn.length != 0) {
        window.location.href = "home.html"
   }

}

function changePfp() {

    const imgDiv = document.querySelector(".profilePicDiv")
    const img = document.querySelector("#photo")
    const file = document.querySelector("#file")
    const uploadBtn = document.querySelector("#uploadBtn")

    imgDiv.addEventListener("mouseenter", function() {
        uploadBtn.style.display = "block"
    })

    imgDiv.addEventListener("mouseleave", function() {
        uploadBtn.style.display = "none"
    })

    file.addEventListener("change", function() {
        const choosedFile = this.files[0];

        if (choosedFile) {
            const reader = new FileReader();

            reader.addEventListener("load", function() {
                img.setAttribute("src", reader.result)
                document.querySelector("#pfp").setAttribute("src", reader.result)
                isLoggedIn[0].pfp = reader.result

                userDataBase.forEach(user => {
                    if (user.email == isLoggedIn[0].email) {
                        user.pfp = reader.result
                    }
                })
            })
            
            reader.readAsDataURL(choosedFile)

        }
    })
}

function themeSelection() {

    const lightBtn = document.querySelector("#lightCheck")
    const darkBtn = document.querySelector("#darkCheck")

    lightBtn.addEventListener("click", (event) => {
        document.documentElement.setAttribute("data-theme", "default")
        document.querySelectorAll(".trashCardIcon").forEach(element => {element.src = "icons/trashIcon.svg"})

        userDataBase.forEach(user => {
            if (user.email == isLoggedIn[0].email) {
                user.theme = "default"
                isLoggedIn[0].theme = "default"
             }
        })
    })

    darkBtn.addEventListener("click", (event) => {
        document.documentElement.setAttribute("data-theme", "dark")
        document.querySelectorAll(".trashCardIcon").forEach(element => {element.src = "icons/trashIconWhite.svg"})

        userDataBase.forEach(user => {
            if (user.email == isLoggedIn[0].email) {
                user.theme = "dark"
                isLoggedIn[0].theme = "dark"
            }
        })
    })

}

function lenguageSelection() {

    const spanishBtn = document.querySelector("#spanishCheck")
    const englishBtn = document.querySelector("#englishCheck")

    spanishBtn.addEventListener("click", () => {
        
        localStorage.setItem('lenguage', JSON.stringify("spanish"))

        location.reload()
    })

    englishBtn.addEventListener("click", () => {

        localStorage.setItem('lenguage', JSON.stringify("english"))

        location.reload()
    })
}


if (document.querySelector("#hambLanding") != null) {

    document.querySelector("#hambLanding").addEventListener("click", function(){
        document.querySelector("#hambDisplay").style.display = "flex"
        document.querySelector("#closeHambMenu").style.display = "block"

        document.querySelector("#closeHambMenu").addEventListener("click", function() {
            document.querySelector("#hambDisplay").style.display = "none"
            document.querySelector("#closeHambMenu").style.display = "none"
        })
    })


}

function statsPageSetup() {
    
    var ctx1 = document.getElementById('taskCompletedChart').getContext('2d');

    let completed = todosArr.filter(task => task.completed == true).length
    let pending = todosArr.length - completed

    var myChart1 = new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: ['Pending Tasks', 'Completed'],
        datasets: [{
            label: '# Tasks',
            data: [pending, completed],
            backgroundColor: [
                'rgba(0, 0, 0, 1)',
                'rgba(54, 162, 235, 1)',
            ],
        }]
        },
        options: {
          responsive: false,
          borderColor: 'rgba(54, 162, 235, 0)',
        },
    });

    var ctx2 = document.getElementById('taskPriorityChart').getContext('2d');
    
    let high = todosArr.filter(task => task.priority == "High").length
    let mid = todosArr.filter(task => task.priority == "Medium").length
    let low = todosArr.length - high - mid

    var myChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['High', 'Medium', 'Low'],
        datasets: [{
            label: '# Tasks',
            data: [high, mid, low],
            backgroundColor: [
                'rgba(176, 0, 0, 1)',
                'rgba(255, 200, 0, 1)',
                'rgba(52, 207, 90, 1)',
            ],
        }]
        },
        options: {
          responsive: false,
          borderColor: 'rgba(54, 162, 235, 0)',
        },
    });

    document.getElementById("numberOfTasks").innerText = todosArr.length;
    document.getElementById("numberOfTasksCompleted").innerText = completed;

    let sorted

    sorted = todosArr.sort(function(a,b){
        return new Date(a.dueDate) - new Date(b.dueDate);
    })

    let notCompleted
    let index = 0

    sorted.forEach(element => {
        if (!element.completed && index == 0) {
            index = index + 1
            notCompleted = element
           return notCompleted
        }
    })
    
    const upcomingTaskDiv = document.getElementById("upcomingTask")
    const upcomTaskTemplate = document.getElementById("taskCardTemplate")

    if (storedLeng == "spanish") {
        upcomingTaskDiv.innerHTML = "<h1 class='chartsTitle'>Proxima Tarea</h1>"
    } else {
        upcomingTaskDiv.innerHTML = "<h1 class='chartsTitle'>Next Up Task</h1>"
    }

    const upcomTaskClone = upcomTaskTemplate.content.cloneNode(true)

    const taskCloneCardElement = upcomTaskClone.querySelector(".taskCard")
    const taskCloneImportanceIndicator = upcomTaskClone.querySelector(".importanceIndicator")
    const taskCloneTitle = upcomTaskClone.querySelector(".taskTitle")
    const taskCloneList = upcomTaskClone.querySelector(".taskList")
    const taskCloneDesc = upcomTaskClone.querySelector(".taskDesc")
    const taskDayNMonth = upcomTaskClone.querySelector("h2")
    const taskYear = upcomTaskClone.querySelector("h3")


    taskCloneImportanceIndicator.classList.add(
        getTodoImportance(notCompleted.priority)
    )

    let totalDate = new Date(notCompleted.dueDate)

    var month = totalDate.getUTCMonth() + 1;
    var day = totalDate.getUTCDate();
    var year = totalDate.getUTCFullYear();

    taskDayNMonth.innerText = day + '/' + month
    taskYear.innerText = year

    taskCloneList.innerText = 'Task List: ' + notCompleted.list

    taskCloneTitle.innerText = notCompleted.title

    taskCloneDesc.innerText = notCompleted.content

    upcomingTaskDiv.appendChild(upcomTaskClone)

    todosArr.sort(function(a,b){
        return b.index - a.index;
    })
}

function listExpanded() {

    const lisElTemplate = document.getElementById("listElementTemplate")

    document.getElementById("categListDiv").innerHTML = '<ul id="categUL"></ul>'  

    const categoriesList = document.querySelector("#categUL")
    
    if (categoriesList != null) {
        categoriesList.innerHTML = ""
    }

    if (screen.width < 600) {
        document.querySelector("#expandedCategList").classList.remove("d-none")
        document.querySelector("#expandedCategList").classList.remove("animate__slideOutDown")
        document.querySelector("#expandedCategList").classList.add("animate__slideInUp")

        document.querySelector("#backListIcon").addEventListener("click", function() {
            document.querySelector("#expandedCategList").classList.remove("animate__slideInUp")
            document.querySelector("#expandedCategList").classList.add("animate__slideOutDown")

            setTimeout(function(){ document.querySelector("#expandedCategList").classList.add("d-none"); }, 300);

            Storage.storeTodos(userDataBase, isLoggedIn)
        })
    } else {
        document.querySelector("#expandedCategList").classList.remove("d-none")
        document.querySelector("#expandedCategList").classList.remove("animate__slideOutLeft")
        document.querySelector("#expandedCategList").classList.add("animate__slideInLeft")

        document.querySelector("#backListIcon").addEventListener("click", function() {
            document.querySelector("#expandedCategList").classList.remove("animate__slideInLeft")
            document.querySelector("#expandedCategList").classList.add("animate__slideOutLeft")

            setTimeout(function(){ document.querySelector("#expandedCategList").classList.add("d-none"); }, 300);

            Storage.storeTodos(userDataBase, isLoggedIn)
        })
    }
    

    if (categoriesArr.length == 0) {
        document.querySelector("#categListDiv").innerHTML = "<h4>No categories added yet</h4>"
    } else {
        for (let listIndex = 0; listIndex < categoriesArr.length; listIndex++) {

            const lisElClone = lisElTemplate.content.cloneNode(true)

            const liEl = lisElClone.querySelector("p")
            const liDel = lisElClone.querySelector(".trashIcon")

            liEl.innerText = categoriesArr[listIndex] + liEl.innerText

            liDel.addEventListener("click", () => {
                Swal.fire({
                    template: "#deleteListTemplate"
                }).then((result) => {
                    if (result.isConfirmed) {
                        todosArr.forEach(element =>{
                            if (element.list == categoriesArr[listIndex]) {
                                element.list = "No List"
                            }
                        })
                        
                        categoriesArr.splice(listIndex, 1)
                        
                        listExpanded()
                        renderTodosArr()
                    }
                })

            })

            categoriesList.append(lisElClone)

            if (isLoggedIn[0].theme === "dark") {
                document.querySelectorAll(".trashIcon").forEach(element => element.src = "icons/trashIconWhite.svg")
            }

        }
    }

    const newListInput = document.getElementById("addNewListInput")
    
    newListInput.addEventListener("keyup", function(event) {

        if (event.keyCode === 13) {

            event.preventDefault();

            document.getElementById("addNewListBtn").click();
    }
    })
}

function addNewListAction() {

    const newList = document.getElementById("addNewListInput").value

    if (newList !== "") {
        
        categoriesArr.push(newList)

        document.getElementById("addNewListInput").value = ""

        listExpanded()
    }

}

function nextPageOfArray() {

    if (!todosArr[todosArr.length-1].shouldDisplay) {
        let lastDisplayIndex = 0

        for (let iteration = 1; iteration < todosArr.length-1; iteration++) {
            if (todosArr[iteration].shouldDisplay == true && todosArr[iteration+1].shouldDisplay == false) {
                lastDisplayIndex = iteration
            }
        }

        for (let q = 0; q <= lastDisplayIndex; q++){
            todosArr[q].shouldDisplay = false
        }

        let firstToDisplay = lastDisplayIndex + 1
        let LastToDisplay = firstToDisplay + maxDisplayed

        while (firstToDisplay < LastToDisplay) {
            if (firstToDisplay < todosArr.length) {
                todosArr[firstToDisplay].shouldDisplay = true
            }

            firstToDisplay++
        }

        renderTodosArr()
    }
    
}

function previousPageOfArray() {

    if (!todosArr[0].shouldDisplay) {
        let firstDisplayIndex = 0

        for (let iteration = 1; iteration < todosArr.length; iteration++) {
            if (todosArr[iteration-1].shouldDisplay == false && todosArr[iteration].shouldDisplay == true) {
                firstDisplayIndex = iteration
            }
        }

        let index = firstDisplayIndex

        while (index < firstDisplayIndex + maxDisplayed) {
            if (index < todosArr.length) {
                todosArr[index].shouldDisplay = false
            }

            index++
        }

        let firstToDisplay = firstDisplayIndex - maxDisplayed
        
        while (firstToDisplay < firstDisplayIndex) {
            todosArr[firstToDisplay].shouldDisplay = true
            firstToDisplay++
        }

        renderTodosArr()
    }
    
}

function filterByDate(){

    todosArr.sort(function(a,b){
        return new Date(a.dueDate) - new Date(b.dueDate);
    })

    renderTodosArr()

}