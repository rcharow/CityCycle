var express = require('express')
var path = require('path')
var router = express.Router()
var data = require('../data/data')
var fs = require('fs')


module.exports = router

router.get('/',function (req, res, next){
	data.getLiveStations()
	.then(function (stations){
		res.send(stations)
	})
	.catch(function (err){
		console.log("Error getting stations", err)
	})
})

router.get('/day', function (req, res,next){
	var data = path.join(__dirname,'../data/citibike-063014.csv')
	fs.readFile(path.join(data), function (err, data) {
	  if (err) throw err;
	  data = data.toString('utf8').split('\r')
	  var row, routes = []
	  var hour = 0
	  // console.log("DATA",data)
	  for(var i = 0; hour < 12;i++){
		  	row = data[i].split(",")
		  	if(i!==0){
		  	routes.push({
		  		time: row[0],
		  		startLat: row[1],
		  		startLon: row[2],
		  		endLat: row[3],
		  		endLon: row[4]
		  	})	  		
		  	hour = Number(row[0].split(" ")[1].slice(0,1))
		  }
	  }

	  res.send(routes)

	});
})

router.post('/',function (req,res,next){
	res.send(data.convertToGeoJson(req.body))
})