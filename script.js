

// called when a chief complaint is selected in the 'appontmentprep' page 
function showDemoAlert(){
            //the demo quesitons make sense only with the "pain" complaint. 
            var elem = document.getElementById("select1");
            var usertext = elem.options[elem.selectedIndex].text;
            if (usertext != "Pain") {
                alert('The demo works only when you select "Pain" as the complaint');
            } 
} 

/********************************************************************************
    scrapes questions and answers from the appoinment prep modal 
    and stores Q&A data as Json objects in a strigified array in 
    localStorage
 ********************************************************************************/
function savePrep() {

    // array of questions & answers 
    var prep = [];

    // getting all the selects in the page
    var allselects = document.getElementsByTagName("select");

    // for each select in all the selects...
    for (var n = 0; n <allselects.length; n++){
        
        //...
        var qJson = {};

        // the current select
        var myselect = allselects[n];

        //...
        qJson["elementId"] = myselect.id;

        // get the question in user-friendly format from the label
        var q = document.getElementById(myselect.id).labels[0].innerHTML;
        qJson["question"] = q;

        // the json key for the current key value pair
        var questionId = myselect.getAttribute('questionId');

        // getting the text of the selected item 
        for (var i=0; i<myselect.options.length; i++){
            if (myselect.options[i].selected==true){
                
                // add the index of the selected option 
                qJson["selectedOptionIndex"] = i;

                // add the key value pair to the json object
                var answer = myselect.options[i].text;
                qJson[questionId] = answer;

                // add the quesiton json to the prep list
                //prep.questions[prep.questions.length] = qJson;
                prep.push(qJson);
                break;
            }
        }
    }

    //get the free-form answers from the text inputs
    var allinputs = document.getElementsByTagName("input");

    // for each input in all the inputs...
    for (var n = 0; n <allinputs.length; n++){

        //...
        var qJson = {};

        // the current input
        var myinput = allinputs[n];

        var thisanswer = myinput.value;
        var thisquestion = document.getElementById(myinput.id).labels[0].innerHTML;

        qJson["elementId"] = myinput.id;
        qJson["question"] = thisquestion;
        qJson["answer"] = thisanswer;

        // add the quesiton json to the prep list
        //prep.questions[prep.questions.length] = qJson;
        if (thisanswer.trim() != ""){
            prep.push(qJson);
        }
    }

    localStorage.setItem("questionPrep", JSON.stringify(prep));
    
}

/********************************************************************************
 * 
 * loads appointment prep Q&A for editing
 * 
 ********************************************************************************/
function loadPrep() {

    // if the questions have been answered, bring them back for editing 
    var prep = JSON.parse(localStorage.getItem("questionPrep"));

    if (prep != undefined){
        
        console.log(JSON.stringify(prep));

        //populate the answers
        for(var i = 0; i < prep.length; i++){

            //expecting q to be a Json object
            var q = prep[i]; 
            
            //expecting this to be a reference ot the html <input> or <select>
            var elem = document.getElementById(q.elementId);

            // if is select, set the option that was selected for the element
            if (elem.nodeName=="SELECT"){
                elem.options.selectedOptionIndex = q.selectedOptionIndex;
                elem.options[q.selectedOptionIndex].selected = "selected";    
            } else if (elem.nodeName=="INPUT"){ 
                elem.value = q.answer;
            }
        }
    }
}


/*
 * APPOINTMENT PAGE
 */
function showAppointment(){
    
    //if appointmentReason has been selected, display it on the "which?" page
    var appointmentReason = localStorage.getItem("appointmentPrep.appointmentReason");
    if (appointmentReason != undefined){
        document.getElementById("reason").innerHTML=" <i class='fas fa-diagnoses rspacer'></i>" + appointmentReason;
        //change the button text to "Change"
        document.getElementById("selectBtn").innerHTML="Change";
    }
    //kill the modal
    document.getElementById("prepModal").style.display = "none";
    //reset the current question in localStorage
    localStorage.setItem("appointmentPrep.currentQuestionId","1");

}
 
