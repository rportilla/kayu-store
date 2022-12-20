import { FcSportsMode } from "react-icons/fc";
import { Link } from "react-router-dom";
import "./Header.css";
import CartWidget from "./CartWidget";

const Header = function () {
  return (
    <header>
      <div className="row">
        <div className="col">
          <Link to="/">
            <img className="logo_brand" src="https://cdn.shopify.com/s/files/1/0217/0195/1560/files/logo_rojo_175x@2x.png?v=1613527059" />
          </Link>
        </div>
        <div className="col">
          <img className="logo_shipping" src="https://cdn.shopify.com/s/files/1/0217/0195/1560/files/despacho-chile-5.png" />
        </div>
        <div className="col text-right">
          <CartWidget />
        </div>
      </div>
    </header>
  );
};

export default Header;
