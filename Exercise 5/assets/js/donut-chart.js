// Exercise 5.3: donut chart showing TV model screen-size categories.

d3.csv("data/Data_exercise 5.3.csv", d => ({
  Screensize_Category: d.Screensize_Category,
  Count: +d.Count
})).then(data => {
  console.log("Exercise 5.3 data:", data);
  drawDonutChart(data);

  d3.select("#donut-chart-status")
    .text(`Loaded ${data.length} screen-size categories from the CSV.`);
}).catch(error => {
  console.error("Unable to load Exercise 5.3 data:", error);
  d3.select("#donut-chart-status")
    .text("Chart data could not be loaded. Open the page with Live Server and check the CSV path.");
});

const drawDonutChart = data => {
  const width = 1000;
  const height = 520;
  const radius = Math.min(width, height) / 2 - 35;
  const total = d3.sum(data, d => d.Count);

  // Use the established TV Energy colours rather than the sample colour scheme.
  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.Screensize_Category))
    .range(["#A0522D", "#D27D2D", "#F4BB44"]);

  // Preserve the meaningful large-medium-small order from the CSV.
  const pie = d3.pie()
    .value(d => d.Count)
    .sort(null);

  const arcGenerator = d3.arc()
    .innerRadius(radius * 0.58)
    .outerRadius(radius)
    .padAngle(0.025)
    .cornerRadius(8);

  const labelArc = d3.arc()
    .innerRadius(radius * 0.79)
    .outerRadius(radius * 0.79);

  const svg = d3.select("#donut-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-labelledby", "donut-chart-title donut-chart-description");

  svg.append("title")
    .attr("id", "donut-chart-title")
    .text("TV models by screen-size category");

  svg.append("desc")
    .attr("id", "donut-chart-description")
    .text("A donut chart comparing the number of large, medium and small TV models.");

  // Move the donut left to reserve space for the category legend.
  const donutCentreX = 330;
  const innerChart = svg.append("g")
    .attr("transform", `translate(${donutCentreX}, ${height / 2})`);

  const arcs = pie(data);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const slices = innerChart.selectAll(".donut-slice")
    .data(arcs)
    .join("path")
    .attr("class", "donut-slice")
    .attr("fill", d => color(d.data.Screensize_Category))
    .attr("stroke", "#FFFFFF")
    .attr("stroke-width", 3)
    .attr("tabindex", 0)
    .attr("aria-label", d => {
      const percentage = d.data.Count / total * 100;
      return `${d.data.Screensize_Category}: ${d.data.Count} models, ${percentage.toFixed(1)} percent`;
    });

  // Show exact values on hover and keyboard focus through native SVG tooltips.
  slices.append("title")
    .text(d => {
      const percentage = d.data.Count / total * 100;
      return `${d.data.Screensize_Category}: ${d.data.Count.toLocaleString()} models (${percentage.toFixed(1)}%)`;
    });

  if (reducedMotion) {
    slices.attr("d", arcGenerator);
  } else {
    slices
      .attr("d", d => arcGenerator({ ...d, endAngle: d.startAngle }))
      .transition()
      .duration(1000)
      .delay((d, i) => i * 140)
      .ease(d3.easeCubicOut)
      .attrTween("d", d => {
        const interpolate = d3.interpolate(d.startAngle, d.endAngle);
        return t => arcGenerator({ ...d, endAngle: interpolate(t) });
      });
  }

  // Put the category and percentage in the middle of each slice.
  innerChart.selectAll(".donut-label")
    .data(arcs)
    .join("text")
    .attr("class", "donut-label")
    .attr("transform", d => `translate(${labelArc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("fill", d => d.data.Screensize_Category === "small" ? "#3E2712" : "#FFFFFF")
    .attr("opacity", reducedMotion ? 1 : 0)
    .each(function(d) {
      const label = d3.select(this);
      label.append("tspan")
        .attr("x", 0)
        .attr("y", -3)
        .text(d.data.Screensize_Category);
      label.append("tspan")
        .attr("x", 0)
        .attr("dy", "1.25em")
        .text(`${(d.data.Count / total * 100).toFixed(1)}%`);
    })
    .transition()
    .duration(reducedMotion ? 0 : 350)
    .delay(reducedMotion ? 0 : 900)
    .attr("opacity", 1);

  innerChart.append("text")
    .attr("class", "donut-centre-total")
    .attr("y", -4)
    .text(total.toLocaleString());

  innerChart.append("text")
    .attr("class", "donut-centre-caption")
    .attr("y", 24)
    .text("TV models");

  // Place a colour key, count and percentage beside the donut.
  const legend = svg.append("g")
    .attr("class", "donut-legend")
    .attr("transform", "translate(640, 155)");

  legend.append("text")
    .attr("class", "donut-legend-title")
    .attr("x", 0)
    .attr("y", -28)
    .text("Screen-size category");

  const legendItem = legend.selectAll(".donut-legend-item")
    .data(data)
    .join("g")
    .attr("class", "donut-legend-item")
    .attr("transform", (d, i) => `translate(0, ${i * 76})`);

  legendItem.append("rect")
    .attr("width", 24)
    .attr("height", 24)
    .attr("rx", 5)
    .attr("fill", d => color(d.Screensize_Category));

  legendItem.append("text")
    .attr("class", "donut-legend-category")
    .attr("x", 38)
    .attr("y", 9)
    .text(d => d.Screensize_Category.charAt(0).toUpperCase() + d.Screensize_Category.slice(1));

  legendItem.append("text")
    .attr("class", "donut-legend-value")
    .attr("x", 38)
    .attr("y", 30)
    .text(d => `${d.Count.toLocaleString()} models · ${(d.Count / total * 100).toFixed(1)}%`);
};
