var map = L.map('map').setView([53.505, -3.49], 6);
L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://content.stamen.com/dotspotting_toner_cartography_available_for_download">Stamen Toner</a>, <a href="http://www.openstreetmap.org/">OpenStreetMap</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 24
}).addTo(map);

L.control.scale().addTo(map);

var circle = L.circle([51.4722, -0.4527], 47200.313418, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.9
}).addTo(map).bindPopup("London Heathrow airport <strong> 69.99 million passengers</strong>");

var circle = L.circle([51.1566, -0.1857], 32990.465244, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("London Gatwick airport <strong> 34.2 million passengers</strong>");

var circle = L.circle([53.348, -2.284], 25030.50741, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Manchester airport <strong> 19.7 million passengers</strong>");

var circle = L.circle([51.887, 0.25], 23580.535088, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("London Stansted airport <strong> 17.4 million passengers</strong>");

var circle = L.circle([51.877, -0.373], 17480.323204, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Luton airport <strong> 9.6 million passengers</strong>");

var circle = L.circle([55.946, -3.364], 17070.749028, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Edinburgh airport <strong> 9.1 million passengers</strong>");

var circle = L.circle([52.453, -1.7409], 16840.15656, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Birmingham airport <strong> 8.9 million passengers</strong>");

var circle = L.circle([55.870, -4.428], 15080.118648, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Glasgow airport <strong> 7.14 million passengers</strong>");

var circle = L.circle([51.384, -2.717], 13710.649426, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Bristol airport <strong> 5.9 million passengers</strong>");

var circle = L.circle([53.334, -2.849], 11830.907983, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Liverpool airport <strong> 4.4 million passengers</strong>");

var circle = L.circle([55.037, -1.697], 11750.921605, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Newcastle airport <strong> 4.3 million passengers</strong>");

var circle = L.circle([54.654, -6.222], 11700.064723, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Belfast international airport <strong> 4.3 million passengers</strong>");

var circle = L.circle([52.828, -1.329], 11340.567017, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("East Midlands airport <strong> 4 million passengers</strong>");

var circleabz = L.circle([57.2005, -2.199], 10290.217426, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Aberdeen airport <strong> 3.3 million passengers</strong>");

var circlelcy = L.circle([51.506, 0.0563], 9780.1068936, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("London City airport airport <strong> 3 million passengers</strong>");


var circle = L.circle([49.009722, 2.547778], 44200.082684, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.9
}).addTo(map).bindPopup("Paris Charles de Gaulle airport <strong> 61.4 million passengers</strong>");

var circle = L.circle([48.723333, 2.379444], 29420.076008, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Paris Orly airport <strong> 27.2 million passengers</strong>");

var circle = L.circle([43.665278, 7.215], 18860.35064, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Nice cote D'Azur airport <strong> 11.1 million passengers</strong>");

var circle = L.circle([45.725556, 5.081111], 16310.925856, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Lyon St-Exupery airport <strong> 8.366 million passengers</strong>");

var circle = L.circle([43.436667, 5.215], 16120.882837, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Marseille Provence airport <strong> 8.17 million passengers</strong>");

var circle = L.circle([50.026421, 8.543125], 42780.923343, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Frankfurt airport <strong> 57.52 million passengers</strong>");

var circle = L.circle([48.353783, 11.786086], 34940.361099, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("München airport <strong> 38.35 million passengers</strong>");

var circle = L.circle([51.289453, 6.766775], 25750.155949, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Düsseldorf airport <strong> 20.83 million passengers</strong>");

var circle = L.circle([52.56, 13.288], 24040.534902, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Berlin Tegel airport <strong> 18.16 million passengers</strong>");

var circle = L.circle([53.63, 9.98], 20880.065725, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Hamburg airport <strong> 13.69 million passengers</strong>");

var circle = L.circle([52.380001, 13.5225], 15030.041077, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Berlin Schönefeld <strong> 7.097 million passengers</strong>");

var circle = L.circle([52.308613, 4.763889], 40300.525133, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Amsterdam Schipol airport <strong> 51.035 million passengers</strong>");

var circle = L.circle([40.493556, -3.566763], 37920.890687, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Madrid Barajas airport <strong> 45.195 million passengers</strong>");

var circle = L.circle([41.297078, 2.078464], 33440.705813, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Barcelona El Prat airport <strong> 35.145 million passengers</strong>");

var circle = L.circle([39.551675, 2.738808], 26860.080596, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Palma de Mallorca airport <strong> 22.666 million passengers</strong>");

var circle = L.circle([36.6749, -4.499105], 20010.25855, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Málaga airport <strong> 12.582 million passengers</strong>");

var circle = L.circle([41.804475, 12.250797], 34300.945871, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Roma L.Vinci airport <strong> 36.980 million passengers</strong>");

var circle = L.circle([45.630606, 8.728111], 24290.116336, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Milan Malpensa airport <strong> 18.537 million passengers</strong>");

var circle = L.circle([45.445103, 9.276739], 17140.049368, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Milan Linate airport <strong> 9.229 million passengers</strong>");

var circle = L.circle([45.673889, 9.704166], 16820.261594, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Bergamo airport <strong> 8.890 million passengers</strong>");


var circle = L.circle([48.110278, 16.569722], 26560.236316, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Wien airport <strong> 22.165 million passengers</strong>");

var circle = L.circle([50.901389, 4.484444], 24400.798773, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Brussels airport <strong> 18.716 million passengers</strong>");

var circle = L.circle([47.45544, 8.56204], 28090.781153, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Zurich airport <strong> 24.802 million passengers</strong>");

var circle = L.circle([55.6093, 12.6379], 27250.46125, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Copenhagen airport <strong> 23.336 million passengers</strong>");

var circle = L.circle([59.65119, 17.93831], 25000.450363, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Stockholm Arlanda airport <strong> 19.642 million passengers</strong>");

var circle = L.circle([60.19344, 11.09945], 26510.116768, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Oslo Gardermoen airport <strong> 22.080 million passengers</strong>");

var circle = L.circle([38.77361, -9.13324], 22060.924464, {
    color: 'black',
    fillColor: '#FFCC00',
    fillOpacity: 0.8
}).addTo(map).bindPopup("Lisbon Portela airport <strong> 15.301 million passengers</strong>");






