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
  function convertCurrency(price: number) {
    let value = `${price}`;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return value;
  }

  function renderBadge(type: string) {
    if (type === "active") {
      return (
        <Badge colorScheme='green'>
          Ativo
        </Badge>
      )
    }

    if (type === "disabled") {
      return (
        <Badge colorScheme='gray'>
          Desativado
        </Badge>
      )
    }
  }

  return (
    <Tbody>
      { products.map((product: Product) => (
        <Tr key={product.id}>
          <Td>{product.name}</Td>
          <Td color='gray.500' whiteSpace='nowrap'>
            { `R$ ${convertCurrency(product.price)}` }
          </Td>
          <Td>
            { renderBadge(product.status) }
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