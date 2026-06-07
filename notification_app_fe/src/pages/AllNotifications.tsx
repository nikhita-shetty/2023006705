import { useEffect, useState } from "react";
import {
  Card, CardContent, Typography, Chip,
  CircularProgress, Box, Select, MenuItem,
  FormControl, InputLabel, Pagination
} from "@mui/material";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJucGFjaGlwdTJAZ2l0YW0uaW4iLCJleHAiOjE3ODA4MTU0MDEsImlhdCI6MTc4MDgxNDUwMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjcwNzgxZTI5LWU3NzctNGE4My05OTJlLTdmZmViNmRiZDg0YyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im5pa2hpdGEgc2hldHR5Iiwic3ViIjoiM2UwMmU5NDAtOGE4NC00YzQ4LWE1NTEtZGZmOWY4YmFiYWE1In0sImVtYWlsIjoibnBhY2hpcHUyQGdpdGFtLmluIiwibmFtZSI6Im5pa2hpdGEgc2hldHR5Iiwicm9sbE5vIjoiMjAyMzAwNjcwNSIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6IjNlMDJlOTQwLThhODQtNGM0OC1hNTUxLWRmZjlmOGJhYmFhNSIsImNsaWVudFNlY3JldCI6IkZiekhTeUhtd0p3c1lGUXEifQ.g00urLzyYJbD5v7bEv9TMUJImmK_MVLNYYTehMyq4wQ";

const TYPE_COLOR: any = {
  Placement: "success",
  Result: "warning",
  Event: "info",
};

export default function AllNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [viewed, setViewed] = useState<Set<string>>(new Set());
  const limit = 5;

  useEffect(() => {
    fetchData();
  }, [filter, page]);

  async function fetchData() {
    setLoading(true);
    let url = `http://4.224.186.213/evaluation-service/notifications?limit=${limit}&page=${page}`;
    if (filter) url += `&notification_type=${filter}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });
    const data = await res.json();
    setNotifications(data.notifications || []);
    setLoading(false);
  }

  function markViewed(id: string) {
    setViewed((prev) => new Set([...prev, id]));
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>All Notifications</Typography>
      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel>Filter by Type</InputLabel>
        <Select value={filter} label="Filter by Type"
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>

      {loading ? <CircularProgress /> : (
        <>
          {notifications.map((n) => (
            <Card key={n.ID} sx={{ mb: 2, opacity: viewed.has(n.ID) ? 0.6 : 1 }}
              onClick={() => markViewed(n.ID)}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">{n.Message}</Typography>
                  <Chip label={n.Type} color={TYPE_COLOR[n.Type]} size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">{n.Timestamp}</Typography>
                {!viewed.has(n.ID) && <Chip label="NEW" color="error" size="small" sx={{ mt: 1 }} />}
              </CardContent>
            </Card>
          ))}
          <Pagination count={10} page={page}
            onChange={(_, val) => setPage(val)} sx={{ mt: 2 }} />
        </>
      )}
    </Box>
  );
}