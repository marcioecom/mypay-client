import * as React from 'react';
import { FiEdit, FiLink, FiMoreVertical } from 'react-icons/fi';
import {
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Tr,
  Button,
  Tbody,
} from '@chakra-ui/react';

interface Product {
  id: string;
  name: string;
  price: number;
  status: string;
}

interface ProductsListProps {
  products: Product[];
}
 
const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <Tbody>
      { products.map((product: Product) => (
        <Tr key={product.id}>
          <Td>{product.name}</Td>
          <Td>97.90</Td>
          <Td>
            <Badge colorScheme='green'>
              Ativo
            </Badge>
          </Td>
          <Td textAlign='center'>
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
      )) }
    </Tbody>
  );
}
 
export default ProductsList;