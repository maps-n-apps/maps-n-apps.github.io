var width = screen.width / 1.75,
    height = 600;

var projection = d3.geo.azimuthal()
    .mode("equidistant")
    .origin([0.85, 51.3])
    .scale(40000);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("div").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("news.json", function(error, news  ) {
      svg.selectAll("path")
      .data(topojson.feature(news, news.objects.rivers).features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "rivers")
      .on("mouseover", function(e){d3.select(this).style("stroke", "orange").style("stroke-width", "5px")})
      .on("click", function(d, e){ if (d.properties.name === "Medway") 
                                     {alert(d.properties.name)} 
                                     else { alert("WooHaa!!")};})
      .on("mouseout", function(e){d3.select(this).style("stroke", "#009999").style("stroke-width", "1px")})
      .append("title").text(function (d) { return "Name: "+d.properties.name; });
});