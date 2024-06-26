import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {
    StyledEngineProvider,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

import App from "./App";

import store from "./store/store";

const theme = createTheme({
    typography: {
        fontFamily: "Montserrat",
    },
    palette: {
        white: {
            main: "#ffffff",
        },
        black: {
            main: "#000000",
        },
    },
});

const root = createRoot(document.getElementById("root"));
root.render(
    <>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <Provider store={store}>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </Provider>
                </ThemeProvider>
            </StyledEngineProvider>
        </GoogleOAuthProvider>
    </>
);
