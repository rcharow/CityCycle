#City Cycle
## Overview

City Cycle provides real-time information about the location and status of bike stations in New York City's bike share program, Citi Bike.  It shows the number of available bikes and docks at each station, provides routing and directions between stations, and also offers a visualizaiton of all bike rides in the city for June 30, 2014, to give an idea of where people are biking and when.

## Data

The real-time status information about bike stations comes from the Citi Bike station feed (http://www.citibikenyc.com/stations/json).  The application updates the station status every 10 seconds.  The visualization data is static data from the Citi Bike trip histories (http://www.citibikenyc.com/system-data).  The routing is provided by the Leaflet Routing Machine plugin (http://www.liedman.net/leaflet-routing-machine/).

## How to Use

#### Station Status

To view station status, zoom in until the station clusters break up into individual stations, which can be seen as green dots.  Click on a station dot to view the name of the station, as well as the number of bikes and docks available.

#### Options

The options panel on the right offers options for changing the symbology of the stations, turning routing on and off, and viewing the historical bike trip visualization.

##### Station Radius

The station radius by default reflects the number of available bikes at that station.  The larger the radius, the more bikes are available.  You can use the Station Radius options to toggle between visualizing by available bikes and available docks.

##### Routing

To enable routing, toggle it on in the options panel.  When routing is on, click on a station which will be your starting station.  Next, click on a second station which will be the destination.  When you click on the destination, the route will be visualized on the map.  Clicking on the bike markers at either end of the trip will show the directions from origin to destination.  You can clear the route by clicking on another station to start a new route, or toggling routing off in the options.

##### Visualization

To view the visualization, toggle it on in the options panel.  It will take a few seconds to load.  You will be able to see the time of day at the bottom of the page.  To stop the visualization and clear it from the map, simply toggle it off in the options panel. 

## Technology

The Leaflet JavaScript library was used for all the front end mapping.  D3 was used to animate the routing and the historical visualization.  The Marker Cluster Leaflet plugin was used to cluster the stations, and the Leaflet Routing Machine plugin was used to calculate routes.  The backend is uses Node.js.



