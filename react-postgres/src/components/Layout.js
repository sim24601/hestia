import { Outlet, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCityOutlined';
import PublicIcon from '@mui/icons-material/Public';
import PsychologyIcon from '@mui/icons-material/Psychology';
import "../styles/Layout.css";

const Layout = () => {
  return (
    <>
      <nav>
        <Button variant="outlined" startIcon={<HomeIcon style={{ color: "black" }} />}><Link to="/" style={{ color: "black", fontWeight:600, textDecoration:"none" }} >Home</Link></Button>
        <ul>
          <li>
            <Button variant="contained" style={{ backgroundColor: "#ffc638" }} startIcon={<LocationCityIcon style={{ color: "black" }} />}><Link to="/Territoire">Territoire</Link></Button>
          </li>
          <li>
          <Button variant="contained" style={{ backgroundColor: "#ffc638" }} startIcon={<PublicIcon style={{ color: "black" }} />}><Link to="/Climat">Climat</Link></Button>
          </li>
          <li>
          <Button variant="contained" style={{ backgroundColor: "#ffc638" }} startIcon={<PsychologyIcon style={{ color: "black" }} />}><Link to="/Climat">Methode</Link></Button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;