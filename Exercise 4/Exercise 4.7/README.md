# Exercise 4.7: Adding Labels

## Aim

Add category and value labels to the scaled D3 bar chart.

## Implementation

- Loads `data/tvBrandCount.csv` with `d3.csv()`.
- Converts each `count` value from text to a number.
- Sorts the TV brands from highest to lowest count.
- Uses `d3.scaleLinear()` to map counts into the available chart width.
- Uses `d3.scaleBand()` to position the brand categories within a height of 500.
- Adds band padding to create consistent gaps between bars.
- Uses a `500 × 500` SVG `viewBox` so the chart scales with its container.
- Reserves space at the left of the chart for brand labels.
- Joins each data row to a `<g>` element so its rectangle and labels move together.
- Places the brand name before each bar and the exact count after it.

The completed chart displays all 25 brands in descending order with both category and value labels.

## Running the page

Open the Exercise 4.7 folder with VS Code Live Server. The CSV must be loaded through an `http://` address rather than by opening `index.html` as a `file://` URL.

## AI Declaration

Generative AI was used to assist with adapting the Exercise 4.6 chart to group bars and labels, position the text, add explanatory comments, and update this README. The code was reviewed and tested by the author.
