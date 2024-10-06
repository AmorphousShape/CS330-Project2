function apiSearch() {
    var params = {
        'q': $('#searchBox').val(),
        count: 50,
        offset: 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            // This is insecure, but this is a free key
            // Normally, a server-side proxy or a .env file would be used
            'Ocp-Apim-Subscription-Key': 'd5eeb55511064ecfb0ab6eabdcebc447'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog({
                title: "Search Results",
                height: $(window).height(),
                width: $(window).width() * 0.3,
                position: {
                    my: 'right top',
                    at: 'right top',
                    of: window
                },
                close: function () {
                    $('#searchResults').css("visibility", "hidden");
                }
            });

            $('#searchResults').css("visibility", "visible");
        })
        .fail(function () {
            alert('error');
        });
};

/*  
    Note: These images were all taken by me and are not licensed for commercial use or distribution
    The dog in some of the pictures, Harley, passed in 2023. He was a fluffy German Shepherd, likely
    a mix with a wolf. He was super sweet and I miss him so much. I hope you enjoy the pictures of him.
*/

// Image paths (relative to Views/Home/index.html)
var portraitImages = [
    '/images/portrait-chicago-main.jpeg',
    '/images/portrait-chicago-1.jpeg',
    '/images/portrait-harley-1.jpeg',
    '/images/portrait-harley-2.jpeg',
];

var landscapeImages = [
    '/images/landscape-chicago-main.jpeg',
    '/images/landscape-chicago-1.jpeg',
    '/images/landscape-harley-1.jpeg',
    '/images/landscape-harley-2.jpeg',
];

// Main image is loaded by default
var currentIndex = 0;
var currentThemeLink = null;

// Change the stylesheet to the new theme
function changeStylesheet(newStylesheet) {

    // Add the new stylesheet to the head
    nextThemeLink = document.createElement('link');
    nextThemeLink.rel = 'stylesheet';
    nextThemeLink.type = 'text/css';
    nextThemeLink.href = newStylesheet;
    document.head.appendChild(nextThemeLink);

    nextThemeLink.onload = function() {
        // Remove the previous stylesheet once the new one is loaded
        if (currentThemeLink) {
            document.head.removeChild(currentThemeLink);
        }
    }
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
                changeStylesheet('/css/main-theme.css');
            } else {
                // Dark Theme
                changeStylesheet('/css/dark-theme.css');
            }
            break;
        case 1:
            // Brown Theme
            if (window.innerWidth > 768) {
                changeStylesheet('/css/brown-theme.css');
            } else {
                // Main Theme
                changeStylesheet('/css/light-theme.css');
            }
            break;
        default:
            // Harley Theme regardless of viewport width
            changeStylesheet('/css/harley-theme.css');
            break;
    }
}

var currentAspectRatio = null;

function handleResize() {

    // Check if the aspect ratio has changed and update the theme if it has
    var newAspectRatio = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';

    if (newAspectRatio !== currentAspectRatio) {
        // Update the theme
        updateTheme();

        // Update the background image
        var images = window.innerWidth > 768 ? landscapeImages : portraitImages;
        $('body').css('transition', 'background-image 0.5s ease-in-out');
        $('body').css('background-image', 'url(' + images[currentIndex] + ')');
    }
}

// Listen for window resize events
$(window).resize(handleResize);

var timeDialog = null;

function getTime() {
    var timeInterval = null;

    var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    $('#time').html(currentTime);

    // Check if the dialog already exists
    if (!timeDialog) {

        // Create the dialog if it doesn't exist
        timeDialog = $('#time').dialog({
            title: 'Current Time',
            width: 220,
            height: 92,

            // Position the dialog in the top right corner of the window
            position: {
                my: 'left top',
                at: 'left top',
                of: window
            },
            close: function() {
                clearInterval(timeInterval); // Clear the interval when the dialog is closed
                timeDialog = null; // Reset the dialog reference when closed
                $('#time').css("visibility", "hidden");
            }
        });

        // Set an interval to update the time every second
        timeInterval = setInterval(function() {
            var updatedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            $('#time').html(updatedTime);
        }, 1000);

        $('#time').css("visibility", "visible");

    } else {
        // Realign the dialog if it already exists
        timeDialog.dialog('option', 'position', {
            my: 'right top',
            at: 'right top',
            of: window
        });

        timeDialog.dialog('option', 'width', 220);
        timeDialog.dialog('option', 'height', 92);
    }
}

$(document).ready(function () {

    // Preload portraitImages and landscapeImages
    portraitImages.forEach(function (image) {
        var img = new Image();
        img.src = image;
    });

    landscapeImages.forEach(function (image) {
        var img = new Image();
        img.src = image;
    });

    // Run handleResize on page load
    // This saves some extra script here
    handleResize();

    $('#searchButton').click(apiSearch);
    $('#engineName').click(changeTheme);
    $('#timeButton').click(getTime);
});