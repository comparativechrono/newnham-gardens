# Newnham College Garden Collections

An interactive database of plant collections in [Newnham College](https://newn.cam.ac.uk/)'s Secret Gardens, Cambridge.

## About

This interactive tool catalogues the living plant collections across the college's garden areas, using hand-drawn maps with clickable zones. All plant data is stored in a single CSV file for easy editing. The app works as a Progressive Web App (PWA) — it can be installed on phones and works offline.

## Project structure

```
newnham-gardens/
├── index.html          # The application (all CSS/JS inline)
├── plants.csv          # ← THE DATABASE — edit this to update plants
├── manifest.json       # PWA manifest (app name, icons, colours)
├── sw.js               # Service worker (offline caching)
├── images/             # Hand-drawn garden maps
│   ├── roaslind_franklin_garden.png
│   ├── Four_seasons_garden.png
│   ├── Old_labs.png
│   ├── Cafe_courtyard_RFB.png
│   ├── formal_garden_yew_hedge.png
│   ├── mound_and_square.png
│   └── kennedy.png
├── icons/              # PWA app icons
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-192.png
│   └── icon-maskable-512.png
├── .nojekyll
└── README.md
```

## Installing as an app

Once deployed to GitHub Pages (or any HTTPS host):

**Android:** Open the site in Chrome → tap the three-dot menu → "Install app" or "Add to Home screen"

**iPhone/iPad:** Open in Safari → tap the Share button → "Add to Home Screen"

**Desktop Chrome/Edge:** Click the install icon in the address bar

The app will then work offline — the service worker caches all maps and data.

## Updating data after install

The service worker uses a **network-first** strategy for `plants.csv`, so edits are picked up on the next visit with a connection. To force a full cache refresh after major changes, bump `CACHE_VERSION` in `sw.js` (e.g. change `nc-gardens-v1` to `nc-gardens-v2`).

## Editing the plant data

Open **plants.csv** in Excel, Google Sheets, or any spreadsheet app. Each row is one plant in one location. The columns are:

| Column | What it does | Example |
|---|---|---|
| `garden_id` | Unique ID for the garden (lowercase, underscores) | `formal_garden` |
| `garden_name` | Display name | `Formal Garden & Yew Hedge` |
| `garden_subtitle` | Short description shown under the title | `South-facing formal beds with clipped yew` |
| `garden_image` | Path to the map image | `images/formal_garden_yew_hedge.png` |
| `hotspot_id` | Unique ID for the clickable zone | `fg1` |
| `hotspot_x` | Left edge of zone, as % of image width | `38` |
| `hotspot_y` | Top edge of zone, as % of image height | `30` |
| `hotspot_w` | Width of zone, as % of image width | `28` |
| `hotspot_h` | Height of zone, as % of image height | `50` |
| `hotspot_label` | Name shown on hover / in popup header | `Rose Parterre` |
| `hotspot_description` | Description shown in popup | `Formally arranged beds with...` |
| `common_name` | Plant common name | `David Austin Rose` |
| `latin_name` | Botanical name | `Rosa 'Gertrude Jekyll'` |
| `plant_type` | Category (drives icon & colour) | `shrub` |

### Plant types

Use one of: `tree`, `shrub`, `perennial`, `climber`, `bulb`, `hedge`

### Adding a plant to an existing zone

Add a new row. Copy the garden and hotspot columns from another row in the same zone — only change `common_name`, `latin_name`, and `plant_type`.

### Adding a new zone to an existing garden

Add rows with a new `hotspot_id` and set the x/y/w/h coordinates. Copy the garden columns from another row in the same garden.

### Adding a new garden

1. Put the map image in the `images/` folder
2. Add rows with a new `garden_id` and fill in all columns
3. The garden order in the sidebar matches the order gardens first appear in the CSV
4. Add the new image path to the `ASSETS_TO_CACHE` list in `sw.js` for offline support

### Working out hotspot coordinates

Open your map image in any image viewer, note the pixel coordinates of the area you want, then:
- `hotspot_x` = (left pixel ÷ image width) × 100
- `hotspot_y` = (top pixel ÷ image height) × 100
- `hotspot_w` = (zone width in pixels ÷ image width) × 100
- `hotspot_h` = (zone height in pixels ÷ image height) × 100

## Deployment

### GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Select **Deploy from a branch** → `main` / `/ (root)`
4. Site will be live at `https://YOUR-USERNAME.github.io/newnham-gardens/`

### Local preview

You need a local server (the CSV and service worker won't work from `file://`):

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Licence

Maps and content © Newnham College, Cambridge. All rights reserved.
