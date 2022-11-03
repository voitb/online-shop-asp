import { Component } from "solid-js";
import css from "./AccountData.module.scss";

const AccountData: Component<{ login?: string; address?: string }> = (
	props
) => {
	const { login, address } = props;
	const getAccountValues: any = localStorage.getItem("LOGIN");
	const parsedValue = JSON.parse(getAccountValues);
	return (
		<div class={css["account-data"]}>
			<div class={css["account-data-header"]}>ACCOUNT DATA</div>
			<div class={css["account-data-row"]}>
				<span>Name:</span> {login || parsedValue?.login}
			</div>
			<div class={css["account-data-row"]}>
				<span>Adress:</span> {address || parsedValue?.address}
			</div>
		</div>
	);
};

export default AccountData;
