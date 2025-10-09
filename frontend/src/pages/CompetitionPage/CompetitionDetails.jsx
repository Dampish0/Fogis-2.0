import React from "react";
import {Box,Typography,List,ListItemButton,ListItemText,Divider,Button,
} from "@mui/material";
import "./CompetitionDetails.css";

export default function CompetitionDetails({ type, id, name, onBack }) {
  const handleSideClick = (key) => {
    console.log("Sidomeny klick:", key);
  };

  return (
    <Box sx={{ py: 2 }}>
      <div className="detailsLayout">
        <div className="detailsMain">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
            {name ?? `#${id}`}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
            Senaste matcherna
          </Typography>

          <div className="matchesPlaceholder">
            <div className="matchRow">Lag A 2–1 Lag B • 13:00, 2025-08-10</div>
            <div className="matchRow">Lag C 0–0 Lag D • 13:00, 2025-08-03</div>
            <div className="matchRow">Lag E 1–3 Lag F • 13:00,      2025-07-28</div>
          </div>

          <div className="tableSection">
            <Typography variant="h6" className="tableTitle">
              Tabell
            </Typography>

            <div className="tableCard">
              <table className="standingsTable">
                <thead>
                  <tr>
                    <th>PO</th>
                    <th>Lag</th>
                    <th>MP</th>
                    <th>V</th>
                    <th>O</th>
                    <th>F</th>
                    <th>GM</th>
                    <th>IM</th>
                    <th>+/-</th>
                    <th>P</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Lag A</td>
                    <td>10</td>
                    <td>7</td>
                    <td>2</td>
                    <td>1</td>
                    <td>20</td>
                    <td>9</td>
                    <td>+11</td>
                    <td>23</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Lag B</td>
                    <td>10</td>
                    <td>6</td>
                    <td>3</td>
                    <td>1</td>
                    <td>18</td>
                    <td>10</td>
                    <td>+8</td>
                    <td>21</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Lag C</td>
                    <td>10</td>
                    <td>6</td>
                    <td>1</td>
                    <td>3</td>
                    <td>15</td>
                    <td>11</td>
                    <td>+4</td>
                    <td>19</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <aside className="detailsSidebar">
          <div className="sidebarCard">

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            {name ?? `#${id}`}
          </Typography>

            <Divider className="sidebarDivider" />

            <List className="sidebarList" aria-label="Snabblänkar">
              <li>
                <ListItemButton
                  className="sidebarItem"
                  onClick={() => handleSideClick("table")}
                >
                  <ListItemText primary="Tabell och resultat" />
                </ListItemButton>
              </li>
              <li>
                <ListItemButton
                  className="sidebarItem"
                  onClick={() => handleSideClick("schedule")}
                >
                  <ListItemText primary="Spelprogram" />
                </ListItemButton>
              </li>
              <li>
                <ListItemButton
                  className="sidebarItem"
                  onClick={() => handleSideClick("player-stats")}
                >
                  <ListItemText primary="Spelarstatistik" />
                </ListItemButton>
              </li>
              <li>
                <ListItemButton
                  className="sidebarItem"
                  onClick={() => handleSideClick("team-stats")}
                >
                  <ListItemText primary="Lagstatistik" />
                </ListItemButton>
              </li>
            </List>
          </div>
        </aside>
      </div>
    </Box>
  );
}
