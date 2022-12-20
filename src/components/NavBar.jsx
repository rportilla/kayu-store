import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <nav className="navbar-container">
        <Link to="/category/1" className="buttons-navbar">
          <p>BALONES</p>
        </Link>
        <Link to="/category/2" className="buttons-navbar">
          <p>CICLISMO</p>
        </Link>
        <Link to="/category/3" className="buttons-navbar">
          <p>FÚTBOL</p>
        </Link>
        <Link to="/category/4" className="buttons-navbar">
          <p>BOXEO</p>
        </Link>
      </nav>
  );
};

export default Navbar;
