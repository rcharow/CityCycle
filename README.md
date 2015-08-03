#City Cycle
## Overview

City Cycle provides real-time information about the location and status of New York City's bike share program, Citi Bike.  It shows the number of available bikes and docks at each station, provides routing and directions between stations and also offers a visualizaiton of all bike rides in the city for June 30, 2014, to give an idea of where people are biking and when.

## Data

The real-time status information about bike stations comes from the Citi Bike station feed (http://www.citibikenyc.com/stations/json).  It is updated every 10 seconds.  The visualization data is static data from the Citi Bike trip histories (http://www.citibikenyc.com/system-data).  The routing is provided by the Leaflet Routing Machine plugin (http://www.liedman.net/leaflet-routing-machine/).

## How to Use

#### Station Status

To view station status, zoom in until the station clusters break up into individual stations, which can be seen as green dots.  Click on a dot to view the name of the station, as well as the number of bikes and docks available.

#### Options

The options panel on the right offers options for changing the symbology of the stations, turning routing on and off, and viewing the historical bike trips.

##### Station Radius

The station radius by default reflects the number of available bikes at that station.  The larger the radius, the more bikes are available.  You can use the Station Radius options to toggle between visualizing by available bikes and available docks.



