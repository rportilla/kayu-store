import { useLocation, useParams } from "react-router-dom";

const ItemDetailContainer = ({ data }) => {
  let { id } = useParams();
  const product = data.find((product) => product.id == id);
  return (
    <div className="">
      <img src={product.image}/>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button>Comprar</button>
    </div>
  );
};

export default ItemDetailContainer;
