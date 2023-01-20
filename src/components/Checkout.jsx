import { useContext, useState } from 'react'
import { CartContext } from "../contexts/CartContext";
import { db } from "../db/firebase-config.js";
import {collection, addDoc} from "firebase/firestore";
import { NumericFormat } from 'react-number-format';
import OrderDetail from "./OrderDetail";
import {
  Flex,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Button,
  Divider,
  HStack,
  Image,
  Stack,
  AspectRatio,
  useBreakpointValue,
  useColorModeValue,
  FormHelperText,
  FormErrorMessage
} from '@chakra-ui/react';

const Checkout = () => {
  const { cartItems, clearCart, getTotal } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputEmailReply, setInputEmailReply] = useState("");
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');

  //Validaciones
  const isErrorName = inputName === '';
  const isErrorLastName = inputLastName === '';
  const isErrorAddress = inputAddress === '';
  const isErrorEmail = inputEmail === '';
  const isErrorEmailReply = inputEmailReply !== inputEmail;

  //Creamos la orde de compra
  const createOrder = async (e) => {
    //Validamos que no existan errores en el formulario
    if (!isErrorName && !isErrorLastName && !isErrorAddress && !isErrorEmail && !isErrorEmailReply)
    {
      setIsLoading(true);

      const order = {
        name: inputName,
        lastName: inputLastName,
        phone: inputPhone,
        email: inputEmail,
        city: inputCity,
        inputAddress: inputAddress,
        totalAmount: getTotal(),
        items: cartItems
      }
      const ordersCollectionRef = collection(db, "orders");
      addDoc(ordersCollectionRef, order).then( ({id}) => {
        setOrderId(id);
        clearCart();
        setInputName("");
        setInputLastName("");
        setInputPhone("");
        setInputEmail("");
        setInputAddress("");
        setInputCity("");
        setIsLoading(false);
      });
    }    
  };

  return (
    <Container maxW="container.xl">
      { orderId === "" ?
        <>
          <Flex h="100vh" py={10}>
            <VStack w="full" h="full" p={2} spacing={10} alignItems="flex-start">
              <VStack spacing={3} alignItems="flex-start">
                <Heading size="xl">Detalle de compra</Heading>
              </VStack>
              <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={colSpan}>
                  <FormControl isInvalid={isErrorName}>
                    <FormLabel>Nombre</FormLabel>
                    <Input onChange={(e) => setInputName(e.target.value)} value={inputName} />
                    <FormErrorMessage>Debe ingresar nombre.</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                  <FormControl isInvalid={isErrorLastName}>
                    <FormLabel>Apellido</FormLabel>
                    <Input onChange={(e) => setInputLastName(e.target.value)} value={inputLastName}/>
                    <FormErrorMessage>Debe ingresar apellido.</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={isErrorAddress}>
                    <FormLabel>Dirección</FormLabel>
                    <Input onChange={(e) => setInputAddress(e.target.value)} value={inputAddress} />
                    <FormErrorMessage>Debe ingresar dirección.</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                  <FormControl>
                    <FormLabel>Ciudad</FormLabel>
                    <Input onChange={(e) => setInputCity(e.target.value)} value={inputCity} />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                  <FormControl>
                    <FormLabel>Teléfono</FormLabel>
                    <Input onChange={(e) => setInputPhone(e.target.value)} value={inputPhone} />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                  <FormControl isInvalid={isErrorEmail}>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' onChange={(e) => setInputEmail(e.target.value)} value={inputEmail}/>
                    <FormErrorMessage>Debe ingresar email.</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={colSpan}>
                  <FormControl isInvalid={isErrorEmailReply}>
                    <FormLabel>Repetir email</FormLabel>
                    <Input type='email' onChange={(e) => setInputEmailReply(e.target.value)} value={inputEmailReply}/>
                    <FormErrorMessage>Debe repetir el email ingresado.</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <Button isLoading={isLoading} loadingText='Generando compra...' variant="solid" size="lg" w="full" colorScheme='red' onClick={()=> createOrder()}>
                    Comprar
                  </Button>
                </GridItem>
              </SimpleGrid>
            </VStack>
            <VStack
              w="full"
              h="full"
              p={10}
              spacing={6}
              align="flex-start"
              bg={bgColor}
            >
              <VStack alignItems="flex-start" spacing={3}>
                <Heading size="lg">Carrito de compra</Heading>
              </VStack>
              {cartItems.map((item) => (
                <HStack key={item.id} spacing={6} alignItems="center" w="full">
                  <AspectRatio ratio={1} w={20}>
                    <Image src={item.product.image}/>
                  </AspectRatio>
                  <Stack
                    key={item.id}
                    spacing={0}
                    w="full"
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <VStack spacing={0} alignItems="flex-start">
                      <Heading size="xs">{item.product.title}</Heading>
                    </VStack>
                    <Heading size="xs" textAlign="end">
                      <NumericFormat value={item.quantity * item.product.price} displayType="text" thousandSeparator="." prefix={'$'} decimalSeparator="," />
                    </Heading>
                  </Stack>
                </HStack>
              ))}
              <Divider />
              <HStack justifyContent="space-between" w="full">
                <Text color={secondaryTextColor}>Total</Text>
                <Heading size="lg">
                  <NumericFormat value={getTotal()} displayType="text" thousandSeparator="." prefix={'$'} decimalSeparator="," />
                </Heading>
              </HStack>
            </VStack>
          </Flex>
        </>
        :  <OrderDetail orderId={orderId} />
      }
    </Container>
  )
}
export default Checkout;
