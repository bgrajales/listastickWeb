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