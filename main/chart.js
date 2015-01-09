
          function animateFirstStep(){ 
                d3.select(this)
                .transition()            
                .delay(0)            
                .duration(600)
                .attr("width", 20)
                .each("end", animateSecondStep);
                }
                
          function animateSecondStep(){ //brings the bar back to its original size!!
                d3.select(this)
                .transition()            
                .delay(0)            
                .duration(1000)
                .attr("width", function(d) { return x(barValue(d));});
                }

          var valueLabelWidth = 40; // space reserved for value labels (right)
          var barHeight = 20; // height of one bar
          var barLabelWidth = 100; // space reserved for bar labels
          var barLabelPadding = 5; // padding between bar and bar labels (left)
          var gridLabelHeight = 35; // space reserved for gridline labels
          var gridChartOffset = 3; // space between start of grid and first bar
          var maxBarWidth = 420; // width of the bar with the max value
          var sortedData;
           
          // accessor functions 
          var barLabel = function(d) { return d[label]; };
          var barValue = function(d) { return parseFloat(d[variable]); };
           
          // Sort Data
          if (sorting === "ORIGINAL") {
              sortedData = data;
          } else if (sorting === "VALUE_DESCENDING") {
              sortedData = data.sort(function(a, b) {
           return d3.descending(barValue(a), barValue(b));
          });
          } else if (sorting === "VALUE_ASCENDING") {
              sortedData = data.sort(function(a, b) {
           return d3.ascending(barValue(a), barValue(b));
          });
          } else if (sorting === "LABEL_ALPHABETICAL") {
              sortedData = data.sort(function(a, b) {
           return d3.ascending(barLabel(a), barLabel(b));
          });
          } 
          
          // Colour
          if (colour === "Original") {
              barColour = 'steelblue';
          } else if (colour === "Red") {
              barColour = 'red';
          } else if (colour === "Green") {
              barColour = 'green';  
          } else if (colour === "Purple") {
              barColour = 'purple';
          } 


          // scales
          var yScale = d3.scale.ordinal().domain(d3.range(0, sortedData.length)).rangeBands([0, sortedData.length * barHeight]);
          var y = function(d, i) { return yScale(i); };
          var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
          var x = d3.scale.linear().domain([0, d3.max(sortedData, barValue)]).range([0, maxBarWidth]);
          // svg container element
          var chart = d3.select('#chart').append("svg")
            .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
            .attr('height', gridLabelHeight + gridChartOffset + sortedData.length * barHeight);
          // grid line labels
          var gridContainer = chart.append('g')
            .attr('transform', 'translate(' + barLabelWidth + ',' + gridLabelHeight + ')'); 
          gridContainer.selectAll("text").data(x.ticks(10)).enter().append("text")
            .attr("x", x)
            .attr("dy", -3)
            .attr("text-anchor", "middle")
            .text(String);
          // vertical grid lines
          gridContainer.selectAll("line").data(x.ticks(10)).enter().append("line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
            .style("stroke", "#ccc");
          // bar labels
          var labelsContainer = chart.append('g')
            .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
          labelsContainer.selectAll('text').data(sortedData).enter().append('text')
            .attr('y', yText)
            .attr('stroke', 'none')
            .attr('fill', 'black')
            .attr("dy", ".35em") // vertical-align: middle
            .attr('text-anchor', 'end')
            .text(barLabel);
          // bars
          var barsContainer = chart.append('g')
            .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
          barsContainer.selectAll("rect").data(sortedData).enter().append("rect")
            .attr('y', y)
            .attr('height', yScale.rangeBand())
            .attr('width', function(d) { return x(barValue(d)); })
            .attr('stroke', 'white')
            .attr('fill', barColour)
            .on("mousedown", animateFirstStep)
            .on("mouseover", function(e){d3.select(this).style("fill", "orange")})
            .on("mouseout", function(e){d3.select(this).style("fill", barColour)})
            .append("title").text(function (d) { return (barLabel(d)) + ", " + (barValue(d)); });
          // bar value labels
          barsContainer.selectAll("text").data(sortedData).enter().append("text")
            .attr("x", function(d) { return x(barValue(d)); })
            .attr("y", yText)
            .attr("dx", 3) // padding-left
            .attr("dy", ".35em") // vertical-align: middle
            .attr("text-anchor", "start") // text-align: right
            .attr("fill", "black")
            .attr("stroke", "none")
            .text(function(d) { return d3.round(barValue(d), 2); });
          // start line
          barsContainer.append("line")
            .attr("y1", -gridChartOffset)
            .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
            .style("stroke", "#000");

          chart.append("text")
            .attr("transform", "translate(" + (maxBarWidth / 1.5 ) + " ," + (gridLabelHeight + gridChartOffset) + ")")
            .attr("dy", -25)
            .style("text-anchor", "middle")
            .style("font-weight", 900)
            .text(variable);