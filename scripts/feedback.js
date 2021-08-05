document.getElementById("sendMsgInput").addEventListener("click", function(event) {
        event.preventDefault();

        if (document.querySelector("#yourNameInput").value != "" && document.querySelector("#yourEmailInput").value != "" && document.querySelector("#yourMsgInput").value != "" ) {
            if (storedLeng == "spanish") {
                Swal.fire({
                    icon: 'Exito',
                    title: 'Mensaje Enviado',
                    showConfirmButton: false,
                    timer: 2000
                  })
            } else if (storedLeng == "english") {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent',
                    showConfirmButton: false,
                    timer: 2000
                  })
            }

            document.querySelector("#yourNameInput").value = ""
            document.querySelector("#yourEmailInput").value = ""
            document.querySelector("#yourMsgInput").value = ""
            
        }
})

document.querySelector("#goBackIcon").addEventListener("click", function (){
    document.querySelector("#feedbackDiv").classList.remove("animate__fadeIn")

        document.querySelector("#feedbackDiv").classList.add("animate__fadeOut")
    setTimeout(function () {
        document.querySelector("#feedbackDiv").classList.add("d-none")

    }, 800);


})

function showFeedback(){
    document.querySelector("#feedbackDiv").classList.remove("d-none")
    document.querySelector("#feedbackDiv").classList.remove("animate__fadeOut")

    document.querySelector("#feedbackDiv").classList.add("animate__fadeIn")

}