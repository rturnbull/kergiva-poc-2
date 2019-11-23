/*
Some text here
*/

function showModal(){
    // Get the modal
    var modal = document.getElementById("login-form");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    //get the log-in button 
    var loginBtn = document.getElementById("login-btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    //when the user clicks the lof-in button, display an alert
    loginBtn.onclick = function() {
        deleteAppointmentPrep();
        window.location.replace("appointments.html");
    }



    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
}

