import React, { useEffect, useMemo } from "react";
import {
  Box, Typography, List, ListItemButton, ListItemText,
  Divider, Button, Alert, CircularProgress
} from "@mui/material";
import "./CompetitionDetails.css";
import useSeriesStore from "../../store/seriesStore.js";

export default function CompetitionDetails({ type, id, name, onBack }) {
  const {
    fetchSeriesById,
    selectedSeries,
    loading,
    error,
  } = useSeriesStore();

  useEffect(() => {
    if (type === "series" && id) {
      fetchSeriesById(id);
    }
  }, [type, id, fetchSeriesById]);

  const getSerieName = (s) => s?.name ?? s?.title ?? s?.serieName ?? name ?? `#${id}`;
  const displayName = useMemo(() => {
    if (type === "series" && selectedSeries) return getSerieName(selectedSeries);
    return name ?? `#${id}`;
  }, [type, selectedSeries, name, id]);

  return (
    <Box sx={{ py: 2 }}>
      <div className="detailsLayout">
        <div className="detailsMain">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {displayName}
          </Typography>

          {type === "series" && (
            <Box sx={{ mb: 2 }}>
              {loading && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.5 }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2">Laddar serie…</Typography>
                </Box>
              )}
              {error && <Alert severity="error">Kunde inte hämta serie: {String(error)}</Alert>}
            </Box>
          )}

          <Box sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={onBack}>⟵ Tillbaka</Button>
          </Box>
        </div>

        <aside className="detailsSidebar">
          <div className="sidebarCard">
            <Typography variant="subtitle1" className="sidebarTitle">
              {displayName}
            </Typography>
            <Divider className="sidebarDivider" />
            <List className="sidebarList" aria-label="Snabblänkar">
              <li><ListItemButton className="sidebarItem"><ListItemText primary="Tabell och resultat" /></ListItemButton></li>
              <li><ListItemButton className="sidebarItem"><ListItemText primary="Spelprogram" /></ListItemButton></li>
              <li><ListItemButton className="sidebarItem"><ListItemText primary="Spelarstatistik" /></ListItemButton></li>
              <li><ListItemButton className="sidebarItem"><ListItemText primary="Lagstatistik" /></ListItemButton></li>
            </List>
          </div>
        </aside>
      </div>
    </Box>
  );
}
