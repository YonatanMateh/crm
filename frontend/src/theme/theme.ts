import { createMuiTheme } from '@material-ui/core/styles';


  
  declare module "@material-ui/core/styles/createPalette" {
    
    interface Palette {
      app: Palette['primary'];
    }
    interface PaletteOptions {
      app: PaletteOptions['primary'];
    }
  }

export const theme = createMuiTheme({
    palette: {
      app: {
        main: '#ecf0f1',
      },
    },
    overrides: {
        MuiTabs: {}
    }
  });