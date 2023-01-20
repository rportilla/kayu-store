import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";

import {
  Box,
  Container,
  Stack,
  useColorModeValue,
  Image
} from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'7xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Box h={'50px'}>
           <Link to="/">
             <Image
               objectFit='cover'
               w="200px"
               src="https://cdn.shopify.com/s/files/1/0217/0195/1560/files/logo_rojo_175x@2x.png?v=1613527059"
             />
            </Link>
         </Box>
         <Box h={'50px'}>
            <Image
              w="70%"
              objectFit='cover'
              src="https://cdn.shopify.com/s/files/1/0217/0195/1560/files/despacho-chile-5.png"
            />
          </Box>
        <Stack direction={'row'} spacing={6}>
          <CartWidget />
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
