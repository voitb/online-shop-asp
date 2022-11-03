import { Component, createEffect, createSignal, Index } from "solid-js";
import Button from "../Button/Button";
import Input from "../Input/Input";
import LoginInput from "../LoginInput/LoginInput";
import css from "./Login.module.scss";

type Options = {
	title: string;
	value: string;
	placeholder: string;
	onChange: Function;
	type: string;
};

const Login: Component<{
	value: string;
	register?: boolean;
	onClick: Function;
}> = (props) => {
	const { value, register, onClick } = props;
	const [login, setLogin] = createSignal("");
	const [password, setPassword] = createSignal("");
	const [repeatPassword, setRepeatPassword] = createSignal("");
	const [address, setAddress] = createSignal("");
	const [showError, setShowError] = createSignal<string[]>([]);
	const [isPasswordMatch, setIsPasswordMatch] = createSignal<boolean>(false);
	const [accountCreated, setAccountCreated] = createSignal<boolean>(false);
	const [invalidAccount, setInvalidAccount] = createSignal<boolean>(false);

	const options = [
		{
			title: "Login",
			value: login(),
			onChange: setLogin,
			placeholder: "Type in login",
			type: "text",
		},
		{
			title: "Password",
			value: password(),
			onChange: setPassword,
			placeholder: "Type in password",
			type: "password",
		},
		register && {
			title: "Repeat password",
			value: repeatPassword(),
			onChange: setRepeatPassword,
			placeholder: "Type in password again",
			type: "password",
		},
		register && {
			title: "Address",
			value: address(),
			onChange: setAddress,
			placeholder: "Town, Street, Number",
			type: "text",
		},
	].filter(Boolean) as Options[];

	const titleText = register ? "CREATE NEW ACCOUNT" : "LOGIN";

	const handleOnClick = () => {
		const checkValues = [
			!login().length && "Login",
			!password().length && "Password",
		].filter(Boolean) as string[];

		const invalidValues = register
			? ([...checkValues, !repeatPassword().length && "Repeat password"].filter(
					Boolean
			  ) as string[])
			: checkValues;

		const checkPasswords = password() === repeatPassword();

		register && setIsPasswordMatch(!checkPasswords);
		setShowError(invalidValues);
		if (!invalidValues.length || (register && checkPasswords))
			onClick({
				login: login(),
				password: password(),
				address: address(),
			}).then((e: string) => {
				if (e === "ERROR") {
					setInvalidAccount(true);
				}
			});

		setAccountCreated(!invalidValues.length && register ? true : false);
	};

	return (
		<div class={css.login}>
			<div class={css["login-title"]}>{titleText}</div>
			<div>
				<Index each={options}>
					{(item) => {
						return (
							<div class={css["login-item"]}>
								<LoginInput
									title={item().title}
									placeholder={item().placeholder}
									value={item().value}
									type={item().type}
									onChange={item().onChange}
								/>
								{showError().includes(item().title) && (
									<div class={css["login-error"]}>
										This field cannot be empty
									</div>
								)}
							</div>
						);
					}}
				</Index>
				<div class={css["login-button"]}>
					<Button value={value} onClick={handleOnClick} />
					<div class={css["login-mismatch"]}>
						{isPasswordMatch() && "Passwords should be identical"}
					</div>
					<div class={css["login-mismatch"]}>
						{invalidAccount() && "Invalid data provied"}
					</div>
					{accountCreated() && (
						<div class={css["login-created"]}>
							Account has been created, please log in.
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
