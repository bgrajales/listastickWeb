// Declaration of used arrays

var todosArr = []
var isLoggedIn = []
var userDataBase = []
var categoriesArr = ["General"]
var categFilter

// Declaration of maxDisplayed variable used to determine the max number of task displayed per page

var maxDisplayed = 8

// Declaration of task priorities}

const priority = {
    LOW: 'Low',
    MID: 'Medium',
    HIGH: 'High'
}

var priorityArr = [priority.LOW, priority.MID, priority.HIGH]

// Functions to store and retrieve data from localStorage to simulate a data base

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

        categFilter = JSON.parse(localStorage.getItem('categFilter'))

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

// Declaration of standard todo class

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

// Declaration of standard user class

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

// Simulated loader for homepage on initialLoad()

function showLoader() {
    document.getElementById("taskSection").innerHTML = ""
    document.querySelector('#initialLoadDiv').classList.remove('d-none')
    document.querySelector('#initialLoadDiv').classList.add('d-flex')

}

function hideLoader() {
    document.querySelector('#initialLoadDiv').classList.remove('d-flex')
    document.querySelector('#initialLoadDiv').classList.add('d-none')
}

// Number of "Fake" task to generate for website testing using faker.js

const numberOfTasksToGenerate = 63

// fetchToDos mimics data base request to get todos array

function fetchToDos() {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (todosArr.length == 0) {
                    
                for (let index = 0; index < numberOfTasksToGenerate; index++) {

                    faker.random.arrayElements = categoriesArr
                    // Fake task generator for numberOfTasksToGenerate using faker.js

                    todosArr.unshift(new todoElement(index + 1, false, faker.commerce.productName(), 
                    faker.commerce.productDescription(), faker.datatype.boolean(), 
                    priorityArr[Math.floor(Math.random() * priorityArr.length)], faker.date.between('2021-07-24', '2021-12-31'), 
                    categoriesArr[Math.floor(Math.random()*categoriesArr.length)], [{title: "task1", status: false}, {title: "task2", status: true}]))
                    
                }

                if (todosArr.length >= 8 ) {
                    for (let display = 0; display < maxDisplayed; display++) {
                        todosArr[display].shouldDisplay = true;
                    }
                }
                
                resolve()

            } else {

                Storage.getTodos()

                if (todosArr != []) {

                    todosArr.forEach(todo => {todo.shouldDisplay = false})

                    if (categFilter == "") {
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
                    } else {

                        let numbOfTask = todosArr.filter(todo => todo.list == categFilter).length

                        if (numbOfTask <= maxDisplayed) {
                            todosArr.forEach(todo => (todo.list == categFilter) ? todo.shouldDisplay = true : todo.shouldDisplay = false)
                        } else {
                            let displayed  = 0
                            let index = 0

                            while (displayed < maxDisplayed) {
                                if (todosArr[index].list == categFilter) {
                                    todosArr[index].shouldDisplay = true
                                    displayed++
                                }
                                index++
                            }
                        }

                        console.log(numbOfTask)

                    }
                    
                    
                }
                resolve()
            }

        }, 400)
    })

}

// initialLoad for start of pages

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
        document.getElementById("dropdownMenuButton1").innerText = "To-Dos"
    }

}

// Function to check if user is logged in, if it is, send to home

function checkLogIn() {

    Storage.getTodos()
 
    if (isLoggedIn.length != 0) {
         window.location.href = "home.html"
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
    const subTaskInput = taskExpandClone.querySelector("#newSubTaskInput")
    const taskPriorityTemplate = taskExpandClone.querySelector('#taskPriority')
    const taskDescTemplate = taskExpandClone.querySelector('#taskDescriptionExpanded')

    const markAsCompleted = taskExpandClone.querySelector("#markAsCompleted")
    const deleteTaskExpanded = taskExpandClone.querySelector("#deleteTaskBtn")

    taskTitleTemplate.innerText = object.title
    taskListTemplate.innerText = object.list

    if (object.dueDate == "No deadline") {
        taskDayNMonth.innerText = "No"
        taskYear.innerText = "Date"
    } else {
        let totalDate = new Date(object.dueDate)

        var month = totalDate.getUTCMonth() + 1;
        var day = totalDate.getUTCDate();
        var year = totalDate.getUTCFullYear();
    
        taskDayNMonth.innerText = day + '/' + month
        taskYear.innerText = year
    }
  
    if (object.completed == true) {
        taskPriorShow.classList.add("completedDot")
    } else if (object.priority == "Medium"){
        taskPriorShow.classList.add("mid")
    } else {
        taskPriorShow.classList.add(object.priority.toLowerCase())
    }

    taskPriorShow.classList.add(object.priority.toLowerCase())

    let prior = object.priority[0].toUpperCase() + object.priority.slice(1)

    switch (prior) {
        case "Medium":
            if (storedLeng == "spanish") {
                prior = "Media"
            }
            break;
        case "High":
            if (storedLeng == "spanish") {
                prior = "Alta"
            }
            break;
        case "Low":
            if (storedLeng == "spanish") {
                prior = "Baja"
            }
            break;
    }

    taskPriorityTemplate.innerText = prior

    taskDescTemplate.innerText = object.content

    object.subtask.forEach(element => {
        if (element.status) {
            taskSubTaskDiv.innerHTML += '<div class="subTaskandTrash"><div class="form-check" onclick="checkSubTask(this)" style="flex: 1;"><input class="form-check-input" type="checkbox" value="" id="'+ todosIndex + '-' + element.title.trim() +'" checked><label class="form-check-label" for="'+ todosIndex + '-' + element.title.trim() +'">' + 
            element.title + '</label></div><i class="fas fa-trash trashSubTask"onclick="deleteSubTask(this)"></i></div>'

        } else {
            taskSubTaskDiv.innerHTML += '<div class="subTaskandTrash"><div class="form-check" onclick="checkSubTask(this)" style="flex: 1;"><input class="form-check-input" type="checkbox" value="" id="'+ todosIndex + '-' + element.title.trim() +'"><label class="form-check-label" for="'+ todosIndex + '-' + element.title.trim() +'">' + 
            element.title + '</label></div><i class="fas fa-trash trashSubTask"onclick="deleteSubTask(this)"></i></div>'
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
            title: ((storedLeng == "spanish") ? "Estas seguro que deseas eliminar esta tarea?" : "Are you sure you want to delete this task?"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: ((storedLeng == "spanish") ? "Si, eliminar" : "Yes, delete"),
            cancelButtonText: ((storedLeng == "spanish") ? "Cancelar" : "Cancel")
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
        taskExpandClone.querySelector(".contentlabel").innerText = "Contenido:"

        subTaskInput.setAttribute("placeholder", "Añadir Sub Tarea")
        
        markAsCompleted.innerText = "Marcar completado"
        deleteTaskExpanded.innerText = "Borrar Tarea"
    }

    taskExpandClone.querySelector("#taskEditBtn").addEventListener("click", function() {
        editExpandedTask(todosIndex)
    })

    taskSec.prepend(taskExpandClone)

}

// Edit expanded task function

function editExpandedTask(todosIndex) {

    document.querySelectorAll(".expandedTaskBkgNew p").forEach(element => element.style = "margin: 0;")

    const expandedCard = document.querySelector(".expandedTaskBkgNew ")

    const datePicker = expandedCard.querySelector(".importanceIndicatorExpanded")
    const titleChange = expandedCard.querySelector("#taskTitleExpanded")
    const listChange = expandedCard.querySelector("#taskList")
    const priorityChange = expandedCard.querySelector("#taskPriority")
    const descChange = expandedCard.querySelector("#taskDescriptionExpanded")
    
    const editIcon = expandedCard.querySelector("#taskEditBtn")
    const saveicon = expandedCard.querySelector("#taskSaveChangesBtn")
    const closeIcon = expandedCard.querySelector("#backIcon")

    expandedCard.querySelectorAll(".backAndTitle").forEach(element => { element.classList.add("flex-column")})

    if (todosArr[todosIndex].dueDate != "No deadline") {
        let taskDate = new  Date(todosArr[todosIndex].dueDate)

        let dd = taskDate.getDate();
        let mm = taskDate.getMonth()+1; //January is 0!
        let yyyy = taskDate.getFullYear();

        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        }

        taskDate = yyyy+'-'+mm+'-'+dd;

        datePicker.innerHTML = `<input type="date" id="editDateExpanded" value="${taskDate}">`
    }

    titleChange.innerHTML = '<input type="text" id="newTaskTitle" value="'+todosArr[todosIndex].title+'"style="display: block;">'
    descChange.innerHTML = '<textarea id="newTaskDesc" style="width: 100%;">'+todosArr[todosIndex].content+'</textarea>'

    editIcon.classList.add('d-none')
    saveicon.classList.remove('d-none')
    closeIcon.classList.add('d-none')
    let elem = ""
    
    for (let listIndex = 0; listIndex < categoriesArr.length; listIndex++) {
        elem += '<option value="' + listIndex + '">' + categoriesArr[listIndex] + '</option>'
    }

    listChange.innerHTML = '<select class="form-select addTaskInputStyle" id="editTaskListInput" aria-label="Default select example">' +
    elem +
    '</select>'

    priorityChange.innerHTML = '<select class="form-select addTaskInputStyle" id="editTaskPriorityInput" aria-label="Default select example">' +
      `<option value="1" select>${(storedLeng == "spanish") ? "Baja" : "Low"}</option>` +
      `<option value="2">${(storedLeng == "spanish") ? "Media" : "Medium"}</option>` +
      `<option value="3">${(storedLeng == "spanish") ? "Alta" : "High"}</option>`

      saveicon.addEventListener("click", function(){
          saveTaskEdit(todosIndex, datePicker, titleChange, descChange, listChange, priorityChange, closeIcon)
      })
      
}

// Save edit of expanded task

function saveTaskEdit(todosIndex, datePicker, titleChange, descChange, listChange, priorityChange, closeIcon) {

    console.log(todosIndex, datePicker, titleChange, descChange, listChange, priorityChange)

    if (datePicker.querySelector("#editDateExpanded").value == "") {
        todosArr[todosIndex].dueDate = "No deadline"
    } else {
        todosArr[todosIndex].dueDate = datePicker.querySelector("#editDateExpanded").value
    }
    

    todosArr[todosIndex].title = titleChange.querySelector("#newTaskTitle").value
    todosArr[todosIndex].content = descChange.querySelector("#newTaskDesc").value

    todosArr[todosIndex].list = listChange.querySelector("#editTaskListInput").selectedOptions[0].label

    let prior = priorityChange.querySelector("#editTaskPriorityInput").selectedOptions[0].label

    switch (prior) {
        case "Baja":
            prior = "Low"
            break;
        case "Media":
            prior = "Medium"
            break;
        case "Alta":
            prior = "High"
            break;
    }

    todosArr[todosIndex].priority = prior

    renderTodosArr()

    closeIcon.click()
     
    showExpandedTodoCard(todosArr[todosIndex], todosIndex)

}

// Function for checkin sub tasks

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

// Function to delete sub tasks

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

// Function to display Add Task inputs when plus icon clicked

if (document.querySelector("#addTaskMain")) {

    let addTask = document.querySelector("#addTaskMain")
    let addTaskContainer = document.querySelector("#addTaskContainer")
    let closeTaskContainer = document.querySelector("#closeAddTask")
    let userLists = document.querySelector("#taskListInput")
    let datePicker = document.querySelector("#taskDeadlineInput")

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
        
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();

        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        }

        today = yyyy+'-'+mm+'-'+dd;

        datePicker.setAttribute("min", today)

        userLists.innerHTML = ""
        
        for (let listIndex = 0; listIndex < categoriesArr.length; listIndex++) {
            let elem = '<option value="' + listIndex + '">' + categoriesArr[listIndex] + '</option>'
            userLists.innerHTML = userLists.innerHTML + elem;
        }

        if (storedLeng == "spanish") {
            document.querySelector("#optionLow").innerText = "Baja"
            document.querySelector("#optionMid").innerText = "Media"
            document.querySelector("#optionHigh").innerText = "Alta"
        }

    })

}

// Add new task based on Add Task inputs value

function addNewTask() {

    if ( document.getElementById('taskTitleInput').value !== "" ) {
        
        document.getElementById('taskTitleInput').classList.remove("inputCross")
        document.getElementById('taskTitleRequied').classList.add("d-none")
            
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

        let prior = document.querySelector("#taskPriorityInput").selectedOptions[0].label

        switch (prior) {
            case "Baja":
                prior = "Low"
                break;
            case "Media":
                prior = "Medium"
                break;
            case "Alta":
                prior = "High"
                break;
        }

        todosArr.unshift(new todoElement(currentIndex, 
            false, 
            document.getElementById('taskTitleInput').value, 
            document.getElementById('taskDescInput').value, 
            false, 
            prior, 
            deadlineInput, 
            document.querySelector("#taskListInput").selectedOptions[0].label,
            []))

        let addTaskContainer = document.querySelector("#addTaskContainer")

        addTaskContainer.classList.add("d-none")

        document.querySelector("#taskTitleInput").value = ""
        document.querySelector("#taskDeadlineInput").value = ""
        document.querySelector("#taskDescInput").value = ""

        todosArr.forEach(element => {element.shouldDisplay = false;})
            
        if (todosArr.length >= maxDisplayed) {
            for (let display = 0; display < maxDisplayed; display++) {
                todosArr[display].shouldDisplay = true;
            }
        } else {
            todosArr.forEach(element => {element.shouldDisplay = true})
        }

        renderTodosArr()
    } else {
        document.getElementById('taskTitleInput').classList.add("inputCross")
        document.getElementById('taskTitleRequied').classList.remove("d-none")
    }

}

// Expanded profile function when pfp clicked

function toggleExpandedProfile() {

    if (storedLeng == "spanish") {
        document.querySelector("#spanishCheck").setAttribute("checked", "true")
    } else {
        document.querySelector("#englishCheck").setAttribute("checked", "true")
    }
    
    if (screen.width < 600) {
        document.getElementById("profileExpandedCard").classList.remove("d-none")
        document.getElementById("profileExpandedCard").classList.remove("animate__slideOutDown")
        document.getElementById("profileExpandedCard").classList.add("animate__slideInUp")

        const backIcon = document.querySelector(".backIconPfp")
        const editPf = document.querySelector("#editProfileInfo")

        editPf.addEventListener("click", () => {
            editProfileInfo()
        })
        
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
        const editPf = document.querySelector("#editProfileInfo")
    
        document.getElementById("userName").innerText = isLoggedIn[0].fullName
        document.getElementById("userEmail").innerText = isLoggedIn[0].email
    
        editPf.addEventListener("click", () => {
            editProfileInfo()
        })

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

// Editar datos de perfil

function editProfileInfo() {

    const userNdisplay = document.getElementById('userName')
    const userEdisplay = document.getElementById('userEmail')

    userNdisplay.classList.add("d-none")
    userEdisplay.classList.add("d-none")

    const changeDiv = document.getElementById("changePfInfoDiv")
    const userNChange = document.getElementById('userNameChange')
    const userEChange = document.getElementById('userEmailChange')

    changeDiv.classList.remove("d-none")
    userNChange.setAttribute('placeholder', isLoggedIn[0].fullName)
    userEChange.setAttribute('placeholder', isLoggedIn[0].email)

    const cancelBtn = document.getElementById('cancelInfoChng')
    const saveBtn = document.getElementById('saveInfoChng')

    cancelBtn.addEventListener('click', () => {
        changeDiv.classList.add("d-none")

        userNdisplay.classList.remove("d-none")
        userEdisplay.classList.remove("d-none")

        userNChange.value = ""
        userEChange.value = ""
    })

    saveBtn.addEventListener('click', () => {
        console.log("save")

        userDataBase.indexOf()
        let pos = userDataBase.map(function(e) { return e.email; }).indexOf(isLoggedIn[0].email);

        let newUserName = userNChange.value
        let newUserEmail = userEChange.value

        if ((newUserName != "") && checkFullName(newUserName)) {
            userDataBase[pos].fullName = newUserName
            isLoggedIn[0].fullName = newUserName
            userNdisplay.innerText = newUserName
        }

        if ((newUserEmail != "") && checkEmailValidity(newUserEmail)) {
            userDataBase[pos].email = newUserEmail
            isLoggedIn[0].email = newUserEmail
            userEdisplay.innerText = newUserEmail
        }

        if ((userNChange != "") || (userEChange != "")) {
           
            changeDiv.classList.add("d-none")

            userNdisplay.classList.remove("d-none")
            userEdisplay.classList.remove("d-none")

            userNChange.value = ""
            userEChange.value = ""

            Storage.storeTodos(userDataBase, isLoggedIn)
        }

    })

}

// Change Profile Picture Function

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

// Change theme, light and dark

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

// Lenguage Selection

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

// Landing page hamburger menu show

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

// Set up of graphs and data for stats page

function statsPageSetup() {
    
    if (todosArr.length > 0) {
        
        if (storedLeng == "spanish") {
            var label2 = "# Tareas"

            var pendingTask = "Pendientes"
            var completedTask = "Completadas"

            var highTask = "Alta"
            var medTask = "Media"
            var lowTask = "Baja"
        } else {
            var label2 = "# Tasks"

            var pendingTask = "Pending"
            var completedTask = "Completed"

            var highTask = "High"
            var medTask = "Medium"
            var lowTask = "Low"
        }

        var ctx1 = document.getElementById('taskCompletedChart').getContext('2d');

        let completed = todosArr.filter(task => task.completed == true).length
        let pending = todosArr.length - completed

        var myChart1 = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: [pendingTask, completedTask],
            datasets: [{
                label: label2,
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
            labels: [highTask, medTask, lowTask],
            datasets: [{
                label: label2,
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

        var ctx3 = document.getElementById("taskListChart").getContext("2d")

        let colors = []
        let categData = []

        for(let i=0; i < categoriesArr.length ;i++){
            colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
        }

        categoriesArr.forEach(categ => {
            
            let categLength = todosArr.filter(element => element.list == categ).length

            categData.push(categLength)

        })

        var myChart3 = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: categoriesArr,
                datasets: [{
                    label: label2,
                    data: categData,
                    backgroundColor: colors,
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
    } else {
        document.querySelector("#generalStatsDiv").style = "display: grid;justify-items: center;height: 90vh;align-content: center;gap: 30px;grid-template-columns: repeat(1, 1fr);"

        document.getElementById("generalStatsDiv").innerHTML = "<img src='icons/logoBlue.svg' style='width: 45px'><h1 style='text-align: center;'>All done!</h1><h1>No task to analize</h1>"
    }
}

// Expansion of lists div

function listExpanded() {

    const lisElTemplate = document.getElementById("listElementTemplate")

    document.getElementById("categListDiv").innerHTML = '<ul id="categUL"></ul>'  
    document.getElementById("removeFiltText").innerText = ((storedLeng == "spanish") ? "Remover filtros" : "Remove filters")

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
            const liFil = lisElClone.querySelector(".filterIcon")

            liEl.innerText = categoriesArr[listIndex] + liEl.innerText

            liDel.addEventListener("click", () => {
                Swal.fire({
                    title: ((storedLeng == "spanish") ? "Estas seguro que deseas eliminar esta categoria?" : "Are you sure you want to delete this category?"),
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: ((storedLeng == "spanish") ? "Si, eliminar" : "Yes, delete"),
                    cancelButtonText: ((storedLeng == "spanish") ? "Cancelar" : "Cancel")
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

            if (document.querySelector("#homeBody") != null) {
                liFil.addEventListener("click", function(){
                    filterListCateg(listIndex)
                })
            }  

            categoriesList.append(lisElClone)

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

// Add new list function

function addNewListAction() {

    const newList = document.getElementById("addNewListInput").value

    if (newList !== "") {
        
        categoriesArr.push(newList)

        document.getElementById("addNewListInput").value = ""

        listExpanded()
    }

}

// Filtro por categorias

function filterListCateg(listIndex) {

    let isThereTask = todosArr.filter(elem => elem.list == categoriesArr[listIndex]).length

    categFilter = categoriesArr[listIndex]

    if (isThereTask > 0) {

        localStorage.setItem('categFilter', JSON.stringify(categFilter))

        fetchToDos().then(() =>{renderTodosArr()})

        document.getElementById("backListIcon").click()

        Swal.fire({
        icon: 'success',
        title: (storedLeng == "spanish") ? "Tareas filtradas por categoria" : "Task filtered by Category",
        showConfirmButton: false,
        timer: 1500
        })
    } else {
        Swal.fire({
        icon: 'warning',
        title: (storedLeng == "spanish") ? `No hay tareas en ${categFilter}`  : `No task under ${categFilter}`,
        showConfirmButton: false,
        timer: 1500
        })
    }
    
}