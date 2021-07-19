if (todosArr == null) {
    var todosArr = []
}

if (isLoggedIn == null) {
    var isLoggedIn = []
}

if (userDataBase == null) {
    var userDataBase = []
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
        
        if (isLoggedIn.length > 0) {
            const pos = userDataBase.map(function(e) { return e.email; }).indexOf(isLoggedIn[0].email)

            todosArr = userDataBase[pos].tasks
        }

        if (todosArr == null) {
            todosArr = []
        }

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

class user {
    constructor(email, fullName, password, pfp, theme, tasks) {
        this.email = email
        this.fullName = fullName
        this.password = password
        this.pfp = pfp
        this.theme = theme
        this.tasks = tasks
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
            userDataBase.push(new user(email, fullName, password, "images/pfp.png", "default", []));
            isLoggedIn= userDataBase.filter(user => user.email === email)
            Storage.storeTodos(userDataBase, isLoggedIn)
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
    document.querySelector('#initialLoadDiv').classList.remove('d-none')
    document.querySelector('#initialLoadDiv').classList.add('d-flex')
}

function hideLoader() {
    document.querySelector('#initialLoadDiv').classList.remove('d-flex')
    document.querySelector('#initialLoadDiv').classList.add('d-none')
}

const numberOfTasksToGenerate = 6;

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

    Storage.getTodos()

    if (todosArr != []) {
        todosArr.forEach(todo => {
            todo.shouldDisplay = true;
        })
    }

    if (document.getElementById("homeBody") != null) {
        showLoader()

        setTimeout(function() {
            hideLoader()
            fetchToDos().then(() =>{
                renderTodosArr()
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

    let today = new Date()
    today.setHours(0,0,0,0)

    const searchInputElement = document.getElementById("searchInput")
    let keywords = searchInputElement.value

    keywords = keywords.trim()
    keywords = keywords.toLowerCase()

    let currentTab
    currentTab = document.querySelector(".activeSelBtn").innerText

    console.log(keywords)

    if (!keywords) {

        switch (currentTab) {

            case "Todos":
                todosArr.forEach(todo =>{
                    todo.shouldDisplay = true
                })
                break;
            case "My Day":
                todosArr.forEach(todo =>{
                    todo.shouldDisplay = true
                })
                filterMyDay()
                break;

        }         
    
    } else {

        switch (currentTab) {

            case "Todos":
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
            case "My Day":
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

        document.querySelector("#backIcon").parentNode.remove()

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
    false, document.querySelector("#taskPriorityInput").selectedOptions[0].label, document.getElementById('taskDeadlineInput').value.replace(/-/g, '\/'), document.getElementById('taskListInput').value))

    let addTaskContainer = document.querySelector("#addTaskContainer")

    addTaskContainer.style.display = "none"

    document.querySelector("#taskTitleInput").value = ""
    document.querySelector("#taskListInput").value = ""
    document.querySelector("#taskPriorityInput").value = ""
    document.querySelector("#taskDeadlineInput").value = ""
    document.querySelector("#taskDescInput").value = ""

    renderTodosArr()
}

function hideCompleted() {

    Storage.storeTodos(userDataBase, isLoggedIn)
    Storage.getTodos()

    let currentTab
    currentTab = document.querySelector(".activeSelBtn").innerText

    todosArr.forEach(todo =>{
        if (document.querySelector("#hideCompletedBtn").innerText == 'Hide Completed') {
            
            switch (currentTab) {

                case "Todos":
                    if (todo.completed) {
                        todo.shouldDisplay = false
                    } else {
                        todo.shouldDisplay = true
                    }
                    break;
                case "My Day":
                    if (todo.completed) {
                        todo.shouldDisplay = false
                        renderTodosArr()
                    }
                    break;

            }         
            
        } else {

            switch (currentTab) {

                case "Todos":
                    console.log(currentTab)
                    todo.shouldDisplay = true
                    break;
                case "My Day":
                    filterMyDay()
                    break;

            }            

        }
        
    })

    if (document.querySelector("#hideCompletedBtn").innerText == 'Show Completed') {

        document.querySelector("#hideCompletedBtn").innerText = 'Hide Completed'
    
    } else {
    
        document.querySelector("#hideCompletedBtn").innerText = 'Show Completed'
    
    }

    renderTodosArr()

}

function filterMyDay() {

    document.querySelector("#hideCompletedBtn").innerText = 'Hide Completed'

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

    console.log(numberOfTask)

    document.querySelector(".activeSelBtn").classList.remove("activeSelBtn")
    document.querySelector("#myDayBtn").classList.add("activeSelBtn")

    renderTodosArr()

    if (numberOfTask == 0) {

        document.getElementById("taskSection").innerHTML = "<h1 id='noTaskText'>No task for today :)</h1>"
        
    }

}

function changeActiveSel(){
    document.querySelector("#hideCompletedBtn").innerText = 'Hide Completed'

    document.querySelector(".activeSelBtn").classList.remove("activeSelBtn")
    document.querySelector("#generalTodosBtn").classList.add("activeSelBtn")
}

function toggleExpandedProfile() {

    if (screen.width < 600) {
        document.getElementById("profileExpandedCard").classList.remove("d-none")
    
        const backIcon = document.querySelector(".backIconPfp")
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
    } else {
        document.getElementById("profileExpandedCard").classList.remove("d-none")
    
        const backIcon = document.querySelector(".backIconPfp")
        const logOut = document.querySelector("#logoutBtn")
    
        document.getElementById("userName").innerText = isLoggedIn[0].fullName
        document.getElementById("userEmail").innerText = isLoggedIn[0].email
    
    
        backIcon.addEventListener("click", () =>{
            document.getElementById("profileExpandedCard").classList.add("d-none")
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
                console.log(reader.result)
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
        userDataBase.forEach(user => {
            if (user.email == isLoggedIn[0].email) {
                user.theme = "default"
                isLoggedIn[0].theme = "default"
             }
        })
    })

    darkBtn.addEventListener("click", (event) => {
        document.documentElement.setAttribute("data-theme", "dark")
        userDataBase.forEach(user => {
            if (user.email == isLoggedIn[0].email) {
                user.theme = "dark"
                isLoggedIn[0].theme = "dark"
            }
        })
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
        },
    });

    var ctx2 = document.getElementById('taskPriorityChart').getContext('2d');
    
    let high = todosArr.filter(task => task.priority == "high").length
    let mid = todosArr.filter(task => task.priority == "mid").length
    let low = todosArr.length - high - mid

    console.log(high, mid, low)
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
        },
    });

    document.getElementById("numberOfTasks").innerText = todosArr.length;

    const upcomingTaskDiv = document.getElementById("upcomingTask")
    const upcomTaskTemplate = document.getElementById("taskCardTemplate")

    upcomingTaskDiv.innerHTML = "<h1 class='chartsTitle'>Next Up Task</h1>"

    const upcomTaskClone = upcomTaskTemplate.content.cloneNode(true)

    const taskCloneCardElement = upcomTaskClone.querySelector(".taskCard")
    const taskCloneImportanceIndicator = upcomTaskClone.querySelector(".importanceIndicator")
    const taskCloneTitle = upcomTaskClone.querySelector(".taskTitle")
    const taskCloneList = upcomTaskClone.querySelector(".taskList")
    const taskCloneDate = upcomTaskClone.querySelector(".taskDate")
    const taskCloneDesc = upcomTaskClone.querySelector(".taskDesc")
    const taskCloneActions = upcomTaskClone.querySelector("#taskHoverDiv")

    if (!todosArr[0].completed) {
        taskCloneImportanceIndicator.classList.add(
            getTodoImportance(todosArr[0].priority)
        )
    } else {
        taskCloneImportanceIndicator.classList.add("completedDot")
    }
    taskCloneList.innerText = 'Task List: ' + todosArr[0].list

    taskCloneDate.innerText = 'Due Date: ' + new Date(todosArr[0].dueDate).toDateString()
    taskCloneTitle.innerText = todosArr[0].title

    taskCloneDesc.innerText = todosArr[0].content

    upcomingTaskDiv.appendChild(upcomTaskClone)

}