import * as React from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Input,
  Button,
  Select,
  InputLeftElement,
  InputGroup,
  FormErrorMessage,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import api from '../services/api';

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProductModal = ({ isOpen, onClose }: CreateProductModalProps) => {
  const toast = useToast();
  const [paymentMethod, setPaymentMethod] = React.useState('charge');
  const [name, setName] = React.useState('');
  const [nameErr, setNameErr] = React.useState(false);
  const [price, setPrice] = React.useState('');
  const [priceErr, setPriceErr] = React.useState(false);

  function currency(e: React.FormEvent<HTMLInputElement>) {
    const nineBucks = 900;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

    setPrice(value)

    const formatPrice = Number(value.replace(/\W/g, '')); // ou /[,.]/g
    if (formatPrice < nineBucks) {
      return setPriceErr(true);
    }

    setPriceErr(false)
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;

    setName(value)

    if (value === '') return setNameErr(true);

    setNameErr(false)
  }

  async function handleSubmit() {
    const nineBucks = 900;
    const formatPrice = Number(price.replace(/\W/g, '')); // ou /[,.]/g

    if (name === "") return setNameErr(true)
    
    if (formatPrice < nineBucks) return setPriceErr(true);

    const data = {
      paymentMethod,
      name,
      price: formatPrice,
    }

    try {
      await api.post("/products", data)

      toast({
        position: 'top-right',
        title: 'Produto criado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (err: any) {
      toast({
        position: 'top-right',
        title: 'Algo de errado.',
        description: err.response.data.message,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel color={useColorModeValue('gray.600', 'white')} fontWeight='normal'>
              Tipo de pagamento
            </FormLabel>
            <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value='charge'>Pagamento único</option>
              <option value='recurring'>Assinatura recorrente</option>
            </Select>
          </FormControl>

          <FormControl mt={4} isInvalid={nameErr}>
            <FormLabel color={useColorModeValue('gray.600', 'white')} fontWeight='normal'>
              Nome do produto
            </FormLabel>
            <Input
              value={name}
              onChange={(e) => handleChange(e)}
            />
            {nameErr && (
              <FormErrorMessage>Esse campo é obrigatório</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isInvalid={priceErr}>
            <FormLabel color={useColorModeValue('gray.600', 'white')} fontWeight='normal'>
              Preço
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.400'
                children='R$'
              />
              <Input
                placeholder='0,00'
                value={price}
                onChange={currency}
              />
            </InputGroup>
            {priceErr && (
              <FormErrorMessage>O preço mínimo é R$9,00</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            size="md"
            bg='brand.500'
            color='white'
            fontWeight='400'
            w='100%'
            _hover={{ bg: 'brand.400' }}
            disabled={nameErr || priceErr}
            onClick={handleSubmit}
          >
            Criar Produto
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
 
export default CreateProductModal;