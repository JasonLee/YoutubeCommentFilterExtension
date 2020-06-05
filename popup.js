document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('submit_button');

    link.addEventListener('click', function() {
        submit();
    });

    // data is an obj with key value pairings
    chrome.storage.sync.get({list:[]}, function (data) {
        var text = document.getElementById("filter_box");
        var a = [];
        console.log(data.list);

        for(let i = 0; i < data.list.length; i++) {
            a.push(data.list[i]);
        }
            
        text.innerText = a.join(',');
    });
});

function submit() {
    var text = document.getElementById("filter_box").value;
    // Sanitise inputs
    var words = text.split(",");

    words.forEach(element => {
        element = element.trim();
    });

    chrome.storage.sync.set({list:words}, function() {
        console.log("filtered words are " + words);
    });


    
}