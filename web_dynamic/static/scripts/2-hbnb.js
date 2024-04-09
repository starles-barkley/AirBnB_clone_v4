
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

}) 