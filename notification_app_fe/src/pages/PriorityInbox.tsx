import { useEffect, useState } from "react";
import {
  Card, CardContent, Typography, Chip,
  CircularProgress, Box, TextField, Button
} from "@mui/material";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJucGFjaGlwdTJAZ2l0YW0uaW4iLCJleHAiOjE3ODA4MTU0MDEsImlhdCI6MTc4MDgxNDUwMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjcwNzgxZTI5LWU3NzctNGE4My05OTJlLTdmZmViNmRiZDg0YyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im5pa2hpdGEgc2hldHR5Iiwic3ViIjoiM2UwMmU5NDAtOGE4NC00YzQ4LWE1NTEtZGZmOWY4YmFiYWE1In0sImVtYWlsIjoibnBhY2hpcHUyQGdpdGFtLmluIiwibmFtZSI6Im5pa2hpdGEgc2hldHR5Iiwicm9sbE5vIjoiMjAyMzAwNjcwNSIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6IjNlMDJlOTQwLThhODQtNGM0OC1hNTUxLWRmZjlmOGJhYmFhNSIsImNsaWVudFNlY3JldCI6IkZiekhTeUhtd0p3c1lGUXEifQ.g00urLzyYJbD5v7bEv9TMUJImmK_MVLNYYTehMyq4wQ";

const TYPE_WEIGHT: any = { Placement: 3, Result: 2, Event: 1 };
const TYPE_COLOR: any = { Placement: "success", Result: "warning", Event: "info" };

function getPriorityScore(n: any) {
  return TYPE_WEIGHT[n.Type] * 1e13 + new Date(n.Timestamp).getTime();
}

export default function PriorityInbox() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [topN, setTopN] = useState(10);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const res = await fetch(
      "http://4.224.186.213/evaluation-service/notifications",
      { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
    );
    const data = await res.json();
    const sorted = (data.notifications || []).sort(
      (a: any, b: any) => getPriorityScore(b) - getPriorityScore(a)
    );
    setNotifications(sorted);
    setLoading(false);
  }

  function markViewed(id: string) {
    setViewed((prev) => new Set([...prev, id]));
  }

  const topNotifications = notifications.slice(0, topN);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Priority Inbox</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
        <TextField
          label="Show Top N"
          type="number"
          value={topN}
          onChange={(e) => setTopN(Number(e.target.value))}
          sx={{ width: 150 }}
        />
        <Button variant="contained" onClick={fetchData}>Refresh</Button>
      </Box>

      {loading ? <CircularProgress /> : (
        topNotifications.map((n, i) => (
          <Card key={n.ID} sx={{ mb: 2, opacity: viewed.has(n.ID) ? 0.6 : 1,
            border: i < 3 ? "2px solid gold" : "none" }}
            onClick={() => markViewed(n.ID)}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">#{i + 1} {n.Message}</Typography>
                <Chip label={n.Type} color={TYPE_COLOR[n.Type]} size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary">{n.Timestamp}</Typography>
              {!viewed.has(n.ID) && <Chip label="NEW" color="error" size="small" sx={{ mt: 1 }} />}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}