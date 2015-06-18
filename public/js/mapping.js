

var map = L.map('map').setView([40.737575, -73.990573],12)
var realtime, markers

L.esri.basemapLayer('Gray').addTo(map);


realtime = L.realtime({
	url: '/data',
	crossOrigin: false,
	type: 'json'
	},{
		interval: 3000,
		pointsToLayer: function (feature,latlng){
			console.log("feature",feature)
        	return L.circleMarker(latlng);
		}
}).addTo(map)

// markers = new L.MarkerClusterGroup()
// markers.addLayer(realtime)
// console.log(markers)
// map.addLayer(markers)


realtime.on('update',function (e){
	// console.log('UPDATE',e,'TIME', new Date())
	var popupContent = function (fId){
		var feature = e.features[fId]
		return "<h4>" + feature.properties.stationName + "</h4>" + "Available Bikes: " + feature.properties.availableBikes + "<br>Available Docks: " + feature.properties.availableDocks + "<br>Updated: " + new Date()
	}
	var bindFeaturePopup = function(fId) {
        realtime.getLayer(fId).bindPopup(popupContent(fId));
    }
    var updateFeaturePopup = function(fId) {
            realtime.getLayer(fId).getPopup().setContent(popupContent(fId));
    }

    Object.keys(e.enter).forEach(bindFeaturePopup)
    Object.keys(e.update).forEach(updateFeaturePopup)
})
