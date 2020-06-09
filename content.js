
function check_page(){
    var ready_state = document.readyState;

    if (ready_state == "complete") {
        var comments = document.querySelectorAll("#content-text, #content-text > span");
       
        // Key: Default
        chrome.storage.sync.get({list: [], case_sens:false, exact:false}, function (data) {
            if(data.list.length <= 1 && !data.list[0].trim()){
                return;
            }

            comments.forEach(function(comment) {
                for(let i = 0; i < data.list.length; i++) {
                    if(!isSpoilerAlready(comment) && checkWord(data.list[i], comment.innerText, data)) {
                        console.log("comment.parentElement.nodeName = " + comment.parentElement.nodeName);
                        console.log("BEFORE comment.innerHTML = " + comment.innerHTML);
                        comment.innerHTML = "<details><summary>SPAM</summary>" + comment.innerHTML + "</details>";
                        console.log("AFTER comment.innerHTML = " + comment.innerHTML);
                        console.log("Is Spoiler? " + isSpoilerAlready(comment));
                        break;
                    }
                }
            });
        });

    }

}

function checkWord(word, str, data) {
    const allowedSeparator = '\\\s,.;\n\r"\'|:-?';

    if(data.exact && data.case_sens) {
        const regex = new RegExp(`(^.*[${allowedSeparator}]${word}$)|(^${word}[${allowedSeparator}].*)|(^${word}$)|(^.*[${allowedSeparator}]${word}[${allowedSeparator}].*$)`);
        return regex.test(str);
    }else if(data.exact){
        const regex = new RegExp(`(^.*[${allowedSeparator}]${word}$)|(^${word}[${allowedSeparator}].*)|(^${word}$)|(^.*[${allowedSeparator}]${word}[${allowedSeparator}].*$)`, 'i');
        return regex.test(str);
    }else{
        return str.includes(word);
    }
}

function isSpoilerAlready(comment) {
    // avoids problem with <details open>
    return comment.innerHTML.startsWith("<details");
}

setInterval(check_page, 1000);

