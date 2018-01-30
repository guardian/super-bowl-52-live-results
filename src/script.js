var data, interval;

function init() {
    data = getData();
}

function getData() {
    loadJSON("https://interactive.guim.co.uk/docsdata-test/1Pg1eWBIJid6bExthVfvHhTHuU0wfiEHMBQ3tx8f-yjY.json", function(response) {
        data = response.sheets.Sheet1[0];
        data.grid = cleanUpGridLink(data.grid);

        if (interval == undefined) {
            interval = setInterval(getData, 20000);
        }

        populateEmbed();
    });
}

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function cleanUpGridLink(url) {
    // https://media.gutools.co.uk/images/b9f486e3447db1fb95fd52429c1d438eb4a3e99e?crop=0_53_4462_2676
    // https://media.guim.co.uk/b9f486e3447db1fb95fd52429c1d438eb4a3e99e/0_53_4462_2676/500.jpg
    url = url.replace('gutools', 'guim')
             .replace('images/', '')
             .replace('?crop=', '/')
             + '/500.jpg';

    return url;
}

function populateEmbed() {
    populateElement('sb-status__status', data.status);
    populateElement('sb-score--1', data.patriots);
    populateElement('sb-score--2', data.eagles);
    populateElement('sb-caption', data.caption);
    populateImage(data.grid);
    populateLive(data.status);
}

function populateElement(el, string) {
    document.getElementsByClassName(el)[0].innerHTML = string;
}

function populateImage(url) {
    document.getElementsByClassName('sb-image')[0].setAttribute('src', url);
}

function populateLive(status) {
    if (status === 'Final') {
        document.getElementsByClassName('sb-status__live')[0].classList.remove('is-live');
    } else {
        document.getElementsByClassName('sb-status__live')[0].classList.add('is-live');
    }
}

init();