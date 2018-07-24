let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: new google.maps.LatLng(2.8, -187.3),
        mapTypeId: 'terrain',
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#181818"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1b1b1b"
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#2c2c2c"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8a8a8a"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#373737"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3c3c3c"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#4e4e4e"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3d3d3d"
                    }
                ]
            }
        ]
    });

    let requestURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    // request.responseType = 'json';
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let results = JSON.parse(request.responseText).features;
            // dataProcess(results.filter((x) => x.properties.mag >= 3.0));
            results.filter((x) => x.properties.mag >= 3.0).map((x) => dataMap(x));
        }
        else {
            console.log("ERROR");
        }
    };
    request.send();
}

function colorCheck(mag) {
    let output;
    if (mag >= 3) {
        output = 'rgb(160,230,255)';
    }
    if (mag >= 4) {
        output = 'rgb(128,255,255)';
    }
    if (mag >= 5) {
        output = 'rgb(122,255,147)';
    }
    if (mag >= 6) {
        output = 'rgb(255,255,0)';
    }
    if (mag >= 7) {
        output = 'rgb(255,200,0)';
    }
    if (mag >= 8) {
        output = 'rgb(255,145,0)';
    }
    if (mag >= 9) {
        output = 'rgb(255,0,0)';
    }
    if (mag >= 10) {
        output = 'rgb(200,0,0)';
    }
    return output;
}

function richterToJoules(mag) {
    let joules = Math.pow(10, (5.24 + (1.44 * mag)));
    let petajoules = (joules * 0.000000000001);
    return petajoules
}

function magRatio(mag) {
   // return 1 - (1 / mag);
    return 0.5 * ((mag - 2.9)/(12 / 2.9));
}

function dataProcess(results) {
    let mag;
    let magColor;
    for (let i = results.length-1; i>0;  i--) {
        (function (i){
            setTimeout(function () {
                // var lBound = results[i].properties.mag*9000;
                // var hBound = results[i].properties.mag*lBound;
                mag = results[i].properties.mag;
                var coords = results[i].geometry.coordinates;
                console.log(coords);
                var latLng = new google.maps.LatLng(coords[1],coords[0]);
                magColor = colorCheck(mag);
                magRat = magRatio(mag);
                // let marker = new google.maps.Circle({
                //     strokeColor: magColor,
                //     strokeOpacity: 0.8,
                //     strokeWeight: 1,
                //     fillColor: magColor,
                //     fillOpacity: 0.2,
                //     // radius: 300000,
                //     center: latLng,
                //     map: map});
                // console.log(magRatio(results[i].properties.mag), " corresponds to", results[i].properties.mag);
                let marker = new google.maps.Marker({
                    position: latLng,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 4,
                        strokeOpacity: 0,
                        strokeColor: magColor,
                        // strokeOpacity: magRatio(results[i].properties.mag),
                        fillColor: magColor,
                        fillOpacity: magRat,
                        strokeWeight: 1
                    },
                    map: map
                });
                // ({
                    // strokeColor: magColor,
                    // strokeOpacity: 0.8,
                    // strokeWeight: 1,
                    // fillColor: magColor,
                    // fillOpacity: 0.2,
                    // // radius: 300000,
                    // center: latLng,
                    // map: map});

                // setInterval(function() {
                //     let radius = marker.getRadius();
                //     // if ((radius > hBound) || (radius < lBound)) {
                //     //     direction *= -1;
                //     // }
                //     if (radius > hBound) {
                //         marker.setRadius(radius + direction * 1000);
                //     }
                // }, 10);
            }, 100*i);
        })(i);
    }
};

function dataMap(result) {
    let mag;
    let magColor;
    let magRat;
    let coords;
    let latlng;
    let marker;
    // for (let i = results.length-1; i>0;  i--) {
    //         setTimeout(function () {
                // var lBound = results[i].properties.mag*9000;
                // var hBound = results[i].properties.mag*lBound;
                mag = result.properties.mag;
                coords = result.geometry.coordinates;
                console.log(coords);
                latlng = new google.maps.LatLng(coords[1],coords[0]);
                magColor = colorCheck(mag);
                magRat = magRatio(mag);
                // let marker = new google.maps.Circle({
                //     strokeColor: magColor,
                //     strokeOpacity: 0.8,
                //     strokeWeight: 1,
                //     fillColor: magColor,
                //     fillOpacity: 0.2,
                //     // radius: 300000,
                //     center: latLng,
                //     map: map});
                // console.log(magRatio(results[i].properties.mag), " corresponds to", results[i].properties.mag);
                new google.maps.Marker({
                    position: latlng,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 2,
                        strokeOpacity: 0,
                        strokeColor: magColor,
                        // strokeOpacity: magRatio(results[i].properties.mag),
                        fillColor: magColor,
                        fillOpacity: magRat,
                        strokeWeight: 1
                    },
                    map: map
                });
                // ({
                // strokeColor: magColor,
                // strokeOpacity: 0.8,
                // strokeWeight: 1,
                // fillColor: magColor,
                // fillOpacity: 0.2,
                // // radius: 300000,
                // center: latLng,
                // map: map});

                // setInterval(function() {
                //     let radius = marker.getRadius();
                //     // if ((radius > hBound) || (radius < lBound)) {
                //     //     direction *= -1;
                //     // }
                //     if (radius > hBound) {
                //         marker.setRadius(radius + direction * 1000);
                //     }
                // }, 10);
            // }, 100);
    // }
};