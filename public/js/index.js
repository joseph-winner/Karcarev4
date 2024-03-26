console.log("JAVASCRIPT HERE!")

function initMap() {
    // Use the Geolocation API to get the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Create a new map and place it in the 'map' div
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: pos
            });

            // Create a new marker and add it to the map
            var marker = new google.maps.Marker({
                position: pos,
                map: map
            });

            // Use the Geocoding API to get the name of the location
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'location': pos}, function(results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        // Display the name of the location in the 'location-name' paragraph
                        document.getElementById('location-name').innerText = results[0].formatted_address;
                    }
                }
            });

            // CONNECTING USER TO QATAR TRACTOR
            var userLocation = new google.maps.LatLng(pos.lat, pos.lng);

            // Get the location of Qatar Tractor & Equipment
            var qatarLocation = new google.maps.LatLng(25.285, 51.52);

            // Create a new Polyline object
            var line = new google.maps.Polyline({
                path: [userLocation, qatarLocation],
                geodesic: true,
                strokeColor: 'green',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            // Add the Polyline object to the map
            line.setMap(map);
        });
    }
}

// GOOGLE MAP AUTO COMPLETE
function initAutocomplete() {
    var input = document.getElementById('location-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
  }

  function init() {
    initMap();
    initAutocomplete();
  }

  init();