document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('submit_button');

    link.addEventListener('click', function() {
        submit();
    });

    // data is an obj with key value pairings
    chrome.storage.sync.get({list:[], case_sens:false, exact:false}, function (data) {
        var text = document.getElementById("filter_box");
        document.getElementById("case_sens").checked = data.case_sens;
        document.getElementById("exact").checked = data.exact;


        var toShow = [];
        console.log(data.list);

        for(let i = 0; i < data.list.length; i++) {
            toShow.push(data.list[i]);
        }
            
        text.innerText = toShow.join(',');
    });
});

function submit() {
    var text = document.getElementById("filter_box").value;
    var case_sens = document.getElementById("case_sens").checked;
    var exact = document.getElementById("exact").checked ;

    // Sanitise inputs
    var words = text.split(",");

    words = words.map(function(word) {
        return word.trim();
    });

    chrome.storage.sync.set({list:words, case_sens:case_sens, exact:exact}, function() {
        console.log("filtered words are " + words);
    });

    console.log("case_sens - " + case_sens + "\n" + "exact - " + exact)


    
}