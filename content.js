
function check_page(){
    var ready_state = document.readyState;
    console.log("DOCUMENT READY STATE " + ready_state);

    if (ready_state == "complete") {
        var comment = document.querySelectorAll("#content-text");
    
        comment.forEach(function(text) {
            console.log("COMMENT: " + text.innerText);
        });
    }

}

setInterval(check_page, 1000);

