/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "./index.scss";
import App from "./App";
import { AppProvider } from "./context/AppContext/AppProvider";

render(
	() => (
		<AppProvider>
			<Router>
				<App />
			</Router>
		</AppProvider>
	),
	document.getElementById("root") as HTMLElement
);
