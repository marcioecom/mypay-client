import { theme, Theme, extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
    mono: 'Menlo, monospace'
  },
  fontWeights: {
    ...theme.fontWeights,
    normal: 400,
    medium: 600,
    bold: 700
  },
  radii: {
    ...theme.radii,
    sm: '5px',
    md: '8px'
  },
  colors: {
    ...theme.colors,
    brand: {
      400: "#6875f5",
      500: "#5850ec"
    },
    purple: {
      ...theme.colors.purple,
      500: '#8257e5'
    },
    gray: {
      ...theme.colors.gray,
      300: '#e1e1e6',
      600: '#29292e',
      800: '#121214'
    }
  }
})

export default customTheme;
