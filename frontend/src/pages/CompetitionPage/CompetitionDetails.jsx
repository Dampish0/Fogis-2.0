import React from 'react';
import { Box, Typography, List, ListItemButton, ListItemText, Divider } from '@mui/material';
import "./CompetitionDetails.css";

export default function CompetitionDetails({ type, id, name, onBack }) {
  const handleSideClick = (key) => {
    console.log("Klick i sidomeny:", key);
  };

  return (
    <Box sx={{ py: 2 }}>
      <div className="detailsLayout">
        <div className="detailsMain">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
            {name ?? `#${id}`}
          </Typography>

          <Typography sx={{ mt: 2, fontSize: '1.5rem', fontWeight: 700 }}>
            Senaste matcherna
          </Typography>

          <div className="matchesPlaceholder">
            <div className="matchRow">Lag A 2-1 Lag B • 2025-08-10</div>
            <div className="matchRow">Lag C 0-0 Lag D • 2025-08-03</div>
            <div className="matchRow">Lag E 1-3 Lag F • 2025-07-28</div>
          </div>
        </div>

      
        <aside className="detailsSidebar">
          <div className="sidebarCard">
            <Divider className="sidebarDivider" />

            <List className="sidebarList" aria-label="Snabblänkar för tävling">
              <li>
                <ListItemButton className="sidebarItem" onClick={() => handleSideClick('table')}>
                  <ListItemText primary="Tabell och resultat" />
                </ListItemButton>
              </li>
              <li>
                <ListItemButton className="sidebarItem" onClick={() => handleSideClick('schedule')}>
                  <ListItemText primary="Spelprogram" />
                </ListItemButton>
              </li>
              <li>
                <ListItemButton className="sidebarItem" onClick={() => handleSideClick('player-stats')}>
                  <ListItemText primary="Spelarstatistik" />
                </ListItemButton>
              </li>
              <li>
                <ListItemButton className="sidebarItem" onClick={() => handleSideClick('team-stats')}>
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
