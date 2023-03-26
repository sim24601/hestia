import { Outlet, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import "../styles/Layout.css";

const Layout = () => {
  return (
    <>
      <nav>
        <Button variant="outlined" startIcon={<HomeIcon color="primary" />}><Link to="/">Home</Link></Button>
        <ul>
          <li>
            <Button variant="contained"><Link to="/Territoire">Territoire</Link></Button>
          </li>
          <li>
          <Button variant="contained"><Link to="/Climat">Climat</Link></Button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;