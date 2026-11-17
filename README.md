# luizhmacedo.github.io

My portfolio site, live at [luizhmacedo.github.io](https://luizhmacedo.github.io). It's plain HTML,
CSS and JavaScript with no framework or build step, hosted on GitHub Pages. The charts on the home
page use Chart.js from a CDN.

## What's on it

- **Stock Analyst**: a Streamlit dashboard that scores a portfolio and emails a report every weekday.
  Code is in [quant-research-system](https://github.com/lUIZhMACEDO/quant-research-system).
- **Premier League injury risk**: a Tableau dashboard on injuries by position, age group and height,
  built from Transfermarkt injury histories.
- **Premier League database**: a SQL database of every match since 1992, with queries comparing home
  and away results.
- **Cheiro de Mãe**: a small product site I built, deployed on Vercel.
- **Soccer article**: an opinion piece I wrote on the 2022 World Cup.

## Layout

```
index.html              home page
about.html              background and skills
projects.html           all projects
stock-analyst.html      Stock Analyst writeup with the embedded app
injury-analytics.html   injury dashboard writeup
DBproject.html          SQL database writeup (charts in DBproject/)
soccerproject.html      soccer site concept (mockups in projects/soccerproject/)
soccer-article.html     the article, PDF in assets/docs/
contact.html            contact form (opens your mail app)
styles.css, script.js   shared styles and page behavior
```

## Run it locally

Clone the repo and open `index.html` in a browser. Some browsers block local files from loading
fonts and the PDF viewer, so a local server works better:

```bash
git clone https://github.com/lUIZhMACEDO/lUIZhMACEDO.github.io.git
cd lUIZhMACEDO.github.io
python -m http.server 8000
```

Then go to http://localhost:8000.

## Deploying

GitHub Pages serves the `main` branch automatically, so pushing to `main` updates the live site
within a minute or two.
