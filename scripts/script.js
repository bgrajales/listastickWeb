//Funcionamiento interno del Login Form

const loginForm = document.getElementById("loginForm")
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (action) => {
    action.preventDefault();

    const mail = document.getElementById("mail").value
    const password = document.getElementById("password").value

    console.log(mail, password)

    if (mail === "bgrajales97@gmail.com" && password === "webdev") {
        window.location.href = "home.html"
    } else {
        loginErrorMsg.style.display = "block"; 
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

// Termina funcionamiento interno de LoginForm


// Funcionamiento interno de RegisterForm

const registerForm = document.getElementById("registerForm")
const loginButton = document.getElementById("register-form-submit");
const loginErrorMsg = document.getElementById("register-error-msg");