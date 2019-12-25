/********************************************************************************
    -- MENU MODAL --
*********************************************************************************/
function showMenu(){
    //alert("clicked");
    // Get the modal
    var menuModal = document.getElementById("menuModal");

    // Get the <span> element that closes the modal
    //var span = document.getElementById("closeMenux");
    
    // When the user clicks on <span> (x), close the modal
     //span.onclick = function() {
        //menuModal.style.display = "none";
     //}

     // when user cicks menu, show the menu modal...
     menuModal.style.display = "block";

     window.onclick = function(e){
        if(e.target == menuModal){
            menuModal.style.display = "none"
        }
      }

}