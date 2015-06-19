var routeControl = L.Routing.control({
	lineOptions: {
		styles: [
			{ color: '#7BBE51' }
		]
	},
	show: false,
	createMarker: function(i, wp){ 
		return L.marker(wp.latLng,{draggable: false, icon: icon})
	},
    waypoints: [
        L.latLng(40.76727216, -73.99392888),
        L.latLng(40.68382604, -73.97632328)
    ],
    routeWhileDragging: true
})
.addTo(map);