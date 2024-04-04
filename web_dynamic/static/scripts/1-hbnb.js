#!/usr/bin/node
/*
Your script must be executed only when DOM is loaded
You must use JQuery
Listen for changes on each input checkbox tag:
if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
if the checkbox is unchecked, you must remove the Amenity ID from the variable
update the h4 tag inside the div Amenities with the list of Amenities checked
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
});
