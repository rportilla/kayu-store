import "./Navbar.css";
import CartWidget from "./CartWidget";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <h2 class="brand">Kayu</h2>
      <button className="buttons-navbar">BALONES</button>
      <button className="buttons-navbar">CICLISMO</button>
      <button className="buttons-navbar">FÚTBOL</button>
      <button className="buttons-navbar">BOXEO</button>
      <button className="buttons-navbar">RUNNING</button>
      <CartWidget />
    </div>
  );
};

export default Navbar;
