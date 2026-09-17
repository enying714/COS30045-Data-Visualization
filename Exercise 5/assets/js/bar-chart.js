// Exercise 5.1: vertical bar chart with labelled x and y axes.

// Load the CSV and convert the energy column from text to a number.
d3.csv("data/Data_exercise 5.1.csv", d => ({
  Screen_Tech: d.Screen_Tech,
  Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
  console.log("Exercise 5.1 data:", data);

  // Show the screen technologies from highest to lowest consumption.
  data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
  drawBarChart(data);

  d3.select("#bar-chart-status")
    .text(`Loaded ${data.length} screen technologies from the CSV.`);
}).catch(error => {
  console.error("Unable to load Exercise 5.1 data:", error);
  d3.select("#bar-chart-status")
    .text("Chart data could not be loaded. Open the page with Live Server and check the CSV path.");
});

const drawBarChart = data => {
  // Margins reserve room for the axes, title and value labels.
  const margin = { top: 55, right: 35, bottom: 65, left: 75 };
  const width = 1000;
  const height = 600;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-labelledby", "bar-chart-title bar-chart-description");

  svg.append("title")
    .attr("id", "bar-chart-title")
    .text("Mean annual energy consumption by television screen technology");

  svg.append("desc")
    .attr("id", "bar-chart-description")
    .text("LED has the highest mean energy consumption, followed by OLED and LCD.");

  // All chart elements use coordinates relative to this inner group.
  const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, innerWidth])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Energy_Consumption)])
    .nice()
    .range([innerHeight, 0]);

  const bottomAxis = d3.axisBottom(xScale)
    .tickSizeOuter(0)
    .tickFormat(value => value.toUpperCase());

  const leftAxis = d3.axisLeft(yScale)
    .ticks(8)
    .tickSizeOuter(0);

  innerChart.append("g")
    .attr("class", "bar-chart-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  innerChart.append("g")
    .attr("class", "bar-chart-axis")
    .call(leftAxis);

  // Horizontal y-axis label positioned above the plotting area.
  innerChart.append("text")
    .attr("class", "bar-axis-label")
    .text("Energy Consumption (kWh/year)")
    .attr("x", -margin.left + 5)
    .attr("y", -20)
    .attr("text-anchor", "start");

  // Respect the visitor's operating-system motion preference.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animationDuration = reducedMotion ? 0 : 900;

  // Start each bar at the baseline, then animate it upward to its data value.
  innerChart.selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.Screen_Tech))
    .attr("y", innerHeight)
    .attr("width", xScale.bandwidth())
    .attr("height", 0)
    .attr("fill", "#D27D2D")
    .transition()
    .duration(animationDuration)
    .delay((d, i) => reducedMotion ? 0 : i * 140)
    .ease(d3.easeCubicOut)
    .attr("y", d => yScale(d.Energy_Consumption))
    .attr("height", d => innerHeight - yScale(d.Energy_Consumption));

  // Rounded values make the precise comparison visible above each bar.
  innerChart.selectAll(".bar-value")
    .data(data)
    .join("text")
    .attr("class", "bar-value")
    .text(d => `${Math.round(d.Energy_Consumption)} kWh`)
    .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.Energy_Consumption) - 9)
    .attr("text-anchor", "middle")
    .attr("opacity", reducedMotion ? 1 : 0)
    .transition()
    .duration(reducedMotion ? 0 : 350)
    .delay((d, i) => reducedMotion ? 0 : 550 + i * 140)
    .attr("opacity", 1);
};
