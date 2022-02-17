import * as React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
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
  useColorModeValue,
  useDisclosure,
  Td,
  Skeleton,
} from '@chakra-ui/react';
import SidebarWithHeader from '../components/Sidebar';
import CreateProductModal from '../components/CreateProductModal';
import ProductsList from '../components/ProductsList';
import { useProducts } from '../hooks/useProducts';

export default function Products() {
  const { isFetching } = useProducts();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputSearch, setInputSearch] = React.useState('');
  const timeoutRef: { current: NodeJS.Timeout | null } = React.useRef(null);

  React.useEffect(() => {
    document.title = 'Produtos';
  })

  function handleSearch(e: React.FormEvent<HTMLInputElement>) {
    const input = e.currentTarget.value;
    setInputSearch(input)

    clearTimeout(timeoutRef.current as NodeJS.Timeout);

    const timeout = setTimeout(() => {
      console.log(input);
      timeoutRef.current = null;
    }, 1000)
    timeoutRef.current = timeout;
  }

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
            bg='brand.500'
            _hover={{ bg: 'brand.400' }}
            color='white'
            fontWeight='400'
            onClick={onOpen}
          >
            Criar Produto
          </Button>
        </Flex>
        <CreateProductModal isOpen={isOpen} onClose={onClose} />
        <Box
          bg={useColorModeValue('white', 'gray.900')}
          w="100%"
          p="5"
          rounded='md'
        >
          <InputGroup mb='5' maxW='80'>
            <Input
              placeholder='Buscar...'
              value={ inputSearch }
              onChange={ handleSearch }
            />
            <InputRightElement
              children={
                <BiSearchAlt size='20' style={{ color: '#5850ec' }} />
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
                { isFetching && (
                  <Tbody>
                    <Tr>
                      <Td><Skeleton height='20px' /></Td>
                      <Td><Skeleton height='20px' /></Td>
                      <Td><Skeleton height='20px' /></Td>
                    </Tr>
                  </Tbody>
                )}
                <ProductsList />
            </Table>
          </Box>
        </Box>
      </Box>
    </SidebarWithHeader>
  );
}
