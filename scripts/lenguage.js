if (document.querySelector("#indexBody") != null) {
    Swal.fire({
        title: 'Choose your lenguage',
        showDenyButton: true,
        confirmButtonText: `Español`,
        denyButtonText: `English`,
      }).then((result) => {
        if (result.isConfirmed) {
            leng = "spanish"

            if (leng == "spanish") {
    
                if (document.querySelector("#indexBody") != null) {
                    
                    document.getElementById("featuresBtn").innerText = "Funcionalidades"
                    document.getElementById("feedbackBtn").innerText = "Contacto"
                    document.getElementById("loginIndexBtn").innerText = "Ingresar"
            
                    document.getElementById("featuresBtnHamb").innerText = "Funcionalidades"
                    document.getElementById("feedbackBtnHamb").innerText = "Contacto"
                    document.getElementById("loginIndexBtnHamb").innerText = "Ingresar"
            
                    document.getElementById("indexText1").innerText = "La herramienta de organizacion que estabas necesitando"
                    document.getElementById("indexText2").innerText = "Donde la necesites"
            
                    document.getElementById("indexText3").innerText = "Listastick es una aplicacion multiplataforma diseñada para aydarte a organizar tu vida a travez de varios dispositivos"
                    
                    document.getElementById("indexText4").innerText = "Empieza tu organizacion ahora!"
                    document.getElementById("startNowBtn").innerText = "Comenzar"
            
                }
            
            }

      } else {
          leng = "english"
      }

      sessionStorage.setItem('lenguage', JSON.stringify(leng))

    })
}

storedLeng = userDataBase = JSON.parse(sessionStorage.getItem('lenguage'))

if (storedLeng == "spanish") {
    if (document.querySelector("#bodyLoginRegister") != null && document.querySelector("#login-form-submit") != null) {
                    
        document.getElementById("welcometextMobile").innerText = "Bienvenido a Listastick!"
        document.getElementById("welcometext").innerText = "Bienvenido a Listastick!"
    
        document.getElementById("passwordLabel").innerText = "Contraseña"
        document.getElementById("password").setAttribute("placeholder", "Escriba su contraseña aqui")
    
        document.getElementById("login-form-submit").innerText = "Ingresar"
        document.getElementById("dontHaveAcc").innerText = "No tienes cuenta en listastick?"
    
        document.getElementById("newAccBtn").innerText = "Crear cuenta nueva"
    
    }
    
    if (document.querySelector("#bodyLoginRegister") != null && document.querySelector("#register-form-submit") != null) {
        
        document.getElementById("welcometext").innerText = "Bienvenido a Listastick!"
        
        document.getElementById("fullNameLabel").innerText = "Nombre Completo"
    
        document.getElementById("passwordLabel").innerText = "Contraseña"
        document.getElementById("password").setAttribute("placeholder", "Ingrese contraseña de 8 digitos")
    
        document.getElementById("repeatPasswordLabel").innerText = "Repite contraseña"
        document.getElementById("repeatPassword").setAttribute("placeholder", "Repite tu contraseña")
    
        document.getElementById("register-form-submit").innerText = "Registrarse"
    
    }
}
