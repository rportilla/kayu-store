import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { Container, Grid, GridItem } from '@chakra-ui/react';

const ItemListContainer = ({ list }) => {
  let { key } = useParams();
  const products = key === undefined ? list : list.filter(product => product.category === key)
  return (
    <Container
      maxW={'7xl'}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'center' }}>
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
          { products.map(({ id, key, title, description, price, brand, image, stock }) => (
             <ItemDetail key={id} id={id} title={title} description={description} price={price} brand={brand} image={image} stock={stock} />
           ))}
        </Grid>
    </Container>);
};

export default ItemListContainer;
