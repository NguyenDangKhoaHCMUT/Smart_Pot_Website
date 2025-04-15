import Box from "@mui/material/Box";
function Dashboard() {
  return (
    <Box sx={{
      height: "calc(100vh - 70px)", // Adjust this value based on your app bar height
      width: "100%",
      overflowY: "auto",
      padding: "16px",
      backgroundColor: "background.main", // Optional: Set a background color
    }}>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <p>Here you can find various statistics and information.</p>
    </Box>
  )
}

export default Dashboard