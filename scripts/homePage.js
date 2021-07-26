// Renders todos on homepage based on shouldDisplay property of task

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

                if (todosArr[todosIndex].dueDate == "No deadline") {
                    taskCloneDateData.innerText = "No"
                    taskCloneYearData.innerText = "Date"
                } else {
                    let totalDate = new Date(todosArr[todosIndex].dueDate)
            
                    var month = totalDate.getUTCMonth() + 1;
                    var day = totalDate.getUTCDate();
                    var year = totalDate.getUTCFullYear();
                
                    taskCloneDateData.innerText = day + '/' + month
                    taskCloneYearData.innerText = year
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

// Search Filter for home page

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

// Filter task for the current day

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

// Changes active cell class from one button to another

function changeActiveSel(){
    document.querySelector(".activeSelBtn").classList.remove("activeSelBtn")
    document.querySelector("#generalTodosBtn").classList.add("activeSelBtn")
}

// nextPageOfArray and previousPageOfArray are functions for pagination of task on homepage

function nextPageOfArray() {

    if (document.querySelector("#eyeClosed").classList.contains("d-none")) {
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
    } else {
        let lastNotCompleted = 0

        todosArr.forEach( function(element, index) {
            if (!element.completed) {
                lastNotCompleted = index
            }
        })

        if (!todosArr[lastNotCompleted].shouldDisplay) {
            let lastDisplayIndex = 0

            for (let iteration = 1; iteration < todosArr.length-1; iteration++) {
                if (todosArr[iteration].shouldDisplay == true && todosArr[iteration].completed == false) {
                    lastDisplayIndex = iteration
                }
            }

            for (let q = 0; q <= lastDisplayIndex; q++){
                todosArr[q].shouldDisplay = false
            }

            let firstToDisplay = lastDisplayIndex + 1
            let LastToDisplay = firstToDisplay + maxDisplayed
    
            while (firstToDisplay < LastToDisplay && firstToDisplay < todosArr.length) {
                if (!todosArr[firstToDisplay].completed) {
                    todosArr[firstToDisplay].shouldDisplay = true
                }
    
                firstToDisplay++
            }
    
            renderTodosArr()
        }

    }
    
    
}

function previousPageOfArray() {

    if (document.querySelector("#eyeClosed").classList.contains("d-none")) {
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
    } else {

        let firstNotCompleted = todosArr.findIndex(element => !element.completed)


        console.log(firstNotCompleted)
       
        if (!todosArr[firstNotCompleted].shouldDisplay) {
            let firstDisplayIndex = 0
            let first = true

            for (let iteration = 1; iteration < todosArr.length; iteration++) {
                if (todosArr[iteration].completed == false && todosArr[iteration].shouldDisplay == true && first) {
                    firstDisplayIndex = iteration
                    first = false
                }
            }

            let index = firstDisplayIndex

            while (index < firstDisplayIndex + maxDisplayed) {
                if (index < todosArr.length) {
                    todosArr[index].shouldDisplay = false
                }

                index++
            }

            let iteration = 0
            let displayed = 0

            while (iteration < firstDisplayIndex && displayed < maxDisplayed) {
                if (!todosArr[iteration].completed) {
                    todosArr[iteration].shouldDisplay = true
                    displayed++
                }
                iteration++
            }

            renderTodosArr()
        }



    }
}

// Orders task by date on homepage

function filterByDate(){

    todosArr.sort(function(a,b){
        return new Date(a.dueDate) - new Date(b.dueDate);
    })

    renderTodosArr()

}

// Hides completed task on homepage

function hideCompletedTasks(e) {

    const current = ((e.querySelector(".d-none").id == "eyeOpen") ? "completedHided" : "completedShowing"  )

    todosArr.forEach(element => {element.shouldDisplay = false})

    if (current == "completedShowing") {
        e.querySelector("#eyeOpen").classList.add("d-none")
        e.querySelector("#eyeClosed").classList.remove("d-none")

        let display = 0
        let index = 0

        while (display < maxDisplayed && index < todosArr.length) {
            
            if (!todosArr[index].completed) {
                todosArr[index].shouldDisplay = true
                index++
                display++
            } else {
                index++
            }
        }

        renderTodosArr()

    } else {
        e.querySelector("#eyeOpen").classList.remove("d-none")
        e.querySelector("#eyeClosed").classList.add("d-none")

        fetchToDos().then(() =>{
            renderTodosArr()
        })
    }

}