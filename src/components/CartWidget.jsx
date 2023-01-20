
import { CartContext } from "../contexts/CartContext";
import { useContext } from 'react'
import { Link as RouterLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {
  chakra,
  Text,
  useColorModeValue,
  VisuallyHidden
} from '@chakra-ui/react';

const CartButton = ({ children, label, to}) => {
  return (
    <chakra.button
      color={'whiteAlpha.900'}
      bg={'red.500'}
      rounded={'full'}
      w={10}
      h={10}
      cursor={'pointer'}
      as={RouterLink}
      to={to}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        color: 'blackAlpha.900'
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const CartWidget = () => {

  const { getItemsCount } = useContext(CartContext);

  return (
    <CartButton to="/cart" >
      <FaShoppingCart />
      <Text fontSize='md' ml={1}>{getItemsCount()}</Text>
    </CartButton>
  );
};

export default CartWidget;
