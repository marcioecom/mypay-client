import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link as LinkStyle,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { InfoOutlineIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const emailRegex = /^\S+@\w+\.\w{2,6}(\.\w{2})?$/;

  const { handleRegister } = useAuth();
  const history = useHistory();
  const toast = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      await handleRegister({ firstName, lastName, email, password })
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Cadastre-se
          </Heading>
          <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'white')}>
            e aproveite todas funcionalidades ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    value={ firstName }
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Sobrenome</FormLabel>
                  <Input
                    value={ lastName }
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                value={ email }
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <Flex>
                <FormLabel>
                  Senha
                </FormLabel>
                <Popover placement='top-start'>
                  <PopoverTrigger>
                    <IconButton
                      aria-label='info btn'
                      size="xs"
                      icon={ <InfoOutlineIcon /> }
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      A senha precisa ter pelo menos 6 caracteres
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
              <InputGroup>
                <Input
                  value={ password }
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                onClick={ handleSubmit }
                disabled={ !(emailRegex.test(email) && password.length >= 6) }
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Cadastrar
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Já tem conta? <Link to='/login'>
                  <LinkStyle as="span" color='blue.500'>Entrar</LinkStyle>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}