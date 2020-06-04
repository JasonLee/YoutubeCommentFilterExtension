
function check_page(){
    var ready_state = document.readyState;
    console.log("DOCUMENT READY STATE " + ready_state);

    if (ready_state == "complete") {
        var comments = document.querySelectorAll("#content-text");
    
        // Key: Default
        chrome.storage.sync.get({list: []}, function (data) {
            comments.forEach(function(comment) {
                for(let i = 0; i < data.list.length; i++) {
                    if(comment.innerText.includes(data.list[i])) {
                        comment.innerText = "SPAM";
                        break;
                    }
                }
            });
        });

    }

}

setInterval(check_page, 1000);

