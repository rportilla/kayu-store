import { useParams } from "react-router-dom";
import { Box, VStack, Flex, Container, ButtonGroup, Image, Stack, Heading, Text, Button } from '@chakra-ui/react';
import { NumericFormat } from 'react-number-format';
import { Link as RouterLink } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import ItemCount from "./ItemCount";
import { useContext } from 'react'
import NotFound from "./NotFound";

const ItemDetailContainer = ({ data }) => {
  let { id } = useParams();
  const { addToCart, isInCart, removeCartItem } = useContext(CartContext);
  const product = data.find((product) => product.id === id);

  return (
    <Container maxW="container.xl" p={0}>
      { product !== undefined ?
        <Flex h="70vh" py={5}>
          <VStack
            w="full"
            h="full"
            p={10}
            spacing={10}
            alignItems="flex-start">
           <Box h={'400px'}>
              <Image
                objectFit='cover'
                h="full"
                w="full"
                src={product.image}
              />
            </Box>
          </VStack>
          <VStack
            w="full"
            h="full"
            p={10}
            spacing={10}
            alignItems="flex-start"
            bg="gray.100">
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{product.title}</Heading>
              <Text color={'gray.600'} fontSize={'sm'} textTransform={'uppercase'}>
                {product.brand}
              </Text>
              <Text>
                {product.description}
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                <NumericFormat value={product.price} displayType="text" thousandSeparator="." prefix={'$'} decimalSeparator="," />
              </Text>
              <Text color={'gray.600'} fontSize={'sm'} textTransform={'uppercase'}>
                Stock disponible: {product.stock}
              </Text>
              {isInCart(product.id) ?
                <ButtonGroup variant='outline' spacing='6'>
                  <Button variant='solid' colorScheme='blackAlpha' as={RouterLink} to="/cart">
                    Ir al carrito
                  </Button>
                  <Button variant='solid' colorScheme='gray' onClick={() => removeCartItem(product.id)}>
                    Borrar del carro
                  </Button>
                </ButtonGroup>
                : <ItemCount stock={product.stock} initial={1} onAdd={addToCart} product={product} />
              }
            </Stack>
          </VStack>
        </Flex>
        : <NotFound />
    }
    </Container>
  );
};

export default ItemDetailContainer;
