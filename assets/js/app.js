/**
 * Data Journalism and D3
 * Henry Poe
 * Last edited 06/20/2021
 */

// Define SVG area dimensions
var svgWidth = 1150;
var svgHeight = 700;

// Define the chart's margins as an object
var chartMargin = {
  top: 10,
  right: 10,
  bottom: 50,
  left: 50
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Add the svg object to the page
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Load data from csv
d3.csv("assets/data/data.csv").then(function(data) {
    // Print the Data
    console.log(data);

    // Add X axis (Percent in Poverty)
    var x = d3.scaleLinear()
        .domain([8, 23])
        .range([ 0, chartWidth ]);
    chartGroup.append("g")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(x));

    // Add Y axis (Percent without healthcare)
    var y = d3.scaleLinear()
        .domain([4, 26])
        .range([ chartHeight, 0]);
    chartGroup.append("g")
        .call(d3.axisLeft(y));
    
    // Add Points and Labels
    chartEnter = chartGroup.append("g")
        .selectAll("point")
        .data(data)
        .enter()
    chartEnter.append("circle")
        .attr("cx", d => x(d.poverty))
        .attr("cy", d => y(d.healthcare))
        .attr("r", 15)
        .style("fill", "#69b3a2")
    chartEnter.append("text")
        .attr("x", d => x(d.poverty))
        .attr("y", d => y(d.healthcare))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(d => d.abbr)

    // Add axis Labels
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", svgWidth/2)
        .attr("y", svgHeight - 16)
        .text("In Poverty (%)");
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", chartMargin.left/2)
        .attr("x", 0 - svgHeight/2)
        .style("text-anchor", "middle")
        .text("Lacks Healthcare (%)");
});
