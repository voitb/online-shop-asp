import { Component } from "solid-js";
import AccountData from "../../../../components/AccountData/AccountData";
import Button from "../../../../components/Button/Button";
import Cart from "../../../Cart/Cart";
import css from "./AccountPage.module.scss";

const AccountPage: Component<{}> = (props) => {
	const handleLogout = () => {
		localStorage.removeItem("LOGIN");
		document.location.href = "/";
	};
	return (
		<div class={css["account-page"]}>
			<AccountData />
			<Cart hideHeader />
			<div class={css["account-button"]}>
				<Button value="logout" onClick={handleLogout} />
			</div>
		</div>
	);
};

export default AccountPage;
