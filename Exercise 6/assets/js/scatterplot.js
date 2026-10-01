function drawScatterplot(data) {
  const config = scatterplotConfig;
  const maximumStarRating = d3.max(data, row => row.star);
  const maximumEnergyConsumption = d3.max(data, row => row.energyConsumption);

  xScaleS
    .domain([0, maximumStarRating])
    .nice()
    .range([0, config.innerWidth]);

  yScaleS
    .domain([0, maximumEnergyConsumption])
    .nice()
    .range([config.innerHeight, 0]);

  const svg = d3.select('#scatterplot')
    .append('svg')
    .attr('viewBox', `0 0 ${config.width} ${config.height}`)
    .attr('role', 'img')
    .attr('aria-labelledby', 'scatterplot-svg-title scatterplot-svg-description');

  svg.append('title')
    .attr('id', 'scatterplot-svg-title')
    .text('Scatterplot of television energy consumption by star rating');

  svg.append('desc')
    .attr('id', 'scatterplot-svg-description')
    .text('Each point is a television. Point colour distinguishes LCD, LED and OLED screen technologies.');

  innerChartS = svg.append('g')
    .attr('class', 'scatterplot-inner-chart')
    .attr('transform', `translate(${config.margin.left},${config.margin.top})`);

  innerChartS.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${config.innerHeight})`)
    .call(d3.axisBottom(xScaleS).ticks(maximumStarRating).tickFormat(d3.format('.1f')));

  innerChartS.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(yScaleS).ticks(7).tickFormat(d3.format(',')));

  innerChartS.append('text')
    .attr('class', 'axis-label')
    .attr('x', config.innerWidth / 2)
    .attr('y', config.innerHeight + 58)
    .attr('text-anchor', 'middle')
    .text('Star rating');

  innerChartS.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -config.innerHeight / 2)
    .attr('y', -62)
    .attr('text-anchor', 'middle')
    .text('Annual energy consumption (kWh/year)');

  innerChartS.selectAll('.scatter-point')
    .data(data)
    .join('circle')
    .attr('class', 'scatter-point')
    .attr('r', 0)
    .attr('cx', row => xScaleS(row.star))
    .attr('cy', row => yScaleS(row.energyConsumption))
    .attr('fill', row => colourScaleS(row.screenTech))
    .transition()
    .duration(650)
    .ease(d3.easeCubicOut)
    .attr('r', config.pointRadius);

  const legend = svg.append('g')
    .attr('class', 'scatter-legend')
    .attr('transform', `translate(${config.width - config.margin.right + 24},${config.margin.top + 12})`);

  legend.append('text')
    .attr('class', 'scatter-legend-title')
    .attr('y', -12)
    .text('Screen type');

  const legendItems = legend.selectAll('.scatter-legend-item')
    .data(colourScaleS.domain())
    .join('g')
    .attr('class', 'scatter-legend-item')
    .attr('transform', (category, index) => `translate(0,${index * 28})`);

  legendItems.append('rect')
    .attr('width', 16)
    .attr('height', 16)
    .attr('rx', 4)
    .attr('fill', category => colourScaleS(category));

  legendItems.append('text')
    .attr('x', 24)
    .attr('y', 12)
    .text(category => category);

  d3.select('#scatterplot-status')
    .text(`${d3.format(',')(data.length)} televisions plotted by star rating and energy consumption`);
}
