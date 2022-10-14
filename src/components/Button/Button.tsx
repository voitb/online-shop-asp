import { Component } from "solid-js";
import css from "./Button.module.scss";

const Button: Component<{ value: string; onClick: Function | any }> = (
	props
) => {
	const { value, onClick } = props;
	return (
		<div class={css.button} onClick={onClick}>
			{value}
		</div>
	);
};

export default Button;
