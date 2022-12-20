
import "./CartWidget.css"
import { FaShoppingCart } from "react-icons/fa";

const CartWidget = () => {
  return (
    <div>
      <FaShoppingCart />
      <p className="cart-number">0</p>
    </div>
  );
};

export default CartWidget;
