import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import SidebarWithHeader from '../components/Sidebar';

export default function Profile() {
  React.useEffect(() => {
    document.title = 'Meu perfil'
  }, [])

  return (
    <SidebarWithHeader>
      <Box p="2" maxW='1120px' m='auto'>
        <Heading as='h3' fontSize='x-large'>
          Meu perfil
        </Heading>
        <Box mt='10'>
          <Heading as='h3' fontSize='lg' fontWeight='500'>
            Dados gerais
          </Heading>
          <Text color='gray.500'>
            Informações sobre a sua conta
          </Text>
        </Box>

        <Box bg={useColorModeValue('white', 'gray.700')} rounded='md' p={ 4 } mt={ 4 }>
          <Box>
            <Text color='gray.500'>Foto</Text>
            <Flex align='center' mt='2'>
              <Box mr='4'>
                <Avatar
                  size='md'
                  src={'https://github.com/marcioecom.png'}
                />
              </Box>
              <Button variant='outline' fontWeight='500'>
                Alterar
              </Button>
            </Flex>
          </Box>

          <Box mt={ 8 }>
            <Text color='gray.500' mb='2'>Nome</Text>
            <Input maxW='300px' defaultValue="Márcio Júnior" />
          </Box>

          <Box mt={ 8 }>
            <Text color='gray.500' mb='2'>Email</Text>
            <Text>teste@mail.com</Text>
          </Box>

          <Box mt={ 8 }>
            <Text color='gray.500' mb='2'>Senha</Text>
            <Button variant='outline' fontWeight='500'>
              Alterar Senha
            </Button>
          </Box>

          <Flex justify='flex-end' mt={ 8 }>
            <Button
              size="sm"
              bg='#5850ec'
              color='white'
              fontWeight='400'
            >
              Salvar Alterações
            </Button>
          </Flex>
        </Box>

        <Box mt='10'>
          <Heading as='h3' fontSize='lg' fontWeight='500'>
            Endereço
          </Heading>
          <Text color='gray.500'>
            Para entrega das suas premiações
          </Text>
        </Box>

        <Box bg={useColorModeValue('white', 'gray.700')} rounded='md' p={ 4 } mt={ 4 }>
          <Box mt={ 8 }>
            <Text color='gray.500' mb='2'>CEP</Text>
            <Input maxW='160px' />
          </Box>

          <Box mt={ 8 }>
            <Text color='gray.500' mb='2'>Endereço</Text>
            <Input maxW='300px' />
          </Box>

          <Box mt={ 8 }>
            <Text color='gray.500' mb='2'>Número*</Text>
            <Input maxW='100px' />
          </Box>

          <Box mt={ 8 }>
            <Text color='gray.500' mb='2'>Complemento</Text>
            <Input maxW='300px' />
          </Box>

          <Box mt={ 8 }>
            <Text color='gray.500' mb='2'>Bairro</Text>
            <Input maxW='300px' />
          </Box>

          <Box mt={ 8 }>
            <Text color='gray.500' mb='2'>Cidade</Text>
            <Input maxW='300px' />
          </Box>

          <Box mt={ 8 }>
            <Text color='gray.500' mb='2'>Estado</Text>
            <Select maxW='150px'></Select>
          </Box>

          <Flex justify='flex-end' mt={ 8 }>
            <Button
              size="sm"
              bg='#5850ec'
              color='white'
              fontWeight='400'
            >
              Salvar Alterações
            </Button>
          </Flex>
        </Box>
      </Box>
    </SidebarWithHeader>
  );
}
