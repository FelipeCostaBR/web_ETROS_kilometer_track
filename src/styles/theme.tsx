import { extendTheme } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';

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
    },
    Select: {
      baseStyle: {
        field: {
          backgroundColor: 'white',
          color: 'blackAlpha.700'
        },
        icon: {
          color: 'blackAlpha.900',
        }
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: 'blackAlpha.900',
        color: '#FEFEFE',
      },
      option: {
        color: 'red'
      }
    },
  }
});
