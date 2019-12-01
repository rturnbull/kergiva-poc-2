/********************************************************************************
    -- LOG-IN MODAL --
*********************************************************************************/

function showLoginModal(){

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

    //when the user clicks the log-in button, cler local storage of prep data, 
    //and display the list of appointments
    loginBtn.onclick = function() {
        clearPrepCache();
        window.location.replace("appointments.html");
    }



        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


/********************************************************************************
    -- APPOINTMENT PREPARATION MODAL --
*********************************************************************************/
function showPrepModal(){

    //...
    loadPrep();
    setModalHeader();
    // Get the modal
    var modal = document.getElementById("prepModal");

    // initialize currentQuestionId at 1, which is the id of the first question
    localStorage.setItem("appointmentPrep.currentQuestionId", "1");
    modal.style.display = "block";
    var firstQuestionDiv = document.getElementById("1");
    firstQuestionDiv.style.display = "block"
    toggleNavButtons();
    // Get the <span> element that closes the modal
    var span = document.getElementById("closex");
    
    // When the user clicks on <span> (x), close the modal
     span.onclick = function() {
         modal.style.display = "none";
     }
}

/**********
 * 
 */
function hideCurrentQuestion(){
    //  hide the question that is current at time of closing, because we 
    //  will start at question 1 when the modal is shown again 
    document.getElementById(localStorage.getItem("appointmentPrep.currentQuestionId")).style.display = "none";
    
    // re-initialize currentQuestionId at 1, which is the id of the first question
    localStorage.setItem("appointmentPrep.currentQuestionId", "1");

}


    //when the user clicks the NEXT QUESTION button...
    function showNextQuestion() {
        
        //using localStorage for the question id
        var currentQuestionId = parseInt(localStorage.getItem("appointmentPrep.currentQuestionId"));
        if ( Number.isNaN(currentQuestionId)) {
            currentQuestionId = 1;
        }

        var nextQuestionId = currentQuestionId;
        nextQuestionId++;

        var currentQuestionDiv = document.getElementById(currentQuestionId.toString());
        var nextQuestionDiv = document.getElementById(nextQuestionId.toString());

        //assuming for now that there is a next one...
        nextQuestionDiv.style.display="block";
        currentQuestionDiv.style.display="none";

        localStorage.setItem("appointmentPrep.currentQuestionId", nextQuestionId.toString());
    
    }

    // show the next of previous question depending on which button was clicked
    function showQuestion(whichWay){

        // we will always hide the current question
        var idToHide = parseInt(localStorage.getItem("appointmentPrep.currentQuestionId"));

        //we will either increment or decrement the current question id
        var idToShow = idToHide;
        if(whichWay == "next"){
            idToShow++; 
        } else {
            idToShow--;
        }

        // show and hide the question DIVs identified by the specified idToShow and idToHide
        var divToHide = document.getElementById(idToHide);
        var divToShow = document.getElementById(idToShow);
        divToShow.style.display="block";
        divToHide.style.display="none";

        //save for next time
        localStorage.setItem("appointmentPrep.currentQuestionId", idToShow.toString());
        toggleNavButtons();
    }

    /*
        disable the 'next' and 'back' buttons if there is no question to go to
        sensitive to when its called; call this only *after* questions have been shown and localStorage has been updated
    */
    function toggleNavButtons(){

        var currentQuestionId = parseInt(localStorage.getItem("appointmentPrep.currentQuestionId"));
        document.getElementById("backButton").disabled = (currentQuestionId == 1);
        document.getElementById("nextButton").disabled = (currentQuestionId == 17);

    }

/*
    call this from the onChange event when the "main complaint" has been selected
*/    
function setModalHeader(){
    var myselect = document.getElementById("select1");
    // getting the text of the selected item 
    for (var i=0; i<myselect.options.length; i++){
        if (myselect.options[i].selected==true){
            var answer = myselect.options[i].text;
            document.getElementById("span1").innerHTML=" <i class='fas fa-diagnoses rspacer'></i>" + answer 
            break;
        }
    }
}

function setAppointmentReason(){
    var myselect = document.getElementById("select2");
    var answer = getTextFromSelectedItem(myselect);
    document.getElementById("reason").innerHTML=" <i class='fas fa-diagnoses rspacer'></i>" + answer;
    localStorage.setItem("appointmentPrep.appointmentReason",answer);
}

function getTextFromSelectedItem(myselect){
    for (var i=0; i<myselect.options.length; i++){
        if (myselect.options[i].selected==true){
            return myselect.options[i].text;
        }
    }
}


/*
    functions to manage the appointment prep cache in localStorage
*/
function clearPrepCache(){
    localStorage.removeItem("appointmentPrep.appointmentReason");
    localStorage.removeItem("appointmentPrep.currentQuestionId");
    localStorage.removeItem("questionPrep");
}

function appoinmentPrepIsAvailable(){
    var b = localStorage.getItem("questionPrep") != undefined;
    return b; 
}

