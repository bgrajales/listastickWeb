function calendarExpanded() {

    const expandedCal = document.querySelector("#expandedCalendarDiv")
    const closeCal = document.querySelector("#closeExpandedCalendar")
    const calendar = document.getElementById("calendarTable")
    const nextTask = document.querySelector("#calendarNextTask")

    calendar.innerHTML = ""
    nextTask.innerHTML = ""

    expandedCal.classList.remove("d-none")

    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth()

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const monthNamesSpanish = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const daysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const daysNamesSpanish = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]

    document.getElementById("monthAndYear").innerText = ((storedLeng == "spanish") ? `${monthNamesSpanish[month]} ${year}` : `${monthNames[month]} ${year}`)

    let firstDay = (new Date(year, month)).getDay()
    
    var thisMonthTasks = todosArr.filter(todo => (new Date(todo.dueDate).getMonth() == month))

    thisMonthTasks = thisMonthTasks.filter(todo => (new Date(todo.dueDate).getFullYear() == year))
    
    let daysWithTasks = []

    if (thisMonthTasks.length > 0) {
    
        thisMonthTasks.forEach(todo => {

            let dayOTask = new Date(todo.dueDate).getDate()

            if (!daysWithTasks.includes(dayOTask)) {
                daysWithTasks.push(dayOTask)
            }

        })
    }    

    let numbersInMont = getDaysInMont(year, month)

    let auxRow = document.createElement("tr")
    let cell
    let cellText
    let date = 1

    for (let l = 0; l < 7; l++) {
        cell = document.createElement("td")
        cellText = document.createTextNode((storedLeng == "spanish") ? daysNamesSpanish[l] : daysNames[l])
        cell.appendChild(cellText)

        auxRow.appendChild(cell)


    }
    
    auxRow.classList.add("calendarDays")

    calendar.appendChild(auxRow)


    for (let i = 0; i < 6; i++) {

        //Crea 6 filas, cantidad max de semanas en un mes
        let row = document.createElement("tr")

        //Crea dias
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td")
                cellText = document.createTextNode("")
                cell.appendChild(cellText)
                row.appendChild(cell)
            } else if (date > numbersInMont){
                break;
            } else {
                cell = document.createElement("td")
                cellText = document.createTextNode(date)

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("todayCalendar")
                }

                if (daysWithTasks.includes(date)) {
                    let notif = document.createElement("div")
                    notif.classList.add("notif")
                    cell.appendChild(notif)
                    cell.classList.add("hasTask")
                }

                cell.appendChild(cellText)
                row.appendChild(cell)
                date++
            }
        }

        calendar.appendChild(row)
    }

    thisMonthTasks = todosArr.sort(function(a,b){
        return new Date(a.dueDate) - new Date(b.dueDate);
    })
    
    if (thisMonthTasks.length > 0) {
     
        thisMonthTasks.sort(function (a, b) {
            return new Date(a.dueDate) - new Date(b.dueDate)
        })
    
        if (document.getElementById("nextTaskCardTemplate") != null) {
            var upcomTaskTemplate = document.getElementById("nextTaskCardTemplate")
        } else {
            var upcomTaskTemplate = document.getElementById("taskCardTemplate")
        }
    
        const upcomTaskClone = upcomTaskTemplate.content.cloneNode(true)
    
        const taskCloneImportanceIndicator = upcomTaskClone.querySelector(".importanceIndicator")
        const taskCloneTitle = upcomTaskClone.querySelector(".taskTitle")
        const taskCloneList = upcomTaskClone.querySelector(".taskList")
        const taskCloneDesc = upcomTaskClone.querySelector(".taskDesc")
        const taskDayNMonth = upcomTaskClone.querySelector("h2")
        const taskYear = upcomTaskClone.querySelector("h3")
        
        taskCloneImportanceIndicator.classList.add(
            getTodoImportance(thisMonthTasks[0].priority)
        )
    
        let totalDate = new Date(thisMonthTasks[0].dueDate)
    
        var nextUpmonth = totalDate.getUTCMonth() + 1;
        var nextUpday = totalDate.getUTCDate();
        var nextUpyear = totalDate.getUTCFullYear();
    
        taskDayNMonth.innerText = nextUpday + '/' + nextUpmonth
        taskYear.innerText = nextUpyear
    
        taskCloneList.innerText = 'Task List: ' + thisMonthTasks[0].list
    
        taskCloneTitle.innerText = thisMonthTasks[0].title
    
        taskCloneDesc.innerText = thisMonthTasks[0].content
    
        nextTask.appendChild(upcomTaskClone)

    }

    closeCal.addEventListener("click", function(){
        expandedCal.classList.add("d-none") 
    })

}

function getDaysInMont(year, month) {
    return 32 - new Date(year, month, 32).getDate()
}
