
function check_page(){
    var ready_state = document.readyState;

    if (ready_state == "complete") {
        var comments = document.querySelectorAll("#content-text, #content-text > span");
    
        // Key: Default
        chrome.storage.sync.get({list: []}, function (data) {
            comments.forEach(function(comment) {
                for(let i = 0; i < data.list.length; i++) {
                    if(!isNotSpoilerAlready(comment) && checkWord(data.list[i], comment.innerText)) {
                        comment.innerHTML = "<details><summary>SPAM</summary>" + comment.innerHTML + "</details>";
                        // comment.innerText = "SPAM";
                        break;
                    }
                }
            });
        });

    }

}

function checkWord(word, str) {
    const allowedSeparator = '\\\s,.;\n\r"\'|:-';
  
    const regex = new RegExp(`(^.*[${allowedSeparator}]${word}$)|(^${word}[${allowedSeparator}].*)|(^${word}$)|(^.*[${allowedSeparator}]${word}[${allowedSeparator}].*$)`, 'i',);
    
    return regex.test(str);
}

function isNotSpoilerAlready(comment) {
    return comment.innerText.startsWith("<details>")
}

setInterval(check_page, 1000);

