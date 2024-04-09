#!/usr/bin/node
/*
Based on 2-hbnb.js
Request http://0.0.0.0:5001/api/v1/places_search/:
Description of this endpoint here. If this endpoint is not available, you will have to add it to the API (you can work all together for creating this endpoint)
Send a POST request with Content-Type: application/json and an empty dictionary in the body - cURL version: curl "http://0.0.0.0:5001/api/v1/places_search" -XPOST -H "Content-Type: application/json" -d '{}'
Loop into the result of the request and create an article tag representing a Place in the section.places. (you can remove the Owner tag in the place description)
*/

$(document).ready(function() {
  const checkedAmenities = {};
  $('input[type="checkbox"]').change(function() {
     const amenityId = $(this).data('id');
     if ($(this).is(':checked')) {
       checkedAmenities[amenityId] = true;
     } else {
       delete checkedAmenities[amenityId];
     }
     const amenitiesList = Object.keys(checkedAmenities).join(', ');
     $('.Amenities h4').text(amenitiesList);
  });
   
  setInterval(function () {
     $.get('http://0.0.0.0:5001/api/v1/status/') 
     .done(function(data){
         $('div#api_status').addClass('available');
         console.log('api is available');
       })
     .fail(function(xhr, status, error) {
       $('div#api_status').removeClass('available');
       console.log('api is unavailable');
     })
  }, 30000) 
 
  // Define the fetchPlaces function
function fetchPlaces() {
  // Send an AJAX request to the specified URL
  $.ajax({
    // URL of the API endpoint
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    // HTTP method to use for the request
    type: 'POST',
    // Set the content type of the request to JSON
    contentType: 'application/json',
    // Data to send with the request, in this case, an empty JSON object
    data: JSON.stringify({}),
    // Function to execute if the request is successful
    success: function(data) {
      // Clear the existing content of the element with class 'places'
      $('.places').empty();

      // Loop through each item in the data array
      data.forEach(function(place) {
        // Create a new article element
        var article = $('<article>');
        // Create a new h2 element with the place's name as text
        var title = $('<h2>').text(place.name);
        // Create a new p element with the place's description as text
        var description = $('<p>').text(place.description);
        // Use a regular expression to remove the "Owner" tag from the description
        description.html(description.html().replace(/<strong>Owner<\/strong>.*?<\/p>/g, ''));
        // Append the title and description to the article
        article.append(title, description);
        // Append the article to the element with class 'places'
        $('.places').append(article);
      });
    },
    // Function to execute if the request fails
    error: function(xhr, status, error) {
      // Log the error to the console
      console.log('Error fetching places:', error);
    }
  });
}
 
  // Call the fetchPlaces function
  fetchPlaces();
 });