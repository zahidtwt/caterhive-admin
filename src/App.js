import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Authenticated from './Routes/Authenticated/Authenticated.component';
import Unauthenticated from './Routes/Unauthenticated/Unauthenticated.component';
import { getOwnData } from './services/caterer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fe724c',
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        contained: {
          color: '#fff',
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    const user = await getOwnData();

    setUser(user);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) getUser();
  }, [getUser]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {user ? <Authenticated /> : <Unauthenticated />}
      </div>
    </ThemeProvider>
  );
}

export default App;
