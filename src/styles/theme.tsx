import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    green: {
      light: '#3ACB06'
    },
    cardBg: {
      dark: '#565555'
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
        bg: 'blackAlpha.900',
        color: '#EFEFEF',
      }
    },
  }
});
