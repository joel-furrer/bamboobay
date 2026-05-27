# BambooBay

Ein modernes, interaktives Webportal rund um Grosse Pandas, Rote Pandas und den globalen Naturschutz.

## Tech-Stack

- **Framework:** React 18 mit Vite
- **Sprache:** TypeScript (strikter Modus)
- **Runtime / Package Manager:** Bun
- **Styling:** Tailwind CSS mit Dark-Mode-Unterstützung
- **UI-Komponenten:** shadcn/ui (Radix UI primitives)
- **i18n:** react-i18next (Deutsch und Englisch)
- **Routing:** React Router v7

## Entwicklungsumgebung starten (NixOS)

```bash
# Nix-Shell aktivieren
nix-shell

# Abhängigkeiten installieren
bun install

# Entwicklungsserver starten (http://localhost:5173/bamboobay/)
bun run dev
```

## Befehle

| Befehl            | Beschreibung                             |
|-------------------|------------------------------------------|
| `bun install`     | Abhängigkeiten installieren              |
| `bun run dev`     | Lokaler Entwicklungsserver starten       |
| `bun run build`   | Produktions-Build in `./dist` erstellen  |
| `bun run preview` | Build lokal vorschauen                   |

## Ohne NixOS

Bun direkt installieren: https://bun.sh

```bash
bun install
bun run dev
```

## Deploy auf GitHub Pages

Der Workflow in `.github/workflows/deploy.yml` baut die App automatisch bei jedem Push auf den `main`-Branch und deployt sie auf GitHub Pages.

**Voraussetzungen:**
1. GitHub Pages in den Repository-Einstellungen aktivieren (Source: "GitHub Actions")
2. Den `base`-Pfad in `vite.config.ts` bei Bedarf anpassen (aktuell: `/bamboobay/`)

## Projektstruktur

```
src/
  components/
    layout/       Navbar, Footer
    ui/           shadcn/ui Komponenten
  locales/        de.json, en.json (Übersetzungen)
  pages/          Home, Encyclopedia, Calculator, Conservation, Legal
  i18n.ts         i18n Konfiguration
  App.tsx         Routing und Dark-Mode-State
  main.tsx        Einstiegspunkt
```

## Eigene Bilder einfügen

Alle Bild-Platzhalter sind als leere `div`-Elemente mit Tailwind-Hintergrundfarbe umgesetzt. Suche nach `bg-bamboo-100 dark:bg-bamboo-900` in den Seiten-Komponenten und ersetze sie durch `<img>`-Tags mit deinen eigenen Bildern.

## Lizenz

© Leroy [Nachname] - Alle Rechte vorbehalten.
