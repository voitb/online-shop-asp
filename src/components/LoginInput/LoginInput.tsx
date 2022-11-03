import { Component } from "solid-js";
import Input from "../Input/Input";
import css from "./LoginInput.module.scss";

const LoginInput: Component<{
	title: string;
	value: string;
	placeholder: string;
	type?: string;
	onChange: Function;
}> = (props) => {
	const { title, placeholder, value, type, onChange } = props;
	return (
		<div class={css["login-input"]}>
			<div class={css["login-input-title"]}>{title}</div>
			<Input
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				type={type}
			/>
		</div>
	);
};

export default LoginInput;
