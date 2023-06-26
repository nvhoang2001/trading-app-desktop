import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { createTheme, ThemeProvider } from '@mui/material';

const baseTheme = createTheme({
    typography: {
        fontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
    },
});

export function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={baseTheme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    );
}
