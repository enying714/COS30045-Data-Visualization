d3.csv('data/Ex6_TVdata_withStar.csv', row => ({
  brand: row.brand,
  model: row.model,
  screenSize: +row.screenSize,
  screenTech: row.screenTech,
  star: +row.star,
  energyConsumption: +row.energyConsumption
}))
  .then(data => {
    const validData = data.filter(row =>
      Number.isFinite(row.energyConsumption) && Number.isFinite(row.star)
    );
    drawHistogram(validData);
    populateFilters(validData);
    drawScatterplot(validData);
    createTooltip();
    handleMouseEvents();
  })
  .catch(error => {
    console.error('Unable to load the Exercise 6 television data:', error);
    d3.select('#histogram-status')
      .text('The data could not be loaded. Run this page through a local web server.');
    d3.select('#scatterplot-status')
      .text('The data could not be loaded. Run this page through a local web server.');
  });
