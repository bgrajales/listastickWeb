function calendarExpanded() {

    const expandedCal = document.querySelector("#expandedCalendarDiv")
    const closeCal = document.querySelector("#closeExpandedCalendar")
    const calendar = document.getElementById("calendarTable")

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

    let cell
    let cellText
    let date = 1

    for (let h = 0; h < 6; h++) {

        if (storedLeng == "spanish") {
            cell = "<tr id='calendarDays'><td>Do</td><td>Lu</td><td>Ma</td><td>Mi</td><td>Ju</td><td>Vi</td><td>Sa</td></tr>"
            row.appendChild(cell)
        } else {
            cell = "<tr id='calendarDays'><td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td></tr>"
        }

        calendar.innerHTML = cell
    }

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

    closeCal.addEventListener("click", function(){
        expandedCal.classList.add("d-none") 
    })

}

function getDaysInMont(year, month) {
    return 32 - new Date(year, month, 32).getDate()
}
