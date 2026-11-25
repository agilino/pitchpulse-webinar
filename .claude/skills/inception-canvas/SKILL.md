---
name: inception-canvas
description: Fill the arc42 Architecture Inception Canvas (draw.io) for a new idea or product. Use when the user wants to capture a new idea, an MVP or a startup concept on the canvas, or says "inception canvas" or "architecture canvas".
---

# Inception Canvas für neue Ideen

Neue Ideen landen auf dem arc42 **Architecture Inception Canvas**. Das arc42 Communication Canvas ist für bestehende Systeme gedacht und nicht der Standard.

## Vorlage

- Datei: `.claude/skills/inception-canvas/arc42-architecture-inception-canvas.drawio` (Quelle: https://canvas.arc42.org/downloads)
- **Nie die ganze Datei lesen.** Sie hat etwa 110.000 Tokens, weil zwei base64-Logos eingebettet sind. Nur mit Grep gezielt Zellen suchen.
- Die arc42-Logos und die Lizenzzeile bleiben drin. Sie sind die Attribution, die CC BY-SA 4.0 verlangt.

## Vorgehen

1. **Input sammeln:** Ergebnisse aus Brainstorm, Party-Runde, UX-Discovery und Example Mapping (`docs/SPEC.md`).
2. **Fragen:** Vor dem Füllen höchstens vier Fragen in einem einzigen AskUserQuestion-Dialog stellen, nur für die Felder mit der grössten Lücke (meist Quality Goals, dann Constraints und Risiken). Jede Frage hat zwei bis drei Optionen mit konkreter Zahl oder konkretem Beispiel, die Empfehlung zuerst, etwa „Wie schnell muss ein Vote bei allen sichtbar sein? 2 s (empfohlen) / 5 s / beim nächsten Neuladen“. Zahlen und Grenzen sind Geschäftsentscheidungen: nie still selbst festlegen. Was danach offen bleibt, als Frage mit „?“ eintragen statt etwas zu erfinden.
3. **Skript anpassen:** `fill_aic.py` aus diesem Skill-Ordner kopieren und nur die Inhalte ändern. Das Skript ändert ausschließlich Textzellen anhand ihrer IDs und fügt neue Formen hinzu.
4. **Ausführen:** `python -I <skript> .claude/skills/inception-canvas/arc42-architecture-inception-canvas.drawio docs/<idee>-aic.drawio`
5. **Zeigen:** Ist der draw.io MCP verfügbar, mit `open_drawio_xml` öffnen. Sonst öffnet die Person die Datei in draw.io.

## Felder und Zell-IDs

| Feld | Zell-ID | Inhalt |
| --- | --- | --- |
| Business Case | eigener Textblock rechts im Feld (x -1450, y 270) | 1–2 Sätze: Problem, Lösung, für wen |
| Functional Overview | `704` | 3–5 Kernfunktionen |
| Quality Goals | `bHtJGvRWZrA99JSl9f75-732` | genau 3 Ziele, jeweils messbar |
| Business Context | eigene Formen im Feld (x -1710 bis -690, y 400 bis 1170) | siehe unten |
| Organisational Constraints | `UtoSL-II8o-O6hTiVBF9-726` | 2–4 Punkte |
| Technical Constraints | `UtoSL-II8o-O6hTiVBF9-727` | 2–4 Punkte |
| Architectural Hypotheses | `bHtJGvRWZrA99JSl9f75-730` | 2–3 Annahmen, die wir testen |
| Technical Challenges & Risks | `UtoSL-II8o-O6hTiVBF9-728` | 2–3 Risiken, jeweils mit Gegenmaßnahme |
| Kopf: System / Created by / Created for / Date | `…-766` / `…-769` / `…-771` / `…-773` (Präfix `bHtJGvRWZrA99JSl9f75-`) | kurz |

## Business Context

- Das System steht als Black Box in der Mitte. Darum herum stehen die Kommunikationspartner, also Nutzergruppen und Nachbarsysteme, verbunden durch beschriftete Pfeile mit dem, was fließt.
- **Neben dem System in der Mitte steht eine kleine Grafik der Kern-Oberfläche**, damit Teams eine Vorstellung vom Produkt bekommen. Sie wird aus draw.io-Grundformen gebaut, zum Beispiel als Handy-Mockup mit 3 realistischen Beispieldatensätzen und dem wichtigsten Eingabeelement. Muster: die `pp-phone*`-Formen in `fill_aic.py` in diesem Skill-Ordner.

## Prüfen

- Felder mit 500 × 380 fassen höchstens etwa 5 kurze Stichpunkte in Schriftgröße 18. Darüber läuft der Text über den Rand.
- Die Formen im Business Context dürfen den arc42-Hinweistext oben im Feld nicht überdecken.
