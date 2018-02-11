
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('window.html', {
        'id': 'qii404_easy_note',
        'outerBounds': {
            'width': 240,
            'height': 240,
            'left': 50,
            'top': 50
        }
    });
});
