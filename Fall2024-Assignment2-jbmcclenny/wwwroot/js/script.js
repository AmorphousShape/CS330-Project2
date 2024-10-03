function apiSearch() {
    var params = {
        'q': $('#searchBar').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com' + $.param(params),
        type: 'GET',
        headers: {
            // This is insecure, but this is a free key
            // Normally, a server-side proxy or a .env file would be used
            'Ocp-Apim-Subscription-Key': 'd5eeb55511064ecfb0ab6eabdcebc447'
        }
    })
        .done(function (data) {

            // DEBUG
            console.log(data);

            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('<div>').html(results).dialog({
                title: 'Current Time',
                width: 300,
                height: 200,
                dialogClass: 'search-dialog'
            });
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
                changeStylesheet('../../wwwroot/css/light-theme.css');
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

// Make globals for these so they can be updated
var timeDialog = null;
var timeInterval = null;

function getTime() {
    var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    $('#time').html(currentTime);

    // Check if the dialog already exists
    if (!timeDialog) {

        // Create the dialog if it doesn't exist
        timeDialog = $('<div id="time-dialog">').html(currentTime).dialog({
            title: 'Current Time',
            width: 220,
            height: 92,

            // Position the dialog in the top right corner of the window
            position: {
                my: 'right top',
                at: 'right top',
                of: window
            },
            close: function() {
                clearInterval(timeInterval); // Clear the interval when the dialog is closed
                timeDialog = null; // Reset the dialog reference when closed
            }
        });

        // Set an interval to update the time every second
        timeInterval = setInterval(function() {
            var updatedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            $('#time-dialog').html(updatedTime);
        }, 1000);
    } else {
        // Realign the dialog if it already exists
        timeDialog.dialog('option', 'position', {
            my: 'right top',
            at: 'right top',
            of: window
        });
    }
}

$(document).ready(function () {

    // Run handleResize on page load
    // This saves some extra script here
    handleResize();

    $('#searchButton').click(apiSearch);
    $('#engineName').click(changeTheme);
    $('#timeButton').click(getTime);
});