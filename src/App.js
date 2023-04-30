import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import themes from "./themes";
import NavigationScroll from "./layout/NavigationScroll";
import Authenticated from "./Routes/Authenticated/Authenticated.component";
import Unauthenticated from "./Routes/Unauthenticated/Unauthenticated.component";
import { getOwnData } from "./services/caterer";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#fe724c",
//     },
//   },
//   components: {
//     // Name of the component
//     MuiButton: {
//       styleOverrides: {
//         contained: {
//           color: "#fff",
//         },
//       },
//     },
//   },
// });

function App() {
  const [user, setUser] = useState(null);

  const customization = useSelector((state) => state.customization);

  const getUser = useCallback(async () => {
    const user = await getOwnData();

    setUser(user);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) getUser();
  }, [getUser]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <div className="App">
            {user ? <Authenticated /> : <Unauthenticated />}
          </div>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
