import { Component } from "solid-js";
import css from "./Account.module.scss";
import AccountPage from "./components/AccountPage/AccountPage";
import LoginPage from "./components/LoginPage/LoginPage";

const Account: Component<{}> = (props) => {
	const isLogged = localStorage.getItem("LOGIN");

	return (
		<div class={css.account}>{isLogged ? <AccountPage /> : <LoginPage />}</div>
	);
};

export default Account;
