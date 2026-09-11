# Exercise 4.6: Scaling Charts

## Aim

Use D3 scales to make the TV brand bar chart fit within a responsive SVG canvas.

## Implementation

- Loads `data/tvBrandCount.csv` with `d3.csv()`.
- Converts each `count` value from text to a number.
- Sorts the TV brands from highest to lowest count.
- Uses `d3.scaleLinear()` to map counts from a domain of 0–1100 to a bar-width range of 0–500.
- Uses `d3.scaleBand()` to position the brand categories within a height of 500.
- Adds band padding to create consistent gaps between bars.
- Uses a `500 × 500` SVG `viewBox` so the chart scales with its container.

The chart intentionally does not include labels yet because labels are introduced in the next exercise.

## Running the page

Open the Exercise 4.6 folder with VS Code Live Server. The CSV must be loaded through an `http://` address rather than by opening `index.html` as a `file://` URL.

## AI Declaration

Generative AI was used to assist with adapting the Exercise 4.5 D3 code for linear and band scales, adding explanatory comments, and updating this README. The code was reviewed and tested by the author.
