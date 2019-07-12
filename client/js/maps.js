
$("#search-location").click(function(){
    initMap($("#position-lat").val(), $("#position-lon").val());
});

function initMap(latitude, longitude) {
    if(latitude == undefined || longitude == undefined){
        latitude = Number($("#position-lat").val());
        longitude = Number($("#position-lon").val());
    }else{
        latitude = Number(latitude);
        longitude = Number(longitude);
    }

    var location = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 17, center: location});
    var marker = new google.maps.Marker({position: location, map: map});
}


  