
// the 'appoinmentprep' page calls this when the body loads 
function appointmentPrepFormLoad(){
    var prep = JSON.parse(localStorage.getItem("questionPrep"));
    if (prep == undefined){
        document.getElementById("pain_form").style.display="none";
    } else {
        loadPrep();
    }
}

// called when a chief complaint is selected in the 'appontmentprep' page 
function showForm(a){
    document.getElementById("pain_form").style.display="block";
} 

function showAppointmentPrep(){
    window.location.href = "appointmentprep.html";
}



//stores Q&A data as Json objects in a strigified array in localStorage
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
        //prep.push(qJson);
    }

    localStorage.setItem("questionPrep", JSON.stringify(prep));
    //alert(JSON.stringify(prep)); 
    

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

            // TODO: if is select...
            // set the option that was selected for the element
            
            if (elem.nodeName=="SELECT"){
                elem.options.selectedOptionIndex = q.selectedOptionIndex;
                elem.options[q.selectedOptionIndex].selected = "selected";    
            } else if (elem.nodeName=="INPUT"){ 
                elem.value = q.answer;
            }
        }
            //show the whole Q&A list
            showForm(1);
    }
}

function appoinmentPrepIsAvailable(){
    var b = localStorage.getItem("questionPrep") != undefined;
    return b; 
}

function deleteAppointmentPrep(){
    localStorage.removeItem("questionPrep");
}



/*
 * APPOINTMENT PAGE
 */
function showAppointment(){
    window.location.href = "appointment.html";
}

//If there is Q&A data (TODO: *and* the chief complaint has been selected), show the reason for visit 
function appointmentPageLoad(){
    var b  = appoinmentPrepIsAvailable();
    if (b) {
        
        var prep = JSON.parse(localStorage.getItem("questionPrep"));
        var locus = prep[1].locus; //the second drop-down on the page and in the array
        var reasonForVisit = document.getElementById("reason");
        reasonForVisit.innerHTML = "Reason for visit: " + locus;
        document.getElementById("reason").style.display="block";   
    } else {
        document.getElementById("reason").style.display="none";   
    }

}