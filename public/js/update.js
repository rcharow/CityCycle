function update(isInit){
	$.ajax({
		method: 'GET',
		url: '/data'
	})
	.done(function (stations){
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
			if(isInit){
				var marker = new L.CircleMarker(new L.LatLng(station.lat, station.lon), options)
			
				marker.bindPopup(getPopupContent(station))
				marker.on('click',markerClick)

				clusters.addLayer(marker)
			}else{
				var markers = clusters.getLayers()
				markers.forEach(function(m){
					m._popup.setContent(getPopupContent(station))
				})
			}
		})

		if(isInit)
			map.addLayer(clusters)
		window.setTimeout(update,2000)
	})
}

