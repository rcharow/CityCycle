var clusters, markerOptions, icon

var DataMarker = L.CircleMarker.extend({
	options:{
		data: {}
	}
})


icon = L.AwesomeMarkers.icon({
	icon: 'bicycle',
	prefix: 'fa',
	markerColor: 'black'
})

markerOptions = {
	icon: icon
}

clusters = new L.MarkerClusterGroup({ polygonOptions: { color: '#000', weight: 1, opacity: .7, fillOpacity: 0.1 } })


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
	routeControl.getPlan().setWaypoints([])
}

