function riverMap() {


// Create the SVG base canvas for the map.
    var width = screen.width / 1.6,
       height = 600;


    // Add map projection + scaling
    var projection = d3.geo.azimuthal()
                      .mode("equidistant")
                      .origin([0.85, 51.2])
                      .scale(40000);

    var path = d3.geo.path()
               .projection(projection);


    var svg = d3.select("#map").append("svg")
                .attr("width", width)
                .attr("height", height);


    // Load first topojson data layer for county boundaries.
    d3.json("counties.json", function(error, counties) {
      svg.selectAll("path")
      .data(topojson.feature(counties, counties.objects.county).features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "counties")
      .on("mouseover", function(e){d3.select(this).style("stroke", "orange").style("stroke-width", "5px")})
      .on("mouseout", function(e){d3.select(this).style("stroke", "#84a293").style("stroke-width", "2px")})
      .append("title").text(function (d) { return "Name: "+d.properties.name; });

      });


     // Loading the second base layer of drainage basins.
     d3.json("rivers.json", function(error, rivers) {
      svg.selectAll("path")
      .data(topojson.feature(rivers, rivers.objects.rivers).features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "rivers")
      .on("mouseover", function(e){d3.select(this).style("stroke", "orange").style("stroke-width", "5px")})
      .on("mouseout", function(e){d3.select(this).style("stroke", "#009999").style("stroke-width", "2px")})
      .append("title").text(function (d) { return "Name: "+d.properties.name; });


    // Loading the csv file containing the river levels data.

      d3.csv("rivers.csv", function(error, data) {
   
      svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {return projection ([d.Longitude, d.Latitude]) [0];})
      .attr("cy", function(d) {return projection ([d.Longitude, d.Latitude]) [1];})
      .attr("r", 5).text(function(d){return d.Name})   
      .style("fill", function(d) {
                        if (d.Recent_lev < d.Typical_low) { return "blue";}
                        else if (d.Recent_lev < d.Typical_high && d.Recent_lev > d.Typical_low ) { return "green";}
                        else if (d.Recent_lev > d.Typical_high) { return "red";} 
                     })   
      .style("opacity", 0.85)
      .on("mouseover", function(){d3.select(this).style("fill", "orange").attr("r", function (d) {return d.Recent_lev * 50})
      .append("title").text(function (d) { return   "Current water level: "+d.Recent_lev+"Mtrs";}) ;})
      .on("click", function(d, e){ if (d.Name === "Maidstone") // CSS selections here with event handlers.
                                     {d3.select("#scrollview-medway").style("display", "initial") &&
                                      d3.select("#Maidstone").attr("fill", "orange") &&
                                      d3.select("#scrollview-ouse").style("display", "none") &&
                                      d3.select("#Lewes").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-stour").style("display", "none") &&
                                      d3.select("#Canterbury").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-brede").style("display", "none")
                                      d3.select("#Brede-Gate").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-browns").style("display", "none") &&
                                      d3.select("#Browns-Br").attr("fill", "steelblue")} 
                                     else if (d.Name === "Lewes")
                                     {d3.select ("#scrollview-ouse").style("display", "initial") &&
                                      d3.select("#Lewes").attr("fill", "orange") &&
                                      d3.select("#scrollview-medway").style("display", "none") &&
                                      d3.select("#Maidstone").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-stour").style("display", "none") &&
                                      d3.select("#Canterbury").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-brede").style("display", "none")
                                      d3.select("#Brede-Gate").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-browns").style("display", "none") &&
                                      d3.select("#Browns-Br").attr("fill", "steelblue")}
                                     else if (d.Name === "Canterbury")
                                     {d3.select ("#scrollview-stour").style("display", "initial") &&
                                      d3.select("#Canterbury").attr("fill", "orange") &&
                                      d3.select("#scrollview-medway").style("display", "none") &&
                                      d3.select("#Maidstone").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-ouse").style("display", "none") &&
                                      d3.select("#Lewes").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-brede").style("display", "none") &&
                                      d3.select("#Brede-Gate").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-browns").style("display", "none") &&
                                      d3.select("#Browns-Br").attr("fill", "steelblue")}
                                     else if (d.Name === "Brede-Gate")
                                     {d3.select ("#scrollview-brede").style("display", "initial") &&
                                      d3.select("#Brede-Gate").attr("fill", "orange") &&
                                      d3.select("#scrollview-medway").style("display", "none") &&
                                      d3.select("#Maidstone").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-ouse").style("display", "none") &&
                                      d3.select("#Lewes").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-stour").style("display", "none") &&
                                      d3.select("#Canterbury").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-browns").style("display", "none") &&
                                      d3.select("#Browns-Br").attr("fill", "steelblue")}
                                      else if (d.Name === "Browns-Br")
                                     {d3.select ("#scrollview-browns").style("display", "initial") &&
                                      d3.select("#Browns-Br").attr("fill", "orange") &&
                                      d3.select("#scrollview-medway").style("display", "none") &&
                                      d3.select("#Maidstone").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-ouse").style("display", "none") &&
                                      d3.select("#Lewes").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-stour").style("display", "none") &&
                                      d3.select("#Canterbury").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-brede").style("display", "none") &&
                                      d3.select("#Brede-Gate").attr("fill", "steelblue")}

                                         ;})
      .on("mouseout", function(){d3.select(this).style("fill", function(d) {
                        if (d.Recent_lev < d.Typical_low) { return "blue";}
                        else if (d.Recent_lev < d.Typical_high && d.Recent_lev > d.Typical_low ) { return "green";}
                        else if (d.Recent_lev > d.Typical_high) { return "red";}
                      })
      .attr("r", 12);})
      .transition()
      .delay(100)
      .duration(1000)    
      .attr("r", 12);

      var text = svg.selectAll("text")
                        .data(data)
                        .enter()
                        .append("text");
    


      var riverLabels = text
                 .attr("x", function(d) { return projection ([d.Longitude, d.Latitude]) [0]; })
                 .attr("y", function(d) { return projection ([d.Longitude, d.Latitude]) [1] - 10; })
                 .text( function (d) { return d.Name; })
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "16px")
                 .attr("fill", "black")
                 .on("mouseover", function(e){d3.select(this).style("fill", "orange").style("stroke-width", "5px")})
                 .on("click", function(d, e){ if (d.Name === "Maidstone") // CSS selections here with event handlers.
                                     {d3.select("#scrollview-medway").style("display", "initial") &&
                                      d3.select("#Maidstone").attr("fill", "orange") &&
                                      d3.select("#scrollview-ouse").style("display", "none") &&
                                      d3.select("#Lewes").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-stour").style("display", "none") &&
                                      d3.select("#Canterbury").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-brede").style("display", "none")
                                      d3.select("#Brede-Gate").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-browns").style("display", "none") &&
                                      d3.select("#Browns-Br").attr("fill", "steelblue")} 
                                     else if (d.Name === "Lewes")
                                     {d3.select ("#scrollview-ouse").style("display", "initial") &&
                                      d3.select("#Lewes").attr("fill", "orange") &&
                                      d3.select("#scrollview-medway").style("display", "none") &&
                                      d3.select("#Maidstone").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-stour").style("display", "none") &&
                                      d3.select("#Canterbury").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-brede").style("display", "none")
                                      d3.select("#Brede-Gate").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-browns").style("display", "none") &&
                                      d3.select("#Browns-Br").attr("fill", "steelblue")}
                                     else if (d.Name === "Canterbury")
                                     {d3.select ("#scrollview-stour").style("display", "initial") &&
                                      d3.select("#Canterbury").attr("fill", "orange") &&
                                      d3.select("#scrollview-medway").style("display", "none") &&
                                      d3.select("#Maidstone").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-ouse").style("display", "none") &&
                                      d3.select("#Lewes").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-brede").style("display", "none") &&
                                      d3.select("#Brede-Gate").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-browns").style("display", "none") &&
                                      d3.select("#Browns-Br").attr("fill", "steelblue")}
                                     else if (d.Name === "Brede-Gate")
                                     {d3.select ("#scrollview-brede").style("display", "initial") &&
                                      d3.select("#Brede-Gate").attr("fill", "orange") &&
                                      d3.select("#scrollview-medway").style("display", "none") &&
                                      d3.select("#Maidstone").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-ouse").style("display", "none") &&
                                      d3.select("#Lewes").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-stour").style("display", "none") &&
                                      d3.select("#Canterbury").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-browns").style("display", "none") &&
                                      d3.select("#Browns-Br").attr("fill", "steelblue")}
                                      else if (d.Name === "Browns-Br")
                                     {d3.select ("#scrollview-browns").style("display", "initial") &&
                                      d3.select("#Browns-Br").attr("fill", "orange") &&
                                      d3.select("#scrollview-medway").style("display", "none") &&
                                      d3.select("#Maidstone").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-ouse").style("display", "none") &&
                                      d3.select("#Lewes").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-stour").style("display", "none") &&
                                      d3.select("#Canterbury").attr("fill", "steelblue") &&
                                      d3.select("#scrollview-brede").style("display", "none") &&
                                      d3.select("#Brede-Gate").attr("fill", "steelblue")}
                                         ;})
                 .on("mouseout", function(e){d3.select(this).style("fill", "black")});
             
      
      }
   );
 });
}
