import { Component } from "solid-js";
import css from "./Divider.module.scss";

const Divider: Component<{}> = (props) => {
	return (
		<div class={css.divider}>
			<div class={css["divider-line"]}></div>
		</div>
	);
};

export default Divider;
