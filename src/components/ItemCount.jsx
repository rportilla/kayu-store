import React from 'react';
import { useState } from 'react';
import { Stack, Button, Text } from '@chakra-ui/react';
import { NumericFormat } from 'react-number-format';

const ItemCount = ({ initial, stock, onAdd, product }) => {
  const [quantity, setQuantity] = useState(initial);

  const addProduct = (num) => {
    setQuantity(quantity + num);
  };

  return (
    <>
    <Stack mt='6' direction='row' spacing='3'>
      <Button variant='solid' colorScheme='blackAlpha' onClick={() => addProduct(-1)} isDisabled={quantity === initial ? true : false}>
        -
      </Button>
      <Text color='blue.600' fontSize='2xl'>
        <NumericFormat value={quantity} displayType="text" thousandSeparator="." decimalSeparator="," />
      </Text>
      <Button variant='solid' colorScheme='blackAlpha' onClick={() => addProduct(1)} isDisabled={quantity === stock ? true : false}>
        +
      </Button>
    </Stack>
    <Stack mt='6' direction='row' spacing='3'>
      <Button variant='solid' colorScheme='red' onClick={() => onAdd(product, quantity)}>
        Agregar al carro
      </Button>
    </Stack>
    </>
  );
};

export default ItemCount;
