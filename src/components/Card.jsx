import "./Card.css"
import { Link } from "react-router-dom";

const Card = function ({ id, name, description, price, image }) {
  return (
    <div className="card">
      <img src={image}/>
      <div>
        <h5><b>{name}</b></h5>
        <p>${price}</p>
        <Link to={`/item/${id}`}>
          <button className="css-button-3d--red">
            Ver producto
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
