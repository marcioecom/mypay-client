import * as React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { FiEdit, FiLink, FiMoreVertical } from 'react-icons/fi';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
} from '@chakra-ui/react';
import SidebarWithHeader from '../components/Sidebar';

export default function Products() {
  React.useEffect(() => {
    document.title = 'Produtos'
  }, [])

  return (
    <SidebarWithHeader>
      <Box p="2" maxW='1120px' m='auto'>
        <Flex
          justify='space-between'
          align='center'
          mb="7"
        >
          <Heading fontSize='x-large'>
            Produtos
          </Heading>

          <Button
            size="md"
            bg='#5850ec'
            color='white'
            fontWeight='400'
          >
            Criar Produto
          </Button>
        </Flex>
        <Box
          bg="white"
          w="100%"
          p="5"
          rounded='md'
        >
          <InputGroup mb='5'>
            <Input placeholder='Buscar...' />
            <InputRightElement
              children={
                <BiSearchAlt
                  size='20'
                  style={{ color: '#5850ec' }}
                />
              }
            />
          </InputGroup>

          <Box overflow='auto'>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Preço</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Produto</Td>
                  <Td>97.90</Td>
                  <Td>
                    <Badge colorScheme='green'>
                      Ativo
                    </Badge>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={Button}
                        variant='outline'
                        paddingX={ 2 }
                      >
                        <FiMoreVertical size='22' />
                      </MenuButton>
                      <MenuList>
                        <MenuItem>
                          <FiLink style={{ marginRight: '8px'}} />
                          Ver Links
                        </MenuItem>
                        <MenuItem>
                          <FiEdit style={{ marginRight: '8px'}} />
                          Editar
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </SidebarWithHeader>
  );
}
