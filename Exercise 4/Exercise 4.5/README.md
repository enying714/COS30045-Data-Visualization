# Exercise 4.5 – D3 Binding and Drawing with Data

## Aim

Bind the TV brand CSV records to SVG rectangles and draw a simple horizontal bar chart.

## Implementation

`index.html` loads D3 v7 and `js/main.js`. The script reads `data/tvBrandCount.csv`, converts `count` to a number, sorts the records in descending count order, and calls `drawBarChart(data)` inside `.then()`.

The chart function uses `.selectAll("rect").data(data).join("rect")` to create one rectangle per record. Each receives a class such as `bar bar-1096` and these attributes:

| Attribute | Value |
| --- | --- |
| Width | `d.count` |
| Height | `20` |
| Fill | `blue` |
| x | `0` |
| y | `i * (20 + 5)` |

The supplied dataset produces 25 bars. The longest is 1,096 units wide and the shortest is 24. The final bar starts at y=600 and ends at y=620. The remaining space in the 1200 × 1600 canvas is expected with the lecture dimensions.

Widths use raw counts at this stage. Scaling and visible labels are left for the following exercises. Counts represent records per brand, not electricity use or sales.

## Viewing the result

Open this folder's `index.html` with VS Code Live Server and scroll below the FAQ. Use Developer Tools → Elements to inspect the SVG rectangles and their classes and attributes. The console logs the numeric data, summary statistics and each bound row. Do not open through `file:///`, because the browser blocks CSV fetching. Internet access is needed for D3's CDN.

## AI Declaration

ChatGPT/Codex assisted with implementing the lecture's data join, bar attributes, code comments and documentation. The CSV was supplied by the student.
