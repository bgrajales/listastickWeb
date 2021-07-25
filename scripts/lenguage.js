if (document.querySelector("#indexBody") != null) {

    document.querySelector("#lenguageBtn").addEventListener("click", function(){
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
                        document.getElementById("lenguageBtn").innerText = "Lenguaje"
    
                        document.getElementById("lenguageBtnHamb").innerText = "Lenguaje"
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
    
          localStorage.setItem('lenguage', JSON.stringify(leng))
    
        })
    })

    document.querySelector("#lenguageBtnHamb").addEventListener("click", function(){
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
                        document.getElementById("lenguageBtn").innerText = "Lenguaje"
    
                        document.getElementById("lenguageBtnHamb").innerText = "Lenguaje"
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
    
          localStorage.setItem('lenguage', JSON.stringify(leng))
    
        })
    })
    
}

storedLeng = userDataBase = JSON.parse(localStorage.getItem('lenguage'))

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

    if (document.querySelector("#homeBody") != null) {
        document.getElementById("searchBtn").innerText = "Buscar"
        
        document.getElementById("myDayBtn").innerText = "Mi día"
        document.getElementById("orderDate").innerText = "Ordenar por Fecha"

        document.getElementById("addTaskTitleLabel").innerText = "Titulo"
        document.getElementById("categoryTaskLabel").innerText = "Categoria"
        document.getElementById("priorityTaskLabel").innerText = "Prioridad"
        document.getElementById("deadlineTaskLabel").innerText = "Fecha limite"
        document.getElementById("descriptionTaskLabel").innerText = "Descripcion"
        document.getElementById("saveTaskBtn").innerText = "Añadir Tarea"


        document.getElementById("uploadBtn").innerText = "Cambiar Foto"
        document.getElementById("appThemeLabel").innerText = "Tema"
        document.getElementById("lenguageLabel").innerText = "Lenguaje"
        document.getElementById("logoutBtn").innerText = "Cerrar Sesion"

        document.getElementById("categoriesLabel").innerText = "Categorias"
        document.getElementById("addNewListBtn").innerText = "Añadir"
        document.getElementById("searchListInput").setAttribute("placeholder", "Buscar")
        document.getElementById("addNewListInput").setAttribute("placeholder", "Nueva Categoria")

        document.getElementById("searchBtn").innerText = "Buscar"
        document.getElementById("searchBtn").innerText = "Buscar"
        document.getElementById("searchBtn").innerText = "Buscar"

    }

    if (document.querySelector("#statsBody") != null) {
        
        document.getElementById("totalNumberLabel").innerText = "Tareas Totales"

        document.getElementById("completedNumberLabel").innerText = "Tareas Completadas"
        document.getElementById("taskStatusLabel").innerText = "Estado de Tareas"
        document.getElementById("taskPriorityLabel").innerText = "Prioridades"

        document.getElementById("uploadBtn").innerText = "Cambiar Foto"
        document.getElementById("appThemeLabel").innerText = "Tema"
        document.getElementById("lenguageLabel").innerText = "Lenguaje"
        document.getElementById("logoutBtn").innerText = "Cerrar Sesion"

        document.getElementById("addTaskTitleLabel").innerText = "Titulo"
        document.getElementById("categoryTaskLabel").innerText = "Categoria"
        document.getElementById("priorityTaskLabel").innerText = "Prioridad"
        document.getElementById("deadlineTaskLabel").innerText = "Fecha limite"
        document.getElementById("descriptionTaskLabel").innerText = "Descripcion"
        document.getElementById("saveTaskBtn").innerText = "Añadir Tarea"

        document.getElementById("categoriesLabel").innerText = "Categorias"
        document.getElementById("addNewListBtn").innerText = "Añadir"
        document.getElementById("searchListInput").setAttribute("placeholder", "Buscar")
        document.getElementById("addNewListInput").setAttribute("placeholder", "Nueva Categoria")
        
        document.getElementById("totalNumberLabel").innerText = "Tareas Totales"
        document.getElementById("totalNumberLabel").innerText = "Tareas Totales"
        document.getElementById("totalNumberLabel").innerText = "Tareas Totales"
        document.getElementById("totalNumberLabel").innerText = "Tareas Totales"
        document.getElementById("totalNumberLabel").innerText = "Tareas Totales"
        document.getElementById("totalNumberLabel").innerText = "Tareas Totales"


    }

    if (document.querySelector("#feedbackBody") != null) {
        
        document.querySelector("#headerTextFeedback").innerText = "Dejanos tu menasje!"

        document.querySelector("#yourNameInput").setAttribute("placeholder", "Nombre")
        document.querySelector("#yourEmailInput").setAttribute("placeholder", "Email")
        document.querySelector("#sendMsgInput").setAttribute("value", "Enviar Mensaje")
        document.querySelector("#yourMsgInput").setAttribute("placeholder", "Mensaje")

    }
}
