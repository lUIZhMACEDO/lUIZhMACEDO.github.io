# luizhmacedo.github.io

My portfolio site. Static HTML, CSS and vanilla JavaScript, served by GitHub Pages at
[luizhmacedo.github.io](https://luizhmacedo.github.io). Chart.js draws the charts on the homepage.

## Projects on the site

- **Stock Analyst** — a Streamlit dashboard that scores a portfolio and emails a daily report.
  Code: [quant-research-system](https://github.com/lUIZhMACEDO/quant-research-system)
- **Premier League injury risk** — a Tableau dashboard on injury patterns by position, age band and
  height, built from Transfermarkt injury histories
- **Premier League database** — a SQL database of every match since 1992, with functions for parsing
  results and comparing home and away performance
- **Cheiro de Mãe** — a small product site I built, deployed on Vercel
- **Soccer article** — an opinion piece on the 2022 World Cup

## Pages

```
index.html              home
about.html              background and skills
projects.html           project list
injury-analytics.html   Tableau dashboard writeup
DBproject.html          SQL database writeup
soccerproject.html      soccer site writeup
contact.html            contact
styles.css / script.js  shared styles and behavior
images/, projects/      assets
```

## Running it locally

No build step. Clone it and open `index.html`, or serve the folder:

```bash
python -m http.server 8000
```
