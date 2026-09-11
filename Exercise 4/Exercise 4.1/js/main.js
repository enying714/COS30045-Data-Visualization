// Exercise 4.3 — prepare a responsive D3 canvas.
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
  .text("Exercise 4.3: a thin blue rectangle near the top-left of the SVG canvas");

// Add the lecture's test rectangle using hard-coded attributes.
// CSV data will determine rectangle attributes in a later exercise.
svg
  .append("rect")
  .attr("x", 10)
  .attr("y", 10)
  .attr("width", 414)
  .attr("height", 16)
  .attr("fill", "blue");
