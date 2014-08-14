 /* Copyright 2014 Mapsnapps. and other contributors */
 /* Released under the MIT license */


        
        if (screen.width <= 1200) {
		alert ("You'd be better off viewing this map on a 14 inch screen or bigger! Please set your browser resolution to 100% for maximum enjoyment!");
		}

        // Passenger figures for the top 20 european airports in 2013.
        var figures = [72.367054, 62.289665, 58.036948, 52.56925, 51.320875, 39.729027, 38.672644,
                       36.166345, 35.444206, 35.210735, 30.76, 29.256, 28.274154, 27.003712, 24.865138,
                       24.06703, 22.95654, 22.768082, 21.999926, 21.228226];

		// Draw a sparkline for the #sparkline element
		$('#sparkline').sparkline(figures, {
		    type: "bar",
		    barColor: 'purple',
		    tooltipSuffix: " Passengers"
		});
        
        // Leaflet layers being used
        var standard = L.tileLayer('http://.a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
		}),
            satellite = L.tileLayer.wms("http://irs.gis-lab.info/?layers=landsat&request=GetTile&z=!&x=!&y=! ", {
		    maxZoom: 18,
		    format: 'image/png',
		    attribution: 'Maps data © <a href="http://onearth.jpl.nasa.gov/tiled.html"> NASA </a>'
		});

        // Create the map & set parameters
		var map = L.map('map', {
			     center: [49.505, 3.036], 
			     zoom: 5,
			     minZoom: 4,
			     maxZoom: 18,
			     layers: [standard]
			 });
				
        // Load GEOJSON Layer
        var figures = L.geoJson(airports, {
			 onEachFeature: function (feature, layer) {
	        layer.bindPopup("<strong>Airport:</strong> <br> " + feature.properties.Airport + "<br>" + 
	        	"<strong>Passengers in 2012: </strong>" + "<br>" + feature.properties.Pax2012 + " <br>" +
	        	"<strong>Passengers in 2013: </strong>" + "<br>" + feature.properties.Pax2013 + "<br>" +
	            "<strong>% Increase/Decrease 2012-13: </strong>" + "<br>" + feature.properties.Change_2012_2013 + "%")
            },
             pointToLayer: function (feature) {
            return L.circle([feature.properties.Lat, feature.properties.Lng], feature.properties.Change_2012_2013*7000, {
			    color: feature.properties.Pax_Value,
			    fillColor: feature.properties.Pax_Value,
			    fillOpacity: 0.5
			}).addTo(map);
				
			}

	    }).addTo(map);
        
	    var pax12 = L.geoJson(airports, {
			 onEachFeature2: function (feature, layer) {
	        layer.bindPopup("<strong>Airport:</strong> <br> " + feature.properties.Airport)
            }

	    });	

        // A couple of groups of Layers being used here 
        var baseLayers = {
			"Satellite": satellite,
			"Standard": standard
		};

        
		var overlays = {
                 "Traffic increase" : figures,
                 "Airport Locations	" : pax12
		};
        // Layer control added to enable you to select or deselect certain layers.
	    L.control.layers(baseLayers, overlays).addTo(map);	
