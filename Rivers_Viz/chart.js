function renderChart() {


							d3.csv("rivers.csv", function(error, data) {
							console.log(data);
							var valueLabelWidth = 40; // space reserved for value labels (right)
							var barHeight = 20; // height of one bar
							var barLabelWidth = 100; // space reserved for bar labels
							var barLabelPadding = 5; // padding between bar and bar labels (left)
							var gridLabelHeight = 18; // space reserved for gridline labels
							var gridChartOffset = 3; // space between start of grid and first bar
							var maxBarWidth = 175; // width of the bar with the max value
							 
							// accessor functions 
							var barLabel = function(data) { return data['Name']; };
							var barValue = function(data) { return parseFloat(data['Highest_lev']); };
							 
							// sorting
							var sortedData = data.sort(function(a, b) {
							 return d3.descending(barValue(a), barValue(b));
							}); 

							// scales
							var yScale = d3.scale.ordinal().domain(d3.range(0, sortedData.length)).rangeBands([0, sortedData.length * barHeight]);
							var y = function(d, i) { return yScale(i); };
							var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
							var x = d3.scale.linear().domain([0, d3.max(sortedData, barValue)]).range([0, maxBarWidth]);
							// svg container element
							var chart = d3.select('#chart').append("svg")
								.attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
								.attr('height', gridLabelHeight + gridChartOffset + sortedData.length * barHeight);
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
								.attr('id', barLabel)
								.attr('fill', 'steelblue')
								.on("mousedown", animateFirstStep);
							// bar value labels
							barsContainer.selectAll("text").data(sortedData).enter().append("text")
								.attr("x", function(d) { return x(barValue(d)); })
								.attr("y", yText)
								.attr("dx", 3) // padding-left
								.attr("dy", ".25em") // vertical-align: middle
								.attr("text-anchor", "start") // text-align: right
								.attr("fill", "black")
								.attr("stroke", "none")
								.text(function(d) { return d3.round(barValue(d), 2); });
							// start line
							barsContainer.append("line")
								.attr("y1", -gridChartOffset)
								.attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
								.style("stroke", "#000");

							function animateFirstStep(){ 
                d3.select(this)
                .transition()            
                .delay(0)            
                .duration(600)
                .attr("width", 20)
                .each("end", animateSecondStep);
                };
                
                function animateSecondStep(){ //brings the bar back to its original size!!
                d3.select(this)
                .transition()            
                .delay(0)            
                .duration(1000)
                .attr("width", function(d) { return x(barValue(d));});
                };

								});
}