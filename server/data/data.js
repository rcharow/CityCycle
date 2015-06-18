var axios = require('axios')
var geojson = require('geojson')

var cityBikeFeed = 'http://www.citibikenyc.com/stations/json' 

var getBikeFeed = function(){
	return axios.get(cityBikeFeed)
	.then(function (response) {
		return geojson.parse(stationParser(response.data),{Point:['lat','lon']})
	  })
	.catch(function (response) {
	    console.log(response)
	  })

}

function stationParser(data){
	
	return data.stationBeanList.map(function(station){
		var s =  {
			id: station.id,
			stationName: station.stationName,
			lat: station.latitude,
			lon: station.longitude,
			stationStatus: station.statusValue,
			totalDocks: station.totalDocks,
			availableDocks: station.availableDocks,
			availableBikes: station.availableBikes,
			stAddress1: station.stAddress
		}
		return s
	})
}

module.exports = {
	getLiveStations: getBikeFeed
}