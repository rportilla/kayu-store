
import "./CartWidget.css"

const CartWidget = () => {
  return (
    <div className="cart-container">
      <img className="cart-icon" src="https://assets.webiconspng.com/uploads/2017/09/Shopping-Cart-PNG-Image-72455.png" />
      <p className="cart-number">0</p>
    </div>
  );
};

export default CartWidget;
