import { createMuiTheme } from '@material-ui/core/styles';

// declare module '@material-ui/core/styles/createMuiTheme' {
//   interface Theme {
//     popOverText: {
//       primary: React.CSSProperties['color'],
//     }
//   }
//   interface ThemeOptions {
//     popOverText: {
//       primary: React.CSSProperties['color']
//     }
//   }
// }
  
  declare module "@material-ui/core/styles/createPalette" {
    
    interface Palette {
      app: Palette['primary'];
    }
    interface PaletteOptions {
      app: PaletteOptions['primary'];
    }
    interface Palette {
      popOverText: Palette['primary'];
    }
    interface PaletteOptions {
      popOverText: PaletteOptions['primary'];
    }
  }

export const theme = createMuiTheme({
    palette: {
      // primary: {
      //   main: '#F7CE3E'
      // },
      secondary: {
        main: '#ffffff',
        light: '#ffffff'
      },
      app: {
        main: '#ecf0f1',
      },
      popOverText: {
        main: '#ffffff'
      }
    }
  });