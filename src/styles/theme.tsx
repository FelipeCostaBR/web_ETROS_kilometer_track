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
  components: {
    Text: {
      variants: {
        card: {
          bg: 'white',
          color: 'blackAlpha.900',
          paddingX: '0.75rem',
          paddingY: '0.4rem',
          borderRadius: '4px'
        }
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: 'blackAlpha.900',
        color: '#FEFEFE',
      }
    },
  }
});
