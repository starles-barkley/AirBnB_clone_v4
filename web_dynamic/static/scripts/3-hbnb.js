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
    $.ajax({
      type: 'POST',
      url: "http://0.0.0.0:5001/api/v1/places_search",
      data: JSON.stringify({}),
      contentType: "application/json",
      success: function(response) {
        let allPlaces = [];
        for (object in response) {
          allPlaces.push(response[object])
        }
        for (key in allPlaces) {
          let place = allPlaces[key]
          let $newArticle = document.createElement("article");
          //creating title_box and place name
          let $title_box = document.createElement("div");
          $title_box.classList.add("title_box");
          let $placeName = document.createElement("div");
          $placeName.append(place.name);
          $title_box.append($placeName);
          //creating price_by_night
          let $price = document.createElement("h2");
          $price.classList.add("price_by_night");
          $price.append(place.price_by_night);
          $title_box.append($price);
          // appending place name and title_box to newArticle
          $newArticle.append($title_box);
  
          // creating information div
          let $information = document.createElement("div");
          $information.classList.add("information");
  
          // creating max_guest div 
          let $max_guest = document.createElement("div");
          $max_guest.classList.add("max_guest");
          $max_guest.append(place.max_guest);
          
  
          // creating number_rooms and number_bathrooms
          let $number_rooms = document.createElement("div");
          $number_rooms.classList.add("number_rooms");
          $number_rooms.append(place.number_rooms);
  
          let $number_bathrooms = document.createElement("div");
          $number_bathrooms.classList.add("number_bathrooms");
          $number_bathrooms.append(place.number_bathrooms);
  
          // appending number_rooms and number_bathrooms to max_guest
          $max_guest.append($number_rooms);
          $max_guest.append($number_bathrooms);
  
          // appending the max_guest div to information
          $information.append($max_guest);
          
          //appending information to newArticle
          $newArticle.append($information);
  
          // creating user div
          // let user = document.createElement("div");
          // user.classList.add("user");
          // user.append(place.user.first_name);
          // user.append(place.user.last_name);
  
          //appending user div to newARticle
          // $newArticle.append($user);
  
  
          //creating description div
          let $description = document.createElement("div");
          $description.classList.add("description");
          $description.append(place.description);
  
          // appending description div to new Article
          $newArticle.append($description)
  
          // appending the completed newArticle to the end of the places section
          $('.places').append($newArticle);
        }
      }
    })
  });
  