import { Outlet } from "react-router-dom";
// // Importing navbar
import NavbarComponent from "../components/Navbar/Navbar";
import Container from '@mui/material/Container'

function Layout() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <NavbarComponent></NavbarComponent>
      <Outlet />
    </Container>
  )
}

export default Layout
