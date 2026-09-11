# Exercise 4.3

CSV loading lecture practice is implemented here as requested, following the supplied Exercise 4.4 instructions.

Open `index.html` with VS Code Live Server. The section below the FAQ shows loading status; use F12 → Console to see the data and summaries. D3 requires internet access for the CDN library.

`js/main.js` loads `data/tvBrandCount.csv` relative to the HTML page, converts `count` with unary `+`, logs length, maximum, minimum and extent, sorts by descending count, and passes the result to `drawBarChart(data)` inside `.then`. The drawing function is a placeholder for the next exercise; an empty bordered canvas is expected.

The supplied CSV has 25 brands, minimum count 24 and maximum count 1096. Samsung is first after sorting. These values differ from the lecture screenshots because the supplied data is different.

AI acknowledgement: ChatGPT/Codex assisted with the CSV-loading code, comments and documentation. The CSV was supplied by the student.
