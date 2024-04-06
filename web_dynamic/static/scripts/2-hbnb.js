#!/usr/bin/node
/*
Your script must be executed only when DOM is loaded
You must use JQuery
Listen for changes on each input checkbox tag:
if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
if the checkbox is unchecked, you must remove the Amenity ID from the variable
update the h4 tag inside the div Amenities with the list of Amenities checked

Based on 1-hbnb.js
Request http://0.0.0.0:5001/api/v1/status/:
If in the status is “OK”, add the class available to the div#api_status
Otherwise, remove the class available to the div#api_status
*/

$(document).ready(function() {
  // Initialize an empty dictionary to store the checked amenity IDs
  const checkedAmenities = {};
  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function() {
    // Get the amenity ID from the checkbox's data-id attribute
    const amenityId = $(this).data('id');
    // Check if the checkbox is checked
    if ($(this).is(':checked')) {
      // If checked, add the amenity ID to the dictionary
      checkedAmenities[amenityId] = true;
    } else {
      // If unchecked, remove the amenity ID from the dictionary
      delete checkedAmenities[amenityId];
    }
    // Convert the dictionary keys to an array and join them with a comma
    const amenitiesList = Object.keys(checkedAmenities).join(', ');
    // Update the <h4> tag inside the <div> with the class 'Amenities' with the list of checked amenities
    $('.Amenities h4').text(amenitiesList);
  });

 // Make an HTTP GET request to the specified URL
 $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    // Check if the status is "OK"
    if (data.status === "OK") {
      // If the status is "OK", add the class "available" to the div#api_status
      $('#api_status').addClass('available');
    } else {
      // Otherwise, remove the class "available" from the div#api_status
      $('#api_status').removeClass('available');
    }
 });
});
