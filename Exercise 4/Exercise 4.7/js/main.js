// Exercise 4.7 — group each bar with its brand and value labels.
// index.html loads D3 first, then this file after the page elements exist.

// Create the SVG inside the empty container.
// viewBox defines drawing coordinates, not fixed on-screen pixel dimensions.
// The border makes the canvas boundary visible during this exercise.
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 500 500")
  .attr("role", "img")
  .attr("aria-labelledby", "d3-canvas-title")
  .style("border", "1px solid black");

svg.append("title")
  .attr("id", "d3-canvas-title")
  .text("TV brand counts, sorted from largest to smallest");

// URLs are relative to index.html, not to this JavaScript file.
// The CSV headers are exactly 'brand' and 'count'. Unary + converts count
// from the CSV string into a number so comparisons and sorting are numeric.
d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count
  };
}).then(data => {
  // Inspect the typed rows and the summary values in the browser console.
  console.log("Loaded data:", data);
  console.log("Number of brands:", data.length);
  console.log("Maximum count:", d3.max(data, d => d.count));
  console.log("Minimum count:", d3.min(data, d => d.count));
  console.log("Count extent [min, max]:", d3.extent(data, d => d.count));

  // Descending order: brands with the largest counts come first.
  data.sort((a, b) => b.count - a.count);
  console.log("Sorted data (descending count):", data);

  // Call inside .then so drawing only begins once the CSV has loaded.
  drawBarChart(data);
  d3.select("#csv-status")
    .text(`Loaded ${data.length} brands and added a brand label and count value to every bar.`);
}).catch(error => {
  console.error("Unable to load TV brand counts:", error);
  d3.select("#csv-status")
    .text("CSV loading failed. Open this page with Live Server and check data/tvBrandCount.csv.");
});

// Bind one row to each group. Each group contains its bar, brand name and count.
function drawBarChart(data) {
  // Reserve room on the left for brand names and on the right for count labels.
  const margin = { left: 105, right: 28 };
  const chartWidth = 500 - margin.left - margin.right;

  // Map TV counts to widths that fit in the remaining chart area.
  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, chartWidth]);

  // Give every brand an equal horizontal band across the SVG height.
  // Padding creates a visible gap between neighbouring bars.
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 500])
    .padding(0.1);

  // Move each complete bar-and-label group to its position on the y-axis.
  const barAndLabel = svg
    .selectAll("g.bar-row")
    .data(data)
    .join("g")
    .attr("class", "bar-row")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Draw the rectangle at y = 0 because the parent group controls its y position.
  barAndLabel
    .append("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    .attr("x", margin.left)
    .attr("y", 0);

  // Right-align each brand name immediately before its bar.
  barAndLabel
    .append("text")
    .attr("class", "brand-label")
    .text(d => d.brand)
    .attr("x", margin.left - 8)
    .attr("y", yScale.bandwidth() / 2)
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .style("font-size", "10px");

  // Place the exact count just after the end of its bar.
  barAndLabel
    .append("text")
    .attr("class", "count-label")
    .text(d => d.count)
    .attr("x", d => margin.left + xScale(d.count) + 5)
    .attr("y", yScale.bandwidth() / 2)
    .attr("dominant-baseline", "middle")
    .style("font-size", "10px");
}
