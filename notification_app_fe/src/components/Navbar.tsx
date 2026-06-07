import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Campus Notifications
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate("/")}>
            All Notifications
          </Button>
          <Button color="inherit" onClick={() => navigate("/priority")}>
            Priority Inbox
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;