import { Component, onMount, onCleanup } from "solid-js";

import logo from "./logo.svg";
import css from "./App.module.scss";
import { Routes, Route } from "@solidjs/router";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";
import Cart from "./pages/Cart/Cart";
import Store from "./pages/Store/Store";

const App: Component = () => {
	const isLogged = localStorage.getItem("LOGIN");
	!isLogged && localStorage.removeItem("CART");
	return (
		<div class={css.app}>
			<Header />
			<Routes>
				<Route path="/account" component={Account} />
				<Route path="/cart" component={Cart} />
				<Route path="/" component={Store} />
			</Routes>
		</div>
	);
};

export default App;
