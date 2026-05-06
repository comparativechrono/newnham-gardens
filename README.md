# Newnham College Garden Collections

An interactive database of plant collections in [Newnham College](https://newn.cam.ac.uk/)'s Secret Gardens, Cambridge.

## About

Newnham College is renowned for having some of the most beautiful gardens in Cambridge. This interactive tool catalogues the living plant collections across seven distinct garden areas, using hand-drawn maps with clickable zones to help visitors, students, and staff identify and locate species.

### Features

- **Interactive garden maps** — switch between seven hand-drawn maps and click highlighted regions to view plantings
- **Plant directory** — searchable, filterable listing of all recorded species
- **Cross-navigation** — click any plant in the directory to jump to its location on the map

### Garden areas

1. Rosalind Franklin Garden
2. Four Seasons Garden
3. Old Labs Garden
4. Café Courtyard
5. Formal Garden & Yew Hedge
6. Mound & Square
7. Kennedy Garden

## Deployment

This is a static site — just HTML, CSS, and vanilla JavaScript. No build step required.

### GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **Deploy from a branch**
4. Select `main` branch, `/ (root)` folder
5. Click **Save**

Your site will be live at `https://YOUR-USERNAME.github.io/newnham-gardens/`

### Local preview

Open `index.html` in a browser, or use a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
newnham-gardens/
├── index.html          # Single-page app (all CSS/JS inline)
├── images/             # Hand-drawn garden maps
│   ├── roaslind_franklin_garden.png
│   ├── Four_seasons_garden.png
│   ├── Old_labs.png
│   ├── Cafe_courtyard_RFB.png
│   ├── formal_garden_yew_hedge.png
│   ├── mound_and_square.png
│   └── kennedy.png
└── README.md
```

## Status

> ⚙️ **Prototype** — Contains mock plant data for demonstration. Real planting data will be integrated following stakeholder review and garden survey.

## Adding real data

Plant data lives in the `const gardens = [...]` JavaScript array inside `index.html`. Each garden contains hotspot regions, and each hotspot has a plants array. Each plant needs:

- `common` — Common name
- `latin` — Botanical name
- `type` — One of: `tree`, `shrub`, `perennial`, `climber`, `bulb`, `hedge`

Hotspot coordinates (`x`, `y`, `w`, `h`) are percentages of the map image dimensions.

## Licence

Maps and content © Newnham College, Cambridge. All rights reserved.
