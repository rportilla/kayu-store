import Card from "./Card";
import { useParams } from "react-router-dom";

const ItemListContainer = function ({ list }) {
  let { id } = useParams();
  const products = id == undefined ? list : list.filter(product => product.category_id == id)
  return products.map(({ id, category_id, name, description, price, image }) => (
    <div key={id}>
      <Card id={id} name={name} description={description} price={price} image={image} />
    </div>
  ));
};

export default ItemListContainer;
