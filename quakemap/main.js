mapboxgl.accessToken = 'pk.eyJ1IjoiYWxjaGFuZGwiLCJhIjoiY2pjcGYzaWFyMXJlZDMzbnhseXByY3cxNCJ9.CtjpSgEg5MGMqJTcP8Nx1Q';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/alchandl/cjjhkvtm2aq802rni9rpn7wfs', // stylesheet location
    center: [-90, 40], // starting position [lng, lat]
    zoom: 3 // starting zoom
});

var requestURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();


map.on('load', function() {
    let dataset = request.response;
    // map.addSource('precipitation', {
    //     'type': 'geojson',
    //     'data': dataset
    // });

    // map.addSource('plates', {
    //     'type': 'vector',
    //     'url': 'mapbox://alchandl.7j2w1jeh'
    // });
    //
    // map.addLayer({
    //     'id': 'plates',
    //     'type': 'line',
    //     'source': 'plates',
    //     'source-layer': 'Plate_Boundaries-0keh7e',
    //     'paint': {
    //         'line-color': '#ff3e33'
    //     }
    // });

    map.addSource('quakes', {
        'type': 'geojson',
        'data': dataset
    });
    let radius = 3;
    map.addLayer({
        'id': 'precipitation',
        'type': 'circle',
        'source': 'quakes',
        'paint': {
            'circle-color': {
                property: 'mag',
                stops: [
                    [0, 'rgb(255,255,255)'],
                    [1, 'rgb(255,255,255)'],
                    [2, 'rgb(191,204,255)'],
                    [3, 'rgb(160,230,255)'],
                    [4, 'rgb(128,255,255)'],
                    [5, 'rgb(122,255,147)'],
                    [6, 'rgb(255,255,0)'],
                    [7, 'rgb(255,200,0)'],
                    [8, 'rgb(255,145,0)'],
                    [9, 'rgb(255,0,0)'],
                    [10, 'rgb(200,0,0)'],
                    [13, 'rgb(128,0,0)']
                ]
            },
            'circle-radius': 10,
                // {
                // property: 'mag',
                // stops: [
                //     [1, radius],
                //     [2, radius * 2],
                //     [3, radius * 3],
                //     [4, radius * 4],
                //     [5, radius * 5],
                //     [6, radius * 6],
                //     [7, radius * 7],
                //     [8, radius * 8],
                //     [9, radius * 9],
                //     [10, radius * 10],
                //     [11, radius * 11],
                //     [12, radius * 12]
                // ]
            // },
            'circle-opacity': {
                property: 'mag',
                stops: [
                    [0, 0.1],
                    [13, 1],
                ]
            }
        },
        'filter': ['>', 'mag', 5]
    });
    // var checkdate = new Date(dataset.features[dataset.features.length-1].properties['time']);
    // for (let i = dataset.features.length-1; i>0;  i--) {
    //     console.log(i);
    //     (function (i){
    //         console.log(i);
    //         setTimeout(function () {
    //             newdate = new Date(dataset.features[i].properties['time']);
    //             console.log('\n', newdate.getDate());
    //             console.log('CHECK', checkdate.getDate());
    //             console.log(newdate.getMonth(), checkdate.getMonth);
    //             console.log(newdate.getDate() === checkdate.getDate() && newdate.getMonth() === checkdate.getMonth());
    //             // else {
    //             //     checkdate = newdate;
    //             //     console.log('NEW DATE');
    //             //     console.log(checkdate);
    //             // }
    //             // var lBound = results.features[i].properties.mag*5000;
    //             // var hBound = results.features[i].properties.mag*lBound;
    //             // var direction = 1;
    //             // var dirback = -1;
    //             // var coords = results.features[i].geometry.coordinates;
    //             // console.log(coords);
    //             // var latLng = new google.maps.LatLng(coords[1],coords[0]);
    //             // var marker = new google.maps.Circle({
    //             //     strokeColor: '#FF0000',
    //             //     strokeOpacity: 0.8,
    //             //     strokeWeight: 1,
    //             //     fillColor: '#FF0000',
    //             //     fillOpacity: 0.2,
    //             //     radius: lBound,
    //             //     center: latLng,
    //             //     map: map});
    //             // map.getSource('quakes').setData(geojson);
    //             // console.log(dataset.features[i]);
    //             // console.log(Math.log((4.4 + 1.5 * dataset.features[i].properties.mag)));
    //             //referenced http://jsbin.com/nuwem/1/edit?html,output
    //             setInterval(function() {
    //
    //                 // var radius= marker.getRadius();
    //                 // if ((radius > hBound) || (radius < lBound)) {
    //                 //     direction *= -1;
    //                 // }
    //                 // marker.setRadius(radius+direction * 1000);
    //
    //             }, 100);
    //
    //         }, 1000*i);
    //     })(i);
    // }
    let checkdate = new Date(dataset.features[dataset.features.length-1].properties['time']);
    // var checkdate = new Date(dataset.features[dataset.features.length-1].properties['time']);
    let compdate;
    console.log(checkdate);
    let dateindex = 0;
    let datelist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    function richterToJoules(mag) {
        let joules = Math.pow(10, (5.24 + (1.44 * mag)));
        // console.log(joules);
        let petajoules = (joules * 0.000000000001);
        // console.log(petajoules);
        return petajoules
    }

    for (let i = dataset.features.length-1; i>0;  i--) {
         compdate = new Date(dataset.features[i].properties['time']);
         // console.log("CHECK", checkdate);
         // console.log("COMP", compdate);
         // console.log(checkdate.getMonth() === compdate.getMonth());
         // console.log(checkdate.getDate() === compdate.getDate());
         if (checkdate.getDate() !== compdate.getDate()) {
             checkdate.setDate(checkdate.getDate()+1);
             // console.log(checkdate);
             dateindex += 1;
             i -= 1;
         }

         else {
             datelist[dateindex] += richterToJoules(dataset.features[i].properties['mag']);
         }

    }
    console.log(datelist);
    // datelist[31] = (richterToJoules(5));
    map.on('click', 'precipitation', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties;
        console.log(e.features[0]);
        console.log(description);

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    map.on('hover', 'precipitation', function(e) {
        e.setPaintProperty('precipitation', 'opacity', 1);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'precipitation', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'precipitation', function () {
        map.getCanvas().style.cursor = '';
    });

    var myChart = echarts.init(document.getElementById('main'));

    // specify chart configuration item and data
    var option = {
        title: {
            text: 'Daily Earthquake\nEnergy Releaset (pJ)'
        },
        tooltip: {},
        xAxis: {
            data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
        },
        yAxis: {},
        series: [{
            name: 'pJ Released',
            type: 'bar',
            data: datelist
        }]
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);
});