var todosArr = []

const priority = {
    LOW: 'low',
    MID: 'mid',
    HIGH: 'high'
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

function fetchToDos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dueDate = new Date()
            dueDate.setDate(dueDate.getDate() + 3)

            todosArr = [{
                id: 1,
                title: 'Test 1',
                content: 'Contenido de la tarea 1',
                completed: false,
                priority: priority.LOW,
                dueDate: dueDate,
                category: '',
                location: {
                    latitude: -56.1887393,
                    longitude: -34.8921648
                },
                files: [
                    'https://images.prismic.io/clubhouse/25ac590e-8e8d-4785-910a-be2a532b02a2_home_shapes_1.png?auto=format%2Ccompress&fit=max&q=50&w=800',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIj6Jcgoa1_3PeOF_QEhoAdiPoi7VAs3SKWhDDImmd9fKPK9gAiggGhauGGOjst2Fjfys&usqp=CAU'
                ],
                subTasks: [{
                    title: 'Titulo de la sub-tarea 1',
                    completed: true
                }, {
                    title: 'Titulo de la sub-tarea 2',
                    completed: false
                }]
            }, {
                id: 2,
                title: 'Test 2',
                content: 'Contenido de la tarea 2',
                completed: true,
                priority: priority.HIGH,
                category: '',
                subTasks: [{
                    title: 'Titulo de la sub-tarea 1',
                    completed: true
                }]
            }, {
                id: 3,
                title: 'Test 3',
                content: 'Contenido de la tarea 3',
                completed: true,
                priority: priority.MID
            }]

            resolve()
        }, 400)
    })
}

function initialLoad() {
    fetchToDos().then(() =>{
        console.log(todosArr)
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

            /*<div class="taskCard">
                <div class="importanceIndicator"></div>
                <img class="trashCardIcon" src="icons/trashIcon.svg" alt="">
                <h1 class="taskTitle">Task 1</h1>
                <p class="taskDesc">Task description</p>
                <div id="taskHoverDiv">
                <img class="taskHoverBtn changeStatus" src="icons/logoIcon.svg" alt="">
                <img class="taskHoverBtn viewTodo" src="icons/seeMoreIcon.svg" alt="">
                </div>
            </div>*/

            const taskCloneCardElement = taskCardClone.querySelector(".taskCard")
            const taskCloneImportanceIndicator = taskCardClone.querySelector(".importanceIndicator")
            const taskCloneTrashIcon = taskCardClone.querySelector(".trashCardIcon")
            const taskCloneTitle = taskCardClone.querySelector(".taskTitle")
            const taskCloneDesc = taskCardClone.querySelector(".taskDesc")
            const taskCloneActions = taskCardClone.querySelector("#taskHoverDiv")
            const taskCloneChangeStatus = taskCardClone.querySelector(".changeStatus")
            const taskCloneViewTodo = taskCardClone.querySelector(".viewTodo")

            taskCloneCardElement.addEventListener("mouseenter", () =>{
                console.log("in")
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
                alert("View todo ID: " + todosArr[todosIndex])
            })

            taskCloneTrashIcon.addEventListener("click", () =>{
                alert("Delete todo ID: " + todosArr[todosIndex])
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