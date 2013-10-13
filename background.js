var host = 'chrome-extension://gjpcbbbopajjjnkbkeaflldnocoppcpc/';
var PREFiXDetected = false;
var xhr = new XMLHttpRequest;
function detectPrefix() {
    xhr.open('HEAD', host + 'manifest.json', true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                xhr = null;
                setTimeout(function() {
                    PREFiXDetected = true;
                }, 1000);
            } else {
                setTimeout(detectPrefix, 50);
            }
        }
    }
    xhr.send(null);
}
detectPrefix();