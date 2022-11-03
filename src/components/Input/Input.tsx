import { Component, createEffect } from "solid-js";
import css from "./Input.module.scss";

const Input: Component<{
	value?: string;
	placeholder: string;
	type?: string;
	onChange: Function;
}> = (props) => {
	const { value, placeholder, type, onChange } = props;
	return (
		<input
			classList={{ [css.input]: true }}
			placeholder={placeholder}
			value={value || ""}
			type={type || "text"}
			onKeyUp={(e: any) => onChange(e.target.value)}
		/>
	);
};

export default Input;
