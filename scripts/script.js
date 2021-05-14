//Funcionamiento interno del Login Form

const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

if (loginButton != null) {
    
    loginButton.addEventListener("click", (action) => {
        action.preventDefault();

        const mail = document.getElementById("mail").value
        const password = document.getElementById("password").value

        console.log(mail, password)
        console.log(loginErrorMsg.innerHTML)
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

// Termina funcionamiento interno de LoginForm


// Funcionamiento interno de RegisterForm

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
            loginErrorMsg.style.display = "block"; 
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


// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}


// Creation of calendar element

function createCalendar(elem, year, month, firstDay) {

    let mon = month; // months in JS are 0..11, not 1..12
    let d = new Date(year, mon, 1);

    console.log(d)

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    var div = document.getElementById('calendarTitle');

    div.innerHTML += '<span id="currentMonth">' + monthNames[month] + '</span>';

    let table = '<table id="generatedCalendar"><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr><tr>';

    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4
    console.log(getDay(d))
    for (let i = 0; i < getDay(d); i++) {
      table += '<td></td>';
    }

    // <td> with actual dates
    while (d.getMonth() == mon) {
      table += '<td>' + d.getDate() + '</td>';

      if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
        table += '</tr><tr>';
      }

      d.setDate(d.getDate() + 1);
    }

    // add spaces after last days of month for the last row
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        table += '<td></td>';
      }
    }

    // close the table
    table += '</tr></table>';

    elem.innerHTML = table;
  }

  function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
  }

  var dateVar = new Date();
  var year = dateVar.getFullYear();
  var month = dateVar.getMonth();
  var firstDay = new Date(year, month, 1)

  console.log(year, month, firstDay)

  createCalendar(calendar, year, month, firstDay);

