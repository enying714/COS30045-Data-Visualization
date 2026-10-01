function attachHistogramInteractions(bars) {
  const tooltip = d3.select('#histogram-tooltip');
  const card = document.querySelector('.chart-card');

  function showTooltip(event, bin) {
    const cardRect = card.getBoundingClientRect();
    const lower = d3.format(',')(bin.x0);
    const upper = d3.format(',')(bin.x1);

    tooltip
      .html(`<strong>${d3.format(',')(bin.length)} televisions</strong>${lower}–${upper} kWh/year`)
      .style('left', `${event.clientX - cardRect.left}px`)
      .style('top', `${event.clientY - cardRect.top}px`)
      .classed('visible', true)
      .attr('aria-hidden', 'false');
  }

  function hideTooltip() {
    tooltip.classed('visible', false).attr('aria-hidden', 'true');
  }

  bars
    .attr('tabindex', 0)
    .attr('role', 'graphics-symbol')
    .attr('aria-label', bin => `${bin.length} televisions from ${bin.x0} to ${bin.x1} kilowatt-hours per year`)
    .on('pointermove', showTooltip)
    .on('pointerleave', hideTooltip)
    .on('focus', function (event, bin) {
      const rect = this.getBoundingClientRect();
      showTooltip({ clientX: rect.left + rect.width / 2, clientY: rect.top }, bin);
    })
    .on('blur', hideTooltip);
}

function populateFilters(data) {
  function applyActiveFilters() {
    const activeTechnology = screenTechnologyFilters.find(filter => filter.isActive);
    const activeSize = screenSizeFilters.find(filter => filter.isActive);
    let updatedData = data;

    if (activeTechnology.id !== 'all') {
      updatedData = updatedData.filter(row => row.screenTech === activeTechnology.id);
    }

    if (activeSize.id !== 'all') {
      updatedData = updatedData.filter(row => row.screenSize === activeSize.value);
    }

    const activeLabels = [];
    if (activeTechnology.id !== 'all') activeLabels.push(activeTechnology.label);
    if (activeSize.id !== 'all') activeLabels.push(activeSize.label);

    updateHistogram(updatedData, activeLabels.length ? activeLabels.join(' · ') : 'All');
  }

  function buildFilterGroup(containerId, filterOptions) {
    const buttons = d3.select(containerId)
      .selectAll('button')
      .data(filterOptions)
      .join('button')
      .attr('type', 'button')
      .attr('class', 'filter')
      .classed('active', filter => filter.isActive)
      .attr('aria-pressed', filter => String(filter.isActive))
      .text(filter => filter.label);

    buttons.on('click', function (event, selectedFilter) {
      filterOptions.forEach(filter => {
        filter.isActive = filter.id === selectedFilter.id;
      });

      buttons
        .classed('active', filter => filter.isActive)
        .attr('aria-pressed', filter => String(filter.isActive));

      applyActiveFilters();
    });
  }

  buildFilterGroup('#filters_screen', screenTechnologyFilters);
  buildFilterGroup('#filters_size', screenSizeFilters);
}

function createTooltip() {
  const tooltip = innerChartS.append('g')
    .attr('class', 'scatter-tooltip')
    .attr('aria-hidden', 'true')
    .style('opacity', 0);

  tooltip.append('rect')
    .attr('width', scatterTooltipConfig.width)
    .attr('height', scatterTooltipConfig.height)
    .attr('rx', 12)
    .attr('ry', 12)
    .attr('fill', histogramConfig.barColour)
    .attr('fill-opacity', 0.94);

  const text = tooltip.append('text')
    .attr('x', scatterTooltipConfig.padding)
    .attr('y', 22);

  text.append('tspan')
    .attr('class', 'tooltip-title')
    .attr('x', scatterTooltipConfig.padding)
    .attr('data-tooltip-field', 'title');

  ['screen', 'technology', 'rating', 'energy'].forEach((field, index) => {
    text.append('tspan')
      .attr('x', scatterTooltipConfig.padding)
      .attr('dy', index === 0 ? 24 : 20)
      .attr('data-tooltip-field', field);
  });
}

function handleMouseEvents() {
  const tooltip = innerChartS.select('.scatter-tooltip');
  const config = scatterplotConfig;
  const tooltipConfig = scatterTooltipConfig;

  function showTooltip(event, row) {
    const point = d3.select(event.currentTarget);
    const pointX = Number(point.attr('cx'));
    const pointY = Number(point.attr('cy'));
    const placeOnLeft = pointX + tooltipConfig.width + tooltipConfig.gap > config.innerWidth;
    const placeBelow = pointY - tooltipConfig.height - tooltipConfig.gap < 0;
    const tooltipX = placeOnLeft
      ? pointX - tooltipConfig.width - tooltipConfig.gap
      : pointX + tooltipConfig.gap;
    const tooltipY = placeBelow
      ? pointY + tooltipConfig.gap
      : pointY - tooltipConfig.height - tooltipConfig.gap;
    const title = `${row.brand || 'Unknown brand'} ${row.model || ''}`.trim();

    tooltip.select('[data-tooltip-field="title"]')
      .text(title.length > 29 ? `${title.slice(0, 28)}…` : title);
    tooltip.select('[data-tooltip-field="screen"]')
      .text(`Screen size: ${d3.format('.0f')(row.screenSize)} inches`);
    tooltip.select('[data-tooltip-field="technology"]')
      .text(`Screen type: ${row.screenTech}`);
    tooltip.select('[data-tooltip-field="rating"]')
      .text(`Star rating: ${d3.format('.1f')(row.star)}`);
    tooltip.select('[data-tooltip-field="energy"]')
      .text(`Energy: ${d3.format(',')(row.energyConsumption)} kWh/year`);

    const tooltipColour = d3.color(colourScaleS(row.screenTech)).darker(1.15).formatHex();
    tooltip.select('rect').attr('fill', tooltipColour);
    tooltip
      .attr('transform', `translate(${tooltipX},${tooltipY})`)
      .attr('aria-hidden', 'false')
      .raise()
      .interrupt()
      .transition()
      .duration(160)
      .style('opacity', 1);

    innerChartS.selectAll('.scatter-point').classed('is-active', false);
    point.raise().classed('is-active', true);
  }

  function hideTooltip(event) {
    d3.select(event.currentTarget)
      .interrupt()
      .classed('is-active', false);

    tooltip
      .attr('aria-hidden', 'true')
      .interrupt()
      .transition()
      .duration(180)
      .style('opacity', 0);
  }

  innerChartS.selectAll('.scatter-point')
    .on('pointerenter', showTooltip)
    .on('pointerleave', hideTooltip);

  innerChartS.on('pointerleave.scatterplot-reset', function () {
    innerChartS.selectAll('.scatter-point').classed('is-active', false);
    tooltip
      .attr('aria-hidden', 'true')
      .interrupt()
      .transition()
      .duration(180)
      .style('opacity', 0);
  });
}
