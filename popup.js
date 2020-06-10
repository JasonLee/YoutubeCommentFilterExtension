document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('submit_button');
    var on_off = document.getElementById('onOffToggle');

    link.addEventListener('click', function() {
        submit();
    });

    on_off.addEventListener('click', function() {
        changeState();
    });

    // data is an obj with key value pairings
    chrome.storage.sync.get({ list: [], case_sens: false, exact: false, state: false }, function(data) {
        var text = document.getElementById("filter_box");
        document.getElementById("case_sens").checked = data.case_sens;
        document.getElementById("exact").checked = data.exact;
        document.getElementById("onOffToggle").checked = data.state;

        var toShow = [];

        for (let i = 0; i < data.list.length; i++) {
            toShow.push(data.list[i]);
        }

        text.innerText = toShow.join(',');
    });
});

function submit() {
    var text = document.getElementById("filter_box").value;
    var case_sens = document.getElementById("case_sens").checked;
    var exact = document.getElementById("exact").checked;

    var words = text.split(",");

    words = words.map(function(word) {
        return word.trim();
    });

    //Set filter words
    chrome.storage.sync.set({ list: words, case_sens: case_sens, exact: exact });

    refreshPage();

}

function refreshPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(arrayOfTabs) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(arrayOfTabs[0].id, { code: code });
    });
}

function changeState() {
    var button = document.getElementById('onOffToggle').checked;
    chrome.storage.sync.set({ state: button });

    refreshPage();

}