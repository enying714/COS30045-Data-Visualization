// Exercise 4.5 — bind CSV data to SVG rectangles and draw horizontal bars.
// index.html loads D3 first, then this file after the page elements exist.

// Create the SVG inside the empty container.
// viewBox defines drawing coordinates, not fixed on-screen pixel dimensions.
// The border makes the canvas boundary visible during this exercise.
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
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
    .text(`Loaded ${data.length} brands and drew ${data.length} bars. Inspect the SVG rectangles in Developer Tools to see their bound data and attributes.`);
}).catch(error => {
  console.error("Unable to load TV brand counts:", error);
  d3.select("#csv-status")
    .text("CSV loading failed. Open this page with Live Server and check data/tvBrandCount.csv.");
});

// Bind one row to each rectangle. Width uses the raw count for this exercise;
// scaling and visible labels are introduced in the following exercises.
function drawBarChart(data) {
  const barHeight = 20;
  const barSpacing = 5;

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => {
      console.log("Bound bar data:", d);
      return `bar bar-${d.count}`;
    })
    .attr("width", d => d.count)
    .attr("height", barHeight)
    .attr("fill", "blue")
    .attr("x", 0)
    // Index starts at zero: y becomes 0, 25, 50, ... with 5-unit gaps.
    .attr("y", (d, i) => i * (barHeight + barSpacing));
}
