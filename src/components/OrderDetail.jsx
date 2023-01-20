import React from 'react';
import { useEffect, useState } from 'react';
import { Divider, Flex, VStack, Stack, Image, AspectRatio, HStack, Skeleton, Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { NumericFormat } from 'react-number-format';
import { db } from "../db/firebase-config.js";
import { doc, getDoc} from "firebase/firestore";

const OrderDetail = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Obtenemos la orden generada
  const getOrderDetail = async (id) => {
    setIsLoading(true);
    const docRef = doc(db, "orders", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
      setOrder(docSnap.data());
      setIsLoading(false);
    } else {
      setOrder(null);
    }
  };

  useEffect(() =>  {
    getOrderDetail(orderId);
  }, []);

  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Gracias por tu compra!
      </Heading>
      <Heading as="h2" size="sm" mt={6} mb={2}>
        Nº {orderId}
      </Heading>
      <Text color={'gray.500'}>
        A continuación se encuentra el detalle de tu compra:
      </Text>
      <Skeleton isLoaded={!isLoading}>
          { order!==null &&
            <Flex h="100%" py={10}>
              <VStack w="full" h="full" p={2} spacing={10} alignItems="flex-start">
                <HStack spacing={6} alignItems="center" w="full">
                  <Text color={'gray.800'}>Nombre:</Text>
                  <Text color={'gray.500'}>{order.name} {order.lastName}</Text>
                </HStack>
                <HStack spacing={6} alignItems="center" w="full">
                  <Text color={'gray.800'}>Dirección:</Text>
                  <Text color={'gray.500'}>{order.address} {order.city}</Text>
                </HStack>
                <HStack spacing={6} alignItems="center" w="full">
                  <Text color={'gray.800'}>Email:</Text>
                  <Text color={'gray.500'}>{order.email} / {order.phone}</Text>
                </HStack>
              </VStack>
              <VStack w="full" h="full" p={2} spacing={10} alignItems="flex-start" bg={'gray.100'}>
                {order.items.map((item) => (
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
                        <HStack spacing={0} alignItems="flex-start">
                          <Text size="xs">{item.quantity} x <NumericFormat value={item.product.price} displayType="text" thousandSeparator="." prefix={'$'} decimalSeparator="," /></Text>
                        </HStack>
                      </VStack>
                      <Heading size="xs" textAlign="end">
                        <NumericFormat value={item.quantity * item.product.price} displayType="text" thousandSeparator="." prefix={'$'} decimalSeparator="," />
                      </Heading>
                    </Stack>
                  </HStack>
              ))}
                <Divider />
                <HStack justifyContent="space-between" w="full">
                  <Text color="gray.800">Total</Text>
                  <Heading size="lg">
                    <NumericFormat value={order.totalAmount} displayType="text" thousandSeparator="." prefix={'$'} decimalSeparator="," />
                  </Heading>
                </HStack>
              </VStack>
            </Flex>
          }
      </Skeleton>
    </Box>
  );
};

export default OrderDetail;
