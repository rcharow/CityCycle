var routeControl = L.Routing.control({
	lineOptions: {
		styles: [
			{ color: '#7BBE51', opacity: 0 }
		]
	},
	show: false,
	createMarker: function(i, wp){ 
		return L.marker(wp.latLng,{draggable: false, icon: icon})
	},
    waypoints: [
        
    ],
    routeWhileDragging: true
})
.addTo(map);

$('.routing').on('click',function(){
	$('.routing').each(function(i){
		$(this).toggleClass('not')
		if(!$(this).hasClass('not')){
			if($(this).attr('id')==='routeOn')
				mapOptions.routing = true
			else{
				mapOptions.routing = false	
				routeControl.setWaypoints([])
			}
		}
	})
})

// routeControl.on('routeselected', function(r) {
// 	var route = r.route.coordinates
// 	var routeLine= L.polyline(route);
//     var convertLine= routeline.toGeoJSON();
//     console.log("ROUTE",convertLine)
// });

routeControl.on('routeselected', function(e) {
       var route = e.route.coordinates;
       console.log('COORDINATES',route)
       // var routeLine= L.polyline(route);
       // var convertLine= routeLine.toGeoJSON();

      
       $.post( "/data", { data: route } )
       .done(function (geojson){
       	  console.log("GEOJSON",geojson)
       	  animateRoute(JSON.parse(JSON.stringify(geojson)))
       })
});

function markerClick (m){
	if(mapOptions.routing){
		var point = m.latlng
		var lat = point.lat
		var lng = point.lng

		if(mapOptions.waypoints.length === 2){
			mapOptions.waypoints = []
			routeControl.setWaypoints([])
		}

		mapOptions.waypoints.push(L.latLng(lat,lng))

		if(mapOptions.waypoints.length === 2){
			routeControl.setWaypoints([mapOptions.waypoints[0],mapOptions.waypoints[1]])
			console.log("ROUTING",routeControl.getRouter().coordinates)
		}
	}
}


