import {useState, useEffect} from 'react';
import { db } from "../db/firebase-config.js";
import {collection, getDocs} from "firebase/firestore";
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Container
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const categoriesCollectionRef = collection(db, "categories");

  //Obtenemos las categorías
  const getCategories = async () => {
    const data = await getDocs(categoriesCollectionRef);
    setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
  };

  useEffect(() =>  {
    getCategories();
  }, []);

  const NavLink = ({ name, url } ) => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'red.900',
      }}
      as={RouterLink}
      to={url}
      textTransform={'uppercase'}
      color='gray.50'
      fontSize='lg'>
      {name}
    </Link>
  );

  return (
      <Box bg={useColorModeValue('gray.900', 'gray.900')} px={4}>
        <Container
          maxW={'7xl'}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <HStack spacing={8} alignItems={'center'}>
              <HStack
                as={'nav'}
                spacing={20}
                display={{ base: 'none', md: 'flex' }}>
                <NavLink url="/" name="Inicio" />
                {categories.map(({ id, key, description }) => (
                  <NavLink key={id} url={`/category/${key}`} name={description} />
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Button
                variant={'solid'}
                colorScheme={'red'}
                size={'sm'}
                mr={4}
                leftIcon={<AddIcon />}>
                Mi cuenta
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                </MenuButton>
                <MenuList>
                  <MenuItem>Mis órdenes</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Container>
      </Box>
  );

};

export default Navbar;
