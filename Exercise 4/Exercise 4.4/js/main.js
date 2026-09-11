// CSV loading practice, continued in the Exercise 4.3 folder.
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
  .text("Responsive canvas prepared for the TV brand bar chart");

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
    .text(`Loaded ${data.length} brands. Open the browser console to inspect the sorted data and summary values.`);
}).catch(error => {
  console.error("Unable to load TV brand counts:", error);
  d3.select("#csv-status")
    .text("CSV loading failed. Open this page with Live Server and check data/tvBrandCount.csv.");
});

// Placeholder for the next exercise: receives the sorted, typed data.
// The data-binding and bars will be added in that exercise.
function drawBarChart(data) {
  console.log("Data ready for drawBarChart:", data);
}
