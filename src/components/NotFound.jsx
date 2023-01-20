import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, red.400, red.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Ups página no encontrada
      </Text>
      <Text color={'gray.500'} mb={6}>
        La página que estas accediento no existe, lo sentimos!
      </Text>

      <Button
        colorScheme="blackAlpha"
        bgGradient="linear(to-r, blackAlpha.400, blackAlpha.500, blackAlpha.600)"
        color="white"
        as={RouterLink}
        to="/"
        variant="solid">
        Ir al inicio
      </Button>
    </Box>
  )
}

export default NotFound;
