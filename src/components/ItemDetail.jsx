import { Link as RouterLink} from "react-router-dom";
import { useColorModeValue, GridItem, Box, Center, Image, Stack, Button, Heading, Text } from '@chakra-ui/react'
import { NumericFormat } from 'react-number-format';

const ItemDetail = ({ id, title, description, price, brand, image, stock }) => {

  return (
    <GridItem key={id} w='100%' h='100%'>
      <Center py={5}>
        <Box
          alignItems='flex-start'
          role={'group'}
          p={6}
          h={'430px'}
          w={'430px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            align={'center'}
            rounded={'lg'}
            mt={1}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '200px' }}
              rounded={'lg'}
              src={image}
            />
          </Box>
          <Stack pt={2} align={'center'}>
            <Text color={'gray.600'} fontSize={'sm'} textTransform={'uppercase'}>
              {brand}
            </Text>
            <Heading color={'gray.600'} fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
              {title}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Button variant='solid' colorScheme='red' as={RouterLink} to={`/item/${id}`}>
                Ver producto
              </Button>
              <Text color={'gray.800'} fontWeight={500} fontSize={'xl'}>
                <NumericFormat value={price} displayType="text" thousandSeparator="." prefix={'$'} decimalSeparator="," />
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </GridItem>
  );
};

export default ItemDetail;
