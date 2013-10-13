var width = 400;
var height = 600;
var host = 'chrome-extension://gjpcbbbopajjjnkbkeaflldnocoppcpc/';
var url = host + 'popup.html?new_window=true';

function createPanel() {
    chrome.windows.create({
        url: url,
        focused: true,
        type: 'panel',
        width: width,
        height: height,
        left: (screen.width - width) / 2,
        top: (screen.height - height) / 2
    }, function() {
        chrome.tabs.query({
            url: location.href
        }, function(tabs) {
            tabs.forEach(function(tab) {
                chrome.tabs.remove(tab.id);
            });
        });
    });
}

var bgWindow;
function detectPrefix() {
    if (bgWindow) {
        if (bgWindow.PREFiXDetected) {
            createPanel();
        } else {
            setTimeout(detectPrefix, 16);
        }
        return;
    }
    chrome.runtime.getBackgroundPage(function(bg) {
        bgWindow = bg;
        detectPrefix();
    });
}
detectPrefix();