import * as React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import customTheme from '../../styles/theme';

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeScript initialColorMode={'light'} />
      <EmotionThemeProvider theme={customTheme}>
        { children}
      </EmotionThemeProvider>
    </ChakraProvider>
  )
}

export default ThemeProvider;
