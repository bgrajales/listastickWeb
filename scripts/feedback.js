document.getElementById("goBackClick").addEventListener("click", function() {
    window.location.href = "index.html"
})

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