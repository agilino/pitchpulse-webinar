"""Fill the arc42 Architecture Inception Canvas draw.io template with PitchPulse content.

Usage: python -I fill_aic.py <template.drawio> <output.drawio>
Only text cells are touched; embedded logo images stay as they are.
"""
import sys
import xml.etree.ElementTree as ET

TEMPLATE, OUTPUT = sys.argv[1], sys.argv[2]

BODY = '<div style="font-size:18px;color:#1a1a1a;font-style:normal;">{}</div>'


def bullets(*items):
    return BODY.format("<ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul>")


# Section cells: content is appended below the arc42 hint text.
APPEND = {
    "704": bullets(  # Functional Overview
        "Frage stellen (max. 280 Zeichen)",
        "Fragen upvoten (1 Stimme pro Person)",
        "Sortierung nach Stimmen",
        "Moderation markiert als beantwortet (PIN)",
        "Beitritt per QR-Code, ohne Login",
    ),
    "bHtJGvRWZrA99JSl9f75-732": bullets(  # Quality Goals
        "<b>Usability:</b> vom QR-Scan zur Frage in &lt; 10 s, mit dem Daumen",
        "<b>Performance:</b> Votes in &lt; 2 s bei allen sichtbar",
        "<b>Verfügbarkeit:</b> 200 gleichzeitige Nutzer pro Event",
    ),
    "UtoSL-II8o-O6hTiVBF9-726": bullets(  # Organisational Constraints
        "1 Gründer, kein Budget",
        "Live gebaut in 60 Minuten",
        "DSGVO: keine personenbezogenen Daten",
    ),
    "UtoSL-II8o-O6hTiVBF9-727": bullets(  # Technical Constraints
        "Cloudflare Workers + D1 (Free Tier)",
        "Kein Login, anonyme Session per Cookie",
        "Mobile-first Web, keine native App",
    ),
    "bHtJGvRWZrA99JSl9f75-730": bullets(  # Architectural Hypotheses
        "Serverless-Monolith auf Workers, Tabellen <i>questions</i> + <i>votes</i> in D1",
        "Polling alle 2 s reicht bis 200 Personen, keine WebSockets nötig",
        "Anonyme Session-ID im Cookie sichert „1 Stimme pro Person“",
    ),
    "UtoSL-II8o-O6hTiVBF9-728": bullets(  # Technical Challenges & Risks
        "Vote-Manipulation durch Cookie-Löschen → Rate-Limit pro IP",
        "D1-Schreiblast im Peak (alle voten gleichzeitig)",
        "Spam oder beleidigende Fragen → Moderation blendet aus",
    ),
}

# Header input fields (the boxes next to the small labels).
HEADER = {
    "bHtJGvRWZrA99JSl9f75-766": "PitchPulse",
    "bHtJGvRWZrA99JSl9f75-769": "Adam + Claude Code",
    "bHtJGvRWZrA99JSl9f75-771": "Startup-Webinar",
    "bHtJGvRWZrA99JSl9f75-773": "2026-11-01 / v0.1",
}

BOX = "rounded=1;whiteSpace=wrap;html=1;fillColor=#e8edf0;strokeColor=#2F5B7C;strokeWidth=2;fontColor=#2F5B7C;fontSize=18;"
SYSTEM = "rounded=1;whiteSpace=wrap;html=1;fillColor=#2F5B7C;strokeColor=none;fontColor=#ffffff;fontSize=22;fontStyle=1;"
EDGE = "endArrow=classic;html=1;strokeColor=#2F5B7C;strokeWidth=2;fontSize=15;fontColor=#2F5B7C;labelBackgroundColor=#ffffff;"
TEXT = "text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontSize=18;fontColor=#1a1a1a;"
PHONE = "rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#2F5B7C;strokeWidth=3;"
PHONE_TITLE = "text;html=1;align=center;verticalAlign=middle;fontSize=12;fontStyle=1;fontColor=#2F5B7C;"
PHONE_ROW = "rounded=1;whiteSpace=wrap;html=1;fillColor=#e8edf0;strokeColor=none;align=left;spacingLeft=4;fontSize=10;fontColor=#1a1a1a;"
PHONE_INPUT = "rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#2F5B7C;dashed=1;align=left;spacingLeft=4;fontSize=10;fontColor=#888888;"

# New cells: (id, value, style, x, y, w, h)
VERTICES = [
    ("pp-case", "Startup-Events verlieren die besten Fragen im Chaos. PitchPulse macht Live-Q&amp;A mit Upvoting "
     "für kleine Events ohne Setup möglich: QR-Code scannen, fragen, voten.", TEXT, -1450, 270, 1250, 110),
    ("pp-system", "PitchPulse", SYSTEM, -1300, 830, 200, 100),
    ("pp-participant", "Teilnehmende<br>(Handy)", BOX, -1680, 700, 200, 80),
    ("pp-moderator", "Moderation", BOX, -1680, 980, 200, 80),
    ("pp-screen", "Beamer-Ansicht", BOX, -920, 700, 200, 80),
    ("pp-slides", "Event-Folien<br>(QR-Code)", BOX, -920, 980, 200, 80),
    # Phone mockup of the core screen below the system box, so teams can picture the product.
    ("pp-phone", "", PHONE, -1265, 945, 130, 180),
    ("pp-phone-title", "PitchPulse", PHONE_TITLE, -1257, 951, 114, 18),
    ("pp-phone-q1", "Wie skaliert ihr?<br><b>▲ 12</b>", PHONE_ROW, -1257, 974, 114, 34),
    ("pp-phone-q2", "Wann kommt Pricing?<br><b>▲ 8</b>", PHONE_ROW, -1257, 1012, 114, 34),
    ("pp-phone-q3", "Sucht ihr Co-Founder?<br><b>▲ 5</b>", PHONE_ROW, -1257, 1050, 114, 34),
    ("pp-phone-input", "Frage stellen …", PHONE_INPUT, -1257, 1092, 114, 24),
]
EDGES = [
    ("pp-e1", "Fragen, Votes", "pp-participant", "pp-system"),
    ("pp-e2", "markiert beantwortet", "pp-moderator", "pp-system"),
    ("pp-e3", "Top-Fragen live", "pp-system", "pp-screen"),
    ("pp-e4", "Link", "pp-slides", "pp-system"),
]

tree = ET.parse(TEMPLATE)
root_cell = tree.getroot().find(".//root")
cells = {c.get("id"): c for c in root_cell.iter("mxCell")}

missing = [i for i in list(APPEND) + list(HEADER) if i not in cells]
if missing:
    sys.exit(f"cells not found in template: {missing}")

for cell_id, html in APPEND.items():
    cells[cell_id].set("value", (cells[cell_id].get("value") or "") + "<br>" + html)

for cell_id, text in HEADER.items():
    cells[cell_id].set("value", f'<b style="font-size:16px;">{text}</b>')
    # The template hides text in these boxes (noLabel=1, fontColor=none); make it visible.
    style = cells[cell_id].get("style", "").replace("noLabel=1;", "").replace("fontColor=none;", "fontColor=#1a1a1a;")
    cells[cell_id].set("style", style + "verticalAlign=bottom;spacingBottom=6;")

for cell_id, value, style, x, y, w, h in VERTICES:
    cell = ET.SubElement(root_cell, "mxCell", id=cell_id, value=value, style=style, vertex="1", parent="1")
    ET.SubElement(cell, "mxGeometry", x=str(x), y=str(y), width=str(w), height=str(h), **{"as": "geometry"})

for cell_id, value, source, target in EDGES:
    cell = ET.SubElement(root_cell, "mxCell", id=cell_id, value=value, style=EDGE, edge="1",
                         parent="1", source=source, target=target)
    ET.SubElement(cell, "mxGeometry", relative="1", **{"as": "geometry"})

tree.write(OUTPUT, encoding="utf-8", xml_declaration=False)
print(f"wrote {OUTPUT}: {len(APPEND)} sections, {len(HEADER)} header fields, "
      f"{len(VERTICES)} shapes, {len(EDGES)} edges")
