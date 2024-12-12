import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import createTheme
// import router from "./router";
import router from "./router";

import ReduxProvider from "./store/ReduxProvider"

// Create a theme instance
const theme = createTheme({
	// You can customize your theme here. For example:
	palette: {
		primary: {
			main: "#556cd6",
		},
		secondary: {
			main: "#19857b",
		},
	},
});

createRoot(document.getElementById("root")).render(
	<ThemeProvider theme={theme}>
		<ReduxProvider>
			<RouterProvider router={router} />
		</ReduxProvider>
	</ThemeProvider>

);
