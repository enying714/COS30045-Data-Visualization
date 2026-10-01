# Exercise 6 - Interactive D3 Visualisations

## Overview

This folder contains the completed COS30045 Exercise 6 website. It uses D3.js and the January 2026 Australian television energy-rating dataset to build an interactive histogram and scatterplot.

The visualisations are available on `exercise6.html` and follow the same responsive TV Energy design used throughout the website.

## Completed exercises

### Exercise 6.1 - Histogram

The histogram displays the frequency distribution of annual television energy consumption.

- Loads 4,233 television records from CSV.
- Uses 200 kWh/year energy-consumption bins.
- Includes labelled x and y axes.
- Animates the bars when the chart first loads.
- Provides hover details for each energy range.

### Exercise 6.2 - Histogram filters

Screen-technology controls allow users to filter the histogram.

- Includes All, LCD, LED and OLED filter buttons.
- Animates the bars when the selected technology changes.
- Dynamically rescales the frequency axis for smaller filtered datasets.
- Displays exact counts above non-empty filtered bars.
- Preserves the x-axis range to support comparison between technologies.

### Exercise 6.3 - Scatterplot

The scatterplot explores the relationship between television efficiency and energy use.

- Plots star rating on the x-axis.
- Plots annual energy consumption on the y-axis.
- Uses different colours for LCD, LED and OLED televisions.
- Includes an SVG legend and animated point entrance.
- Uses partial point opacity to make overlapping records easier to identify.

### Exercise 6.4 - Scatterplot tooltips

Interactive SVG tooltips provide details about individual televisions.

- Displays brand and model.
- Displays screen size and screen technology.
- Displays star rating and annual energy consumption.
- Highlights and enlarges the selected point.
- Repositions the tooltip near chart edges to keep it visible.

## Dataset

The visualisations use:

`data/Ex6_TVdata_withStar.csv`

Available fields include:

- `brand`
- `model`
- `screenSize`
- `screenTech`
- `star`
- `energyConsumption`

Source: [Energy Rating Data for Household Appliances - Televisions](https://data.gov.au/data/dataset/energy-rating-for-household-appliances), downloaded January 2026.

## Project structure

```text
Exercise 6/
|-- exercise6.html
|-- index.html
|-- televisions.html
|-- about.html
|-- README.md
|-- assets/
|   |-- css/
|   |   |-- style.css
|   |   `-- visualisation.css
|   |-- img/
|   |   `-- PowerIcon.png
|   `-- js/
|       |-- load-data.js
|       |-- shared-constants.js
|       |-- histogram.js
|       |-- scatterplot.js
|       |-- interactions.js
|       |-- nav.js
|       |-- calculator.js
|       `-- faq.js
`-- data/
    `-- Ex6_TVdata_withStar.csv
```

## JavaScript responsibilities

- `load-data.js` loads and converts the CSV data before drawing both charts.
- `shared-constants.js` stores chart dimensions, scales, bins, colours and filter state.
- `histogram.js` creates and updates the histogram.
- `scatterplot.js` creates the colour-coded scatterplot and legend.
- `interactions.js` manages histogram filters and chart tooltips.
- `nav.js`, `calculator.js` and `faq.js` support the surrounding multi-page website.

## Running the website

The CSV is loaded with `d3.csv()`, so the pages should be opened through a local web server instead of directly from the filesystem.

Using Visual Studio Code:

1. Open the repository.
2. Install the Live Server extension if required.
3. Right-click `Exercise 6/exercise6.html`.
4. Select **Open with Live Server**.

Alternatively, run the following command inside the `Exercise 6` folder:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/exercise6.html`.

## Technologies

- HTML5
- CSS3
- JavaScript
- D3.js version 7
- Git and GitHub
