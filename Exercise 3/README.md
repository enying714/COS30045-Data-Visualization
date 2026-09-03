# Exercise 3 – TV Energy Consumption Data Story

## Data Story

### Audience

The primary audience is Australian household consumers who are comparing televisions and care about both purchase suitability and ongoing electricity use. They may understand an energy label but are unlikely to want a technical statistical analysis. A secondary audience is energy educators who need a simple example for explaining efficient purchasing.

The audience's most important question is: **Which TV choices are likely to use more energy each year?** Screen size is therefore introduced before display technology, because it produces the clearest and most actionable pattern.

### Audience interests

The audience wants to know:

- how average labelled annual energy consumption changes as screens become larger;
- whether LCD, LCD (LED), and OLED televisions show the same size pattern;
- how to interpret a missing category without mistaking it for zero; and
- what practical decision can reduce likely energy consumption.

### Visualisation story guidelines

- Lead with one consumer decision: choose an appropriate screen size.
- Use plain language and show `kWh/year` beside every energy measure.
- Begin quantitative bars at zero and show the group values directly.
- Move from the main pattern (size) to the nuance (technology).
- State sample sizes, category definitions, and missing combinations.
- Separate association from causation and standard label values from actual household bills.
- Finish with a realistic action rather than telling every reader to buy one technology.

### Story structure

The six-box storyboard on the website follows this sequence: introduce hidden running cost, demonstrate the size effect with Visualisation 1, explain the 4.7× difference, add technology detail with Visualisation 2, state interpretation limits, and recommend right-sizing first and comparing labels second.

## About the Data

### Data source

The supplied KNIME workflow contains `tv_2026_02_15.csv`, a snapshot of 4,724 television registration records. Its fields include brand, model, markets sold in, screen size, screen technology, standby and average-mode power, star rating, labelled annual energy consumption, availability, registration number, test standard, and regulatory standard. The records reference the Australian Energy Rating registration system and the *Greenhouse and Energy Minimum Standards (Televisions) Determination 2013*.

### Data processing

The KNIME workflow:

1. reads the source CSV and selects relevant columns;
2. cleans text values;
3. filters records by availability and Australian market where required;
4. converts screen size from centimetres to inches (`screensize / 2.54`);
5. rounds screen size for presentation;
6. classifies screens as small (≤43 inches), medium (44–65 inches), or large (>65 inches); and
7. aggregates labelled energy consumption using averages for the charts.

Visualisation 1 uses all 4,724 embedded records to show the average for each derived size group: small 158.0 kWh/year (n=1,158), medium 402.3 (n=2,179), and large 743.0 (n=1,387). Visualisation 2 is the supplied grouped KNIME chart comparing screen technology within those size categories.

### Privacy

The data describes registered television products, not people. It contains no names, household addresses, account information, or individual usage records. Product and company identifiers are public-facing attributes rather than personal information.

### Accuracy and limitations

- The data is a registration snapshot and may not represent every television currently sold or purchased.
- A record can be registered for multiple markets, and 14 of the 4,724 embedded records are marked unavailable.
- Averages can be influenced by the number and mix of models in each group; the charts do not prove screen size or technology alone causes a particular result.
- Labelled kWh/year is based on a regulatory test method. Actual household consumption varies with viewing time, brightness, picture settings, standby behaviour, and electricity supply.
- The custom size boundaries are analytical choices, not universal industry categories.
- No small OLED result appears in the grouped chart; absence should not be read as zero consumption.

### Ethics

The story uses a zero baseline, visible units, direct labels, category definitions, sample sizes, and limitations to reduce the risk of misleading comparisons. It avoids claiming that one technology is always efficient and does not turn regulatory estimates into promises about a household's bill. The recommendation asks shoppers to compare similarly sized models and their labels.

## AI Declaration

ChatGPT was used to inspect the supplied KNIME workflow, calculate summary values from its embedded dataset, help structure the six-box storyboard, draft explanatory text, and assist with the HTML and CSS implementation. The existing KNIME workflow also declares that ChatGPT assisted with the syntax and logic of the expression used to classify screen sizes. All generated material and calculated values should be reviewed by the student against the source workflow before submission, and responsibility for the final work remains with the student.

## Website

Open `data-story.html` in this folder to view the Exercise 3 story. The separate page contains two visualisations, with one six-box storyboard for each visualisation, plus contextual text and a practical conclusion. The original Exercise 0.2 television page remains separate in `televisions.html`. No KNIME workflow or additional folder was added to Exercise 3.
