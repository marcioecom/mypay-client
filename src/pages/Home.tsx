import * as React from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import NavBar from '../components/NavBar';
import { useHistory } from 'react-router-dom';
import Features from '../components/Features';
import Footer from '../components/Footer';

function Home() {
  const history = useHistory();

  return (
    <>
      <NavBar />
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 10, md: 20 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Make money from <br />
            <Text as={'span'} color={'green.400'}>
              your audience
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Monetize your content by charging your most loyal readers and reward
            them loyalty points. Give back to your loyal readers by granting
            them access to your pre-releases and sneak-peaks.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'purple'}
              color='white'
              bg={'#5850ec'}
              px={6}
              rightIcon={<FiArrowRight />}
              onClick={() => history.push('/products')}
            >
              Cadastrar
            </Button>
          </Stack>
        </Stack>

        <Stack
          as={Box}
          py={{ base: 10, md: 20 }}
        >
          <Features />
        </Stack>
      </Container>
      <Footer />
    </>
  )
}

export default Home;
