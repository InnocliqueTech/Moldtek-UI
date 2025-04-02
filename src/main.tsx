import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider as StoreProvider} from 'react-redux';
import {store} from './store/index.ts';
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";  
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/inter/100.css"; // Thin
import "@fontsource/inter/200.css"; // Light
import "@fontsource/inter/300.css"; // Light
import "@fontsource/inter/400.css"; // Light
import "@fontsource/inter/500.css"; // Light
import "@fontsource/inter/600.css"; // SemiBold
import "@fontsource/inter/700.css"; // Light
import "@fontsource/inter/800.css"; // Light
import "@fontsource/inter/900.css"; // Black


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <StoreProvider  store={store}>
    <App />
    </StoreProvider>
    </ThemeProvider>
  </StrictMode>,
)
