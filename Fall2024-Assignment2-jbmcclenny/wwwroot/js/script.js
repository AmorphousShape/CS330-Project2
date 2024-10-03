function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            // This seems insecure? Key should be obfuscated in some way
            'Ocp-Apim-Subscription-Key': '42999564ccf2405587028f7b3caf4152'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog();
        })
        .fail(function () {
            alert('error');
        });
}

/*  
    Note: These images were all taken by me and are not licensed for commercial use or distribution
    The dog in some of the pictures, Harley, passed in 2023. He was a fluffy German Shepherd, likely
    a mix with a wolf. He was super sweet and I miss him so much. I hope you enjoy the pictures of him.
*/

// Image paths (relative to Views/Home/index.html)
var portraitImages = [
    '../../wwwroot/images/portrait-chicago-main.jpeg',
    '../../wwwroot/images/portrait-chicago-1.jpeg',
    '../../wwwroot/images/portrait-harley-1.jpeg',
    '../../wwwroot/images/portrait-harley-2.jpeg',
];

var landscapeImages = [
    '../../wwwroot/images/landscape-chicago-main.jpeg',
    '../../wwwroot/images/landscape-chicago-1.jpeg',
    '../../wwwroot/images/landscape-harley-1.jpeg',
    '../../wwwroot/images/landscape-harley-2.jpeg',
];

// Main image is loaded by default
var currentIndex = 0;
var currentThemeLink = null;

// Change the stylesheet to the new theme
function changeStylesheet(newStylesheet) {
    if (currentThemeLink) {
        document.head.removeChild(currentThemeLink); // Remove the previous stylesheet
    }

    currentThemeLink = document.createElement('link');
    currentThemeLink.rel = 'stylesheet';
    currentThemeLink.type = 'text/css';
    currentThemeLink.href = newStylesheet;

    document.head.appendChild(currentThemeLink);
}

// Change the theme when the engine name is clicked
function changeTheme() {

    // Get the index of the next image
    // Note: To keep the spirit of the project, I'm leaving the background css edit in the script
    var images = window.innerWidth > 768 ? landscapeImages : portraitImages;
    currentIndex = (currentIndex + 1) % images.length;
    $('body').css('background-image', 'url(' + images[currentIndex] + ')');

    // Update the theme with a css file change
    updateTheme();
}

function updateTheme() {
    // Use index and viewport width to determine which theme to use
    switch (currentIndex) {
        case 0:
            // Main theme
            if (window.innerWidth > 768) {
                changeStylesheet('../../wwwroot/css/main-theme.css');
            } else {
                // Dark Theme
                changeStylesheet('../../wwwroot/css/dark-theme.css');
            }
            break;
        case 1:
            // Brown Theme
            if (window.innerWidth > 768) {
                changeStylesheet('../../wwwroot/css/brown-theme.css');
            } else {
                // Main Theme
                changeStylesheet('../../wwwroot/css/main-theme.css');
            }
            break;
        default:
            // Harley Theme regardless of viewport width
            changeStylesheet('../../wwwroot/css/harley-theme.css');
            break;
    }
}

function handleResize() {
    // Update the theme when the window is resized
    updateTheme();

    // Update the background image when the window is resized
    var images = window.innerWidth > 768 ? landscapeImages : portraitImages;
    $('body').css('background-image', 'url(' + images[currentIndex] + ')');
}

// Listen for window resize events
$(window).resize(handleResize);

function getTime() {
    var currentTime = new Date().toLocaleTimeString();
    $('#time').html(currentTime);
    $('<div>').html(currentTime).dialog({
        title: 'Current Time',
        width: 300,
        height: 200,
        dialogClass: 'time-dialog'
    });
}

$(document).ready(function () {

    // Run handleResize on page load
    // This saves some extra script here
    handleResize();

    $('#searchButton').click(apiSearch);
    $('#engineName').click(changeTheme);
    $('#timeButton').click(getTime);
});