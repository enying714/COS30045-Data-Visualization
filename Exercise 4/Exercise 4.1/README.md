# Exercise 4.1 – SVG House and Garden

Open `index.html` for the original Home page, or choose **SVG Exercise** in the navigation to open `svg-exercise.html`. Home, Televisions, SVG Exercise and About Us are linked on every page. The coordinate diagrams and HTML tables appear below the house on the SVG Exercise page. Step 2 displays eight saved PNG images exported from the actual SVG scene with coordinate annotations. A 1000 × 700 clipping boundary preserves the original picture edges, including the garden path. The SVG sources remain available for editing.

This exercise demonstrates SVG primitives, coordinates, styling and grouping through a customised house-and-garden picture.

## SVG elements demonstrated

- `<rect>` – sky, grass, house, chimney, door and windows
- `<circle>` – sun, tree foliage, flowers and doorknob
- `<ellipse>` – clouds
- `<line>` – window dividers, fence and flower stems
- `<polyline>` – chimney cap
- `<polygon>` – roof
- `<path>` – curved garden path
- `<text>` – picture heading
- `<g>` – repeated windows and other shared styles

The two windows are placed in one `<g class="windows">` element. Shared fill and stroke styles are applied to the group, and `transform="translate(370 365)"` positions both windows together.

## Coordinate system

The main SVG uses `viewBox="0 0 1000 700"`. Coordinate `(0,0)` is at the top-left. The x-coordinate increases from left to right, while the y-coordinate increases from top to bottom. The webpage contains an annotated image and an HTML table linking shape attributes to positions in the drawing.

## Customisation

The supplied example inspired the subject only. The final picture changes the house colour and stroke, redraws the windows as a group, adds window panes, clouds, flowers, a fence, a chimney and a layered curved path, and repositions the text.

## Exercise 4.3 lecture practice

The practice section at the bottom of `index.html` now replaces Exercise 4.2. D3 v7 loads before the separate `js/main.js` file. The script appends an SVG with `viewBox="0 0 1200 1600"` and a black border inside `.responsive-svg-container`, then appends a blue rectangle at (10,10), width 414 and height 16. CSS centres the container and scales the SVG proportionally with the page width. No CSV is loaded at this setup stage. Open the page using VS Code Live Server; an internet connection is needed for the D3 CDN.

## AI declaration

ChatGPT/Codex also assisted with the Exercise 4.2 and 4.3 practice code and explanatory comments.

ChatGPT/Codex was used to assist with the SVG structure, coordinate annotations, HTML table and CSS. The suggestions were reviewed and customised by the author, who remains responsible for the submitted work.
