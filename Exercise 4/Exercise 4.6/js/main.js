// Exercise 4.6 — use D3 scales to fit the bar chart inside its SVG canvas.
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
    .text(`Loaded ${data.length} brands. Linear and band scales keep all ${data.length} bars inside the 500 × 500 SVG canvas.`);
}).catch(error => {
  console.error("Unable to load TV brand counts:", error);
  d3.select("#csv-status")
    .text("CSV loading failed. Open this page with Live Server and check data/tvBrandCount.csv.");
});

// Bind one row to each rectangle. The linear scale converts counts into widths,
// while the band scale positions and sizes the categorical brand bars.
function drawBarChart(data) {
  // Map TV counts from the data domain to positions within the SVG width.
  // The 1100 upper domain leaves a small amount of room above the maximum count.
  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, 500]);

  // Give every brand an equal horizontal band across the SVG height.
  // Padding creates a visible gap between neighbouring bars.
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 500])
    .padding(0.1);

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => {
      console.log("Bound bar data:", d);
      return `bar bar-${d.count}`;
    })
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    .attr("x", 0)
    .attr("y", d => yScale(d.brand));
}
