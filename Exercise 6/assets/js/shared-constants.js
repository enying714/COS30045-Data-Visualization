// Shared chart settings are kept separate so Exercise 6.2 filters can reuse them.
const histogramConfig = {
  width: 1000,
  height: 520,
  margin: { top: 26, right: 28, bottom: 78, left: 76 },
  binSize: 200,
  barColour: '#D27D2D'
};

histogramConfig.innerWidth = histogramConfig.width
  - histogramConfig.margin.left
  - histogramConfig.margin.right;
histogramConfig.innerHeight = histogramConfig.height
  - histogramConfig.margin.top
  - histogramConfig.margin.bottom;

const histogramXScale = d3.scaleLinear();
const histogramYScale = d3.scaleLinear();

const histogramBinGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .domain([0, 2800])
  .thresholds(d3.range(0, 2801, histogramConfig.binSize));

const screenTechnologyFilters = [
  { id: 'all', label: 'All', isActive: true },
  { id: 'LCD', label: 'LCD', isActive: false },
  { id: 'LED', label: 'LED', isActive: false },
  { id: 'OLED', label: 'OLED', isActive: false }
];

const scatterplotConfig = {
  width: 1000,
  height: 560,
  margin: { top: 34, right: 150, bottom: 78, left: 86 },
  pointRadius: 4
};

scatterplotConfig.innerWidth = scatterplotConfig.width
  - scatterplotConfig.margin.left
  - scatterplotConfig.margin.right;
scatterplotConfig.innerHeight = scatterplotConfig.height
  - scatterplotConfig.margin.top
  - scatterplotConfig.margin.bottom;

const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colourScaleS = d3.scaleOrdinal()
  .domain(['LCD', 'LED', 'OLED'])
  .range(['#A0522D', '#D27D2D', '#F4BB44']);

const scatterTooltipConfig = {
  width: 238,
  height: 122,
  gap: 14,
  padding: 14
};

let innerChartS;
