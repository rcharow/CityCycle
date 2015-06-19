

var map = L.map('map').setView([40.737575, -73.990573],12)
var realtime, markers, markerOptions, icon, currentPopup, openMarker

L.esri.basemapLayer('DarkGray').addTo(map);

icon = L.AwesomeMarkers.icon({
	icon: 'bicycle',
	prefix: 'fa',
	markerColor: 'black'
})



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
	}).addTo(map);

var DataMarker = L.CircleMarker.extend({
	options:{
		data: {}
	}
})

$('div').on('click','a.leaflet-popup-close-button',function (e){
	console.log("$ CLICK",event.target)
})


markerOptions = {
	icon: icon
}

map.on('popupclose',function(e){
	console.log("popup closed!",e)
})

markers = new L.MarkerClusterGroup({ polygonOptions: { color: '#000', weight: 1, opacity: .7, fillOpacity: 0.1 } })


function getPopupContent(station){
	var content = ''
	content += "<h4>" + station.stationName + "</h4>"
	content += "Available Bikes: " + station.availableBikes
	content += "<br>Available Docks: " + station.availableDocks
	content += "<br>Updated: " + new Date()
	return content
}

function getMarkerSize (){
	return 5
}


function markerClick (m){
	openMarker = m.target
	routeControl.getPlan().setWaypoints([])
}

function markerMouseover (m){
	console.log(m)
}


console.log("MAP",map)
function update(){
	$.ajax({
		method: 'GET',
		url: '/data'
	})
	.done(function (stations){
		if(openMarker && openMarker._popup._isOpen){
			currentPopup = openMarker.options.data.id	
		} 
		else{
			currentPopup = undefined
			openMarker = undefined
		} 
		markers.clearLayers()
		stations.forEach(function (station){
			var radius = getMarkerSize()
			var options = {
				icon: icon,color: '#7BBE51', 
				weight: 2, 
				fillColor: '#7BBE51', 
				opacity: .8, 
				radius: radius,
				data: { id: station.id} 
			}
			var marker = new L.CircleMarker(new L.LatLng(station.lat, station.lon), options)
		
			marker.bindPopup(getPopupContent(station))
			marker.on('click',markerClick)

			markers.addLayer(marker)
			if(station.id === currentPopup){
				try {
					marker.openPopup()
					openMarker = marker
				}
				catch(err){}
			} 
		})

		map.addLayer(markers)
		window.setTimeout(update,10000)
	})
}

update()
