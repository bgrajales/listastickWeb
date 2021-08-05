// Login function

const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

if (loginButton != null) {
  
    loginButton.addEventListener("click", (action) => {

        action.preventDefault();

        document.getElementById("password").classList.remove("inputCross")
        document.getElementById("mail").classList.remove("inputCross")
        document.getElementById("userNotExistDiv").classList.add("d-none")
        document.getElementById("wrongPassDiv").classList.add("d-none")

        const mail = document.getElementById("mail").value
        const password = document.getElementById("password").value
        
        const user = userDataBase.filter(user => user.email === mail) 

        if ((user.length != 0) && password === user[0].password) {
            isLoggedIn = user
            Storage.storeTodos(userDataBase, isLoggedIn)
            window.location.href = "home.html"
        } else if (user.length != 0) {

            document.getElementById("password").classList.add("inputCross")
            document.getElementById("wrongPassDiv").classList.remove("d-none")

            if (storedLeng == "spanish") {
                document.getElementById("wrongPassText").innerText = "Contraseña incorrecta"
            }

        } else {

            document.getElementById("mail").classList.add("inputCross")
            document.getElementById("mail").style = "margin-bottom: 0;"
            document.getElementById("userNotExistDiv").classList.remove("d-none")

            if (storedLeng == "spanish") {
                document.getElementById("userNotExist").innerText = "Usuario no existe"
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

        document.getElementById("email").classList.remove("inputCross")
        document.getElementById("fullName").classList.remove("inputCross")
        document.getElementById("password").classList.remove("inputCross")
        document.getElementById("repeatPassword").classList.remove("inputCross")

        document.querySelector("#emailErrorDiv").classList.add("d-none")
        document.querySelector("#fullNameErrorDiv").classList.add("d-none")
        document.querySelector("#passwordErrorDiv").classList.add("d-none")
        document.querySelector("#repeatPassErrorDiv").classList.add("d-none")

        const email = document.getElementById("email").value
        const fullName = document.getElementById("fullName").value
        const password = document.getElementById("password").value
        const repeatPassword = document.getElementById("repeatPassword").value

        let errorCount = 0

        let errorEmails, errorFullname, errorPasword, errorRepeatPassword

        if (!checkEmailValidity(email)) {
            console.log("in")
            document.getElementById("email").classList.add("inputCross")
            errorCount++
            errorEmails = true
        }

        if (!checkFullName(fullName)) {
            document.getElementById("fullName").classList.add("inputCross")
            errorCount++
            errorFullname = true
        }

        if (!checkPassword(password)) {
            document.getElementById("password").classList.add("inputCross")
            errorCount++;
            errorPasword = true
        }

        if (password != repeatPassword || repeatPassword == "") {
            document.getElementById("repeatPassword").classList.add("inputCross")
            errorCount++
            errorRepeatPassword = true
        }
        
        if (errorCount == 0) {
            userDataBase.push(new user(email, fullName, password, "images/pfp.png", "default", [], []));
            isLoggedIn= userDataBase.filter(user => user.email === email)
            Storage.storeTodos(userDataBase, isLoggedIn)
            window.location.href = "home.html"
        } else {
            
            if (errorEmails) {
                document.querySelector("#emailErrorDiv").classList.remove("d-none")
                if (storedLeng == "spanish") {
                    document.querySelector("#emailErrorDiv").querySelector("h6").innerText = "Mail Invalido"     
                }
            }
            if (errorFullname) {
                document.querySelector("#fullNameErrorDiv").classList.remove("d-none")
                if (storedLeng == "spanish") {
                    document.querySelector("#fullNameErrorDiv").querySelector("h6").innerText = "Nombre completo Invalido"     
                }
            }
            if (errorPasword) {
                document.querySelector("#passwordErrorDiv").classList.remove("d-none")
                if (storedLeng == "spanish") {
                    document.querySelector("#passwordErrorDiv").querySelector("h6").innerText = "Contraseña demasiado corta"     
                }
            }
            if (errorRepeatPassword) {
                document.querySelector("#repeatPassErrorDiv").classList.remove("d-none")
                if (storedLeng == "spanish") {
                    document.querySelector("#repeatPassErrorDiv").querySelector("h6").innerText = "Contraseñas no coinciden"     
                }
            }

            
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