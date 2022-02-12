import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link as LinkStyle,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const emailRegex = /^\S+@\w+\.\w{2,6}(\.\w{2})?$/;

  const history = useHistory();
  const toast = useToast();
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await handleLogin({ email, password })
      history.push('/products')
    } catch (error: any) {
      toast({
        position: 'top-right',
        title: 'Algo de errado.',
        description: error.message,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'} textAlign='center'>
          <Heading fontSize={'4xl'}>Entrar na sua conta</Heading>
          <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'white')}>
            para aproveitar todas nossas funcionalidades ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                value={ email }
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input
                value={ password }
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack>
                <LinkStyle color={'blue.400'}>Esqueceu a senha?</LinkStyle>
              </Stack>
              <Button
                onClick={ handleSubmit }
                disabled={ !(emailRegex.test(email) && password.length >= 6) }
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Entrar
              </Button>
            </Stack>
            <Stack pt={ 6 }>
              <Text align={'center'}>
                Não tem conta? <Link to='/register'>
                  <LinkStyle as="span" color='blue.500'>Cadastrar</LinkStyle>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
