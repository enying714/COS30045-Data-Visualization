# Exercise 5 – Multi-Chart Webpage

## Exercise 5.1: Vertical Bar Chart with Axes

The separate `exercise5.html` page includes a D3 vertical bar chart comparing mean annual energy consumption for 55-inch LCD, LED and OLED televisions. The chart:

- loads `data/Data_exercise 5.1.csv` from `assets/js/bar-chart.js`,
- converts energy consumption values to numbers,
- sorts the screen technologies from highest to lowest consumption,
- uses chart margins and an inner `<g>` container,
- uses a band scale for the x-axis and a linear scale for the y-axis,
- displays labelled x and y axes, and
- adds rounded energy values above each bar.
- animates the bars upward and fades in their values while respecting reduced-motion settings.

Open the website using Live Server so D3 can load the CSV through HTTP.

## Exercise 5.2: Scatter Plot and Line Chart

The same Exercise 5 page now includes a second D3 chart using `data/ARE_Spot_Prices.csv`. The chart:

- reads `Year` and `Average Price (notTas-Snowy)` as numbers,
- uses linear scales for both continuous variables,
- formats the x-axis years as integers,
- plots every annual value as a scatter point,
- uses `d3.line()` to connect the points,
- labels both axes, and
- animates the line and points while respecting reduced-motion settings.

## Exercise 5.3: Donut Chart

The third chart loads `data/Data_exercise 5.3.csv` and displays the proportions of small, medium and large TV models. It:

- converts `Count` values to numbers,
- preserves the CSV category order,
- uses `d3.scaleOrdinal()` with colours from the TV Energy theme,
- calculates slice angles with `d3.pie()`,
- generates donut paths with `d3.arc()`,
- places category and percentage labels inside the slices,
- shows the total number of models in the centre, and
- animates the arcs while respecting reduced-motion settings.

## Aim
Create a variety of different chart types using **D3.js**.

## Purpose
In previous exercises, we created simple charts such as a horizontal bar chart. In this exercise, you will extend your skills by building multiple chart types and presenting them on a webpage.

This activity focuses on using **D3 to visualise different types of data** and understanding when different charts are appropriate.

## Charts to Create

Using the provided **TV energy consumption dataset** (or your own dataset), your webpage must include the following chart types:

- **Scatter Plot**  
  Energy consumption vs star rating.

- **Donut Chart**  
  Energy consumption for different screen technologies across all TVs combined.

- **Bar Chart**  
  Energy consumption for different screen technologies for **55-inch TVs only**.

- **Line Chart**  
  Spot power prices from **1998 to 2024** (either plot the average or include a line for each state).

You may use the **provided datasets** or your **own dataset**, but your webpage must include **one example of each chart type**.

## Preparation

Before starting this exercise, it is recommended that you:

- Review this week's **lecture slides**
- Review **Chapter 4 and Chapter 5 of Dufour and Meeks (2024)**

## Instructions

Use the **forked repository that you created earlier for this unit**.

1. Open your existing **forked repository**.
2. Navigate to the **Exercise 5 folder**.
3. Add your code and files for this exercise inside that folder.
4. Build a webpage that displays the required charts using **D3.js**.
5. Commit and push your changes regularly to your GitHub repository.

## Submission

Your **forked repository** will serve as your submission.

Ensure that:
- All Exercise 5 files are inside the **Exercise 5 folder**
- Your code is pushed to GitHub
- Your repository link is submitted through the submission system.
