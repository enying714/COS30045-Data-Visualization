function drawHistogram(data) {
  const config = histogramConfig;
  const bins = histogramBinGenerator(data);

  histogramXScale
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .range([0, config.innerWidth]);

  histogramYScale
    .domain([0, d3.max(bins, bin => bin.length)])
    .nice()
    .range([config.innerHeight, 0]);

  const svg = d3.select('#histogram')
    .append('svg')
    .attr('viewBox', `0 0 ${config.width} ${config.height}`)
    .attr('role', 'img')
    .attr('aria-labelledby', 'histogram-svg-title histogram-svg-description');

  svg.append('title')
    .attr('id', 'histogram-svg-title')
    .text('Histogram of television annual energy consumption');

  svg.append('desc')
    .attr('id', 'histogram-svg-description')
    .text('Bars show the number of televisions in each 200 kilowatt-hour annual energy-consumption interval.');

  const innerChart = svg.append('g')
    .attr('class', 'histogram-inner-chart')
    .attr('transform', `translate(${config.margin.left},${config.margin.top})`);

  innerChart.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${config.innerHeight})`)
    .call(d3.axisBottom(histogramXScale).ticks(10).tickFormat(d3.format(',')));

  innerChart.append('g')
    .attr('class', 'axis histogram-y-axis')
    .call(d3.axisLeft(histogramYScale).ticks(6).tickFormat(d3.format('d')));

  innerChart.append('text')
    .attr('class', 'axis-label')
    .attr('x', config.innerWidth / 2)
    .attr('y', config.innerHeight + 58)
    .attr('text-anchor', 'middle')
    .text('Annual energy consumption (kWh/year)');

  innerChart.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -config.innerHeight / 2)
    .attr('y', -54)
    .attr('text-anchor', 'middle')
    .text('Number of televisions');

  updateHistogram(data, 'All', true);
}

function updateHistogram(data, filterLabel, isInitialDraw = false) {
  const config = histogramConfig;
  const bins = histogramBinGenerator(data);
  const innerChart = d3.select('.histogram-inner-chart');
  const maximumBinCount = d3.max(bins, bin => bin.length) || 1;
  const labelHeadroom = Math.max(1, Math.ceil(maximumBinCount * 0.14));
  const duration = isInitialDraw ? 800 : 600;

  histogramYScale
    .domain([0, maximumBinCount + labelHeadroom])
    .nice();

  const chartTransition = d3.transition()
    .duration(duration)
    .ease(d3.easeCubicOut);

  innerChart.select('.histogram-y-axis')
    .transition(chartTransition)
    .call(d3.axisLeft(histogramYScale)
      .ticks(Math.min(6, maximumBinCount))
      .tickFormat(d3.format('d')));

  const bars = innerChart.selectAll('.histogram-bar')
    .data(bins, bin => bin.x0)
    .join(
      enter => enter.append('rect')
        .attr('class', 'histogram-bar')
        .attr('x', bin => histogramXScale(bin.x0))
        .attr('width', bin => Math.max(0, histogramXScale(bin.x1) - histogramXScale(bin.x0)))
        .attr('y', config.innerHeight)
        .attr('height', 0),
      update => update,
      exit => exit.remove()
    );

  bars.interrupt()
    .transition(chartTransition)
    .delay(isInitialDraw ? (bin, index) => index * 35 : 0)
    .attr('x', bin => histogramXScale(bin.x0))
    .attr('width', bin => Math.max(0, histogramXScale(bin.x1) - histogramXScale(bin.x0)))
    .attr('y', bin => bin.length > 0
      ? Math.min(histogramYScale(bin.length), config.innerHeight - 3)
      : config.innerHeight)
    .attr('height', bin => bin.length > 0
      ? Math.max(3, config.innerHeight - histogramYScale(bin.length))
      : 0);

  const labelledBins = filterLabel === 'All'
    ? []
    : bins.filter(bin => bin.length > 0);

  innerChart.selectAll('.histogram-count-label')
    .data(labelledBins, bin => bin.x0)
    .join(
      enter => enter.append('text')
        .attr('class', 'histogram-count-label')
        .attr('text-anchor', 'middle')
        .attr('x', bin => (histogramXScale(bin.x0) + histogramXScale(bin.x1)) / 2)
        .attr('y', config.innerHeight - 6)
        .attr('opacity', 0)
        .text(bin => d3.format(',')(bin.length))
        .call(selection => selection.transition(chartTransition)
          .attr('y', bin => Math.max(14, histogramYScale(bin.length) - 7))
          .attr('opacity', 1)),
      update => update
        .text(bin => d3.format(',')(bin.length))
        .call(selection => selection.transition(chartTransition)
          .attr('x', bin => (histogramXScale(bin.x0) + histogramXScale(bin.x1)) / 2)
          .attr('y', bin => Math.max(14, histogramYScale(bin.length) - 7))
          .attr('opacity', 1)),
      exit => exit.transition(chartTransition).attr('opacity', 0).remove()
    );

  innerChart.selectAll('.histogram-empty-state')
    .data(data.length === 0 ? [filterLabel] : [])
    .join('text')
    .attr('class', 'histogram-empty-state')
    .attr('x', config.innerWidth / 2)
    .attr('y', config.innerHeight / 2)
    .attr('text-anchor', 'middle')
    .text(label => `No televisions match ${label}`);

  attachHistogramInteractions(bars);

  d3.select('#histogram-status')
    .text(`${d3.format(',')(data.length)} television records · ${filterLabel} · 200 kWh/year bins`);
}
