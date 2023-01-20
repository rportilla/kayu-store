import { useContext } from 'react'
import { CartContext } from "../contexts/CartContext";
import { Link as RouterLink } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import {
  Heading,
  HStack,
  VStack,
  Image,
  AspectRatio,
  Text,
  Divider,
  Stack,
  Button,
  Container,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const Cart = () => {
  const { cartItems, clearCart, removeCartItem, getTotal, isEmptyCart} = useContext(CartContext);

  const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  return (
    <Container
      maxW={'7xl'}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'center' }}>
      <VStack
        w="full"
        h="full"
        p={10}
        spacing={6}
        align="flex-start"
        bg={bgColor}
      >
        <VStack alignItems="flex-start" spacing={3}>
          <Heading size="2xl">Carrito de compra</Heading>
        </VStack>
        { isEmptyCart() ?
          <Heading size="sm">Aún no existen productos en el carrito</Heading>
          : cartItems.map((item) => (
              <HStack key={item.product.id} spacing={4} alignItems="center" w="full">
                <AspectRatio ratio={1} w={24}>
                  <Image src={item.product.image}/>
                </AspectRatio>
                <Stack
                  key={item.product.id}
                  spacing={0}
                  w="full"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <VStack spacing={0} alignItems="flex-start">
                    <Heading size="sm">{item.product.title}</Heading>
                  </VStack>
                  <Heading size="sm" textAlign="end">
                    {item.quantity} X <NumericFormat value={item.product.price} displayType="text" thousandSeparator="." prefix={'$'} decimalSeparator="," />
                  </Heading>
                  <Heading size="sm" textAlign="end">
                    <NumericFormat value={item.quantity * item.product.price} displayType="text" thousandSeparator="." prefix={'$'} decimalSeparator="," />
                  </Heading>
                  <Heading size="sm" textAlign="end">
                    <IconButton aria-label='Borrar del carrito' icon={<DeleteIcon />} onClick={() => removeCartItem(item.product.id)} />
                  </Heading>
                </Stack>
              </HStack>
            ))
        }
        <Divider />
        <HStack justifyContent="space-between" w="full">
          <Text color={secondaryTextColor}>Total</Text>
          <Heading size="lg">
            <NumericFormat value={getTotal()} displayType="text" thousandSeparator="." prefix={'$'} decimalSeparator="," />
          </Heading>
        </HStack>
        { !isEmptyCart() &&
          <HStack justifyContent="space-between" w="full">
            <Button colorScheme='gray' onClick={() => clearCart()}>Vaciar carrito</Button>
            <Button colorScheme='red' as={RouterLink} to="/checkout" >Finalizar compra</Button>
          </HStack>
        }
      </VStack>
    </Container>
  )
}

export default Cart;
