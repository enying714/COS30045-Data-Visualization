# Exercise 4.4 – Load Data from CSV

## Aim

Load TV brand counts from a CSV file using D3, convert values to the correct types, inspect summary statistics, and sort the data ready for a bar chart.

## Files

- `index.html` loads the D3 v7 library followed by `js/main.js`.
- `js/main.js` contains the CSV-loading and preparation code.
- `data/tvBrandCount.csv` contains the `brand` and `count` columns.
- `assets/css/style.css` styles the responsive SVG container.

## Data preparation

1. Load `data/tvBrandCount.csv` using `d3.csv()`. The URL is relative to `index.html`.
2. Keep `brand` as text and convert `count` to a number using `+d.count` in the row conversion function.
3. Log the loaded array, `data.length`, `d3.max()`, `d3.min()` and `d3.extent()` in the browser console.
4. Sort the array by descending count using `data.sort((a, b) => b.count - a.count)`.
5. Call `drawBarChart(data)` inside `.then()` after loading and sorting complete.

The drawing function is a placeholder for the next exercise. The empty bordered SVG canvas is expected at this stage; this exercise prepares the data rather than drawing the bars.

## Results

| Measure | Result |
| --- | --- |
| Number of brands | 25 |
| Maximum count | 1,096 |
| Minimum count | 24 |
| Extent | [24, 1096] |
| First brand after sorting | samsung (1,096) |

The supplied CSV differs from the lecture example, so its results are different from the example screenshots. Counts represent records in the supplied brand summary, not sales or energy consumption.

## Running the exercise

1. Open the repository in VS Code.
2. Right-click this folder's `index.html` and select **Open with Live Server**.
3. Scroll to the CSV-loading section below the FAQ.
4. Open **Developer Tools → Console** to inspect the arrays and summary values. Expand the sorted array to view individual brands and numeric counts.

Use the HTTP address opened by Live Server. Opening the HTML directly with a `file:///` URL blocks the CSV request because of browser security restrictions. An internet connection is required for the D3 CDN library.

## AI Declaration

ChatGPT/Codex assisted with the D3 loading code, explanatory comments, troubleshooting the local-file loading error, and this README. The CSV was supplied by the student. The browser console results were checked against the supplied data.
