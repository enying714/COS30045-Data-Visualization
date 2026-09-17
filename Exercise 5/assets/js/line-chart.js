// Exercise 5.2: scatter plot and line chart with continuous x and y scales.

// Read the exact CSV headers and convert both selected columns to numbers.
d3.csv("data/ARE_Spot_Prices.csv", d => ({
  year: +d.Year,
  averagePrice: +d["Average Price (notTas-Snowy)"]
})).then(data => {
  console.log("Exercise 5.2 data:", data);

  // Ensure the points are connected in chronological order.
  data.sort((a, b) => a.year - b.year);
  drawLineChart(data);

  d3.select("#line-chart-status")
    .text(`Loaded ${data.length} annual average prices from the CSV.`);
}).catch(error => {
  console.error("Unable to load Exercise 5.2 data:", error);
  d3.select("#line-chart-status")
    .text("Chart data could not be loaded. Open the page with Live Server and check the CSV path.");
});

const drawLineChart = data => {
  // Match Exercise 5.1 so both charts have the same overall dimensions.
  const margin = { top: 55, right: 35, bottom: 65, left: 75 };
  const width = 1000;
  const height = 600;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-labelledby", "line-chart-title line-chart-description");

  svg.append("title")
    .attr("id", "line-chart-title")
    .text("Average Australian electricity spot price from 1998 to 2024");

  svg.append("desc")
    .attr("id", "line-chart-description")
    .text("A scatter plot and connecting line showing annual average prices in dollars per megawatt hour.");

  const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrice)])
    .nice()
    .range([innerHeight, 0]);

  const bottomAxis = d3.axisBottom(xScale)
    .ticks(13)
    .tickFormat(d3.format("d"));

  const leftAxis = d3.axisLeft(yScale)
    .ticks(8)
    .tickSizeOuter(0);

  // Light horizontal guides make values easier to compare with the y-axis.
  innerChart.append("g")
    .attr("class", "line-chart-grid")
    .call(d3.axisLeft(yScale).ticks(8).tickSize(-innerWidth).tickFormat(""));

  innerChart.append("g")
    .attr("class", "line-chart-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  innerChart.append("g")
    .attr("class", "line-chart-axis")
    .call(leftAxis);

  innerChart.append("text")
    .attr("class", "line-axis-label")
    .text("Average Price ($ per MWh)")
    .attr("x", -margin.left + 5)
    .attr("y", -20)
    .attr("text-anchor", "start");

  innerChart.append("text")
    .attr("class", "line-axis-label")
    .text("Year")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 52)
    .attr("text-anchor", "middle");

  const lineGenerator = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.averagePrice));

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Draw the connecting line first so the scatter points remain visible above it.
  const line = innerChart.append("path")
    .datum(data)
    .attr("class", "price-line")
    .attr("d", lineGenerator);

  if (!reducedMotion) {
    const lineLength = line.node().getTotalLength();
    line
      .attr("stroke-dasharray", `${lineLength} ${lineLength}`)
      .attr("stroke-dashoffset", lineLength)
      .transition()
      .duration(1400)
      .ease(d3.easeCubicOut)
      .attr("stroke-dashoffset", 0);
  }

  const points = innerChart.selectAll(".price-point")
    .data(data)
    .join("circle")
    .attr("class", "price-point")
    .attr("r", 5)
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.averagePrice))
    .attr("tabindex", 0)
    .attr("aria-label", d => `${d.year}: $${d.averagePrice.toFixed(2)} per megawatt hour`)
    .attr("opacity", reducedMotion ? 1 : 0);

  // A native SVG title displays the exact amount when a point is hovered.
  points.append("title")
    .text(d => `${d.year}: $${d.averagePrice.toFixed(2)} per MWh`);

  points
    .transition()
    .duration(reducedMotion ? 0 : 300)
    .delay((d, i) => reducedMotion ? 0 : 250 + i * 35)
    .attr("opacity", 1);
};
