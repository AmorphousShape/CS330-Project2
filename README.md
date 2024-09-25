## CS 330 (Web Development) Project 2

### Assignment Details
Create a Bing Search API using your Microsoft Azure account and use it to construct a simple web search site.<br>

The project must include the following:

* All CSS and JS code must be contained within their respective files
* Include jQuery, jQueryUI, and a jQueryUI theme via CDN links
  * These links can be found at https://developers.google.com/speed/libraries/
  * Use a SRI hash for each of these CDN links; Srihash is an excellent tool for this
* HTML
  * A header with the name of your "search engine" (be creative)
  * A title of the same name
  * A text box with an ID of query
  * A button with a value of Search under your text box
  * A second button that will display the current time
  * An empty div with an ID of searchResults
  * A second empty div with an ID of time
* CSS
  * Set the background of the page to an image of your choice; Unsplash is a great resource for free images
  * Set the visibility of the searchResults and time divs to hidden
  * Style the rest of the page however you see fit. points will be lost if little or no effort is given in styling your site
* JS
  * Replace my-api-url under the ajax call with the url from your search API
  * Replace my-api-key next to Ocp-Apim-Subscription-Key with the api key from your search API
  * Write a function that calls the apiSearch function on a click of your search button
  * Write a function that changes the background image of your site on a click of your search engine name
  * Write a function that gets the current time (formatted HH:MM), loads the result into your time div, and displays the div as a jQueryUI       dialog window on a click of your time button
* Bonus:
  * Implement an I'm feeling lucky button; this button should take the user to the first web page returned from your search API
  * Modify the function that changes your background image so that each click cycles through two different images without refreshing the page
 
Publish to Azure
