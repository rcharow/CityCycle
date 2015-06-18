

var map = L.map('map').setView([40.737575, -73.990573],12)
var realtime, markers, markerOptions, icon, currentPopup, openMarker

L.esri.basemapLayer('Gray').addTo(map);

// var content = "<h4>" + station.stationName + "</h4>" + "Available Bikes: " + station.availableBikes + "<br>Available Docks: " + station.availableDocks + "<br>Updated: " + new Date()
// realtime = L.realtime({
// 	url: '/data',
// 	crossOrigin: false,
// 	type: 'json'
// 	},{
// 		interval: 3000,
// 		pointsToLayer: function (feature,latlng){
// 			console.log("feature",feature)
//         	return L.circleMarker(latlng);
// 		}
// }).addTo(map)


// realtime.on('update',function (e){
// 	// console.log('UPDATE',e,'TIME', new Date())
	// var popupContent = function (feature){
	// 	// var feature = e.features[fId]
	// 	debugger
	// 	return "<h4>" + station.stationName + "</h4>" + "Available Bikes: " + feature.properties.availableBikes + "<br>Available Docks: " + feature.properties.availableDocks + "<br>Updated: " + new Date()
	// }
// 	var bindFeaturePopup = function(fId) {
//         realtime.getLayer(fId).bindPopup(popupContent(fId));
//     }
//     var updateFeaturePopup = function(fId) {
//             realtime.getLayer(fId).getPopup().setContent(popupContent(fId));
//     }

//     Object.keys(e.enter).forEach(bindFeaturePopup)
//     Object.keys(e.update).forEach(updateFeaturePopup)
// })

var DataMarker = L.CircleMarker.extend({
	options:{
		data: {}
	}
})

$('div').on('click','a.leaflet-popup-close-button',function (e){
	console.log("$ CLICK",event.target)
})

icon = L.AwesomeMarkers.icon({
	icon: 'bicycle',
	prefix: 'fa',
	markerColor: 'black'
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
				icon: icon,color: '#000', 
				weight: 2, 
				fillColor: '#000', 
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
		window.setTimeout(update,2000)
	})
}

update()
