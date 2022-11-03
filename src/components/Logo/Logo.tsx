import { Component } from "solid-js";
import { Link } from "@solidjs/router";
import LogoPng from "../../assets/logo.png";
import css from "./Logo.module.scss";

const Logo: Component<{}> = (props) => {
	return (
		<Link href="/">
			<img src={LogoPng} class={css.logo} />
		</Link>
	);
};

export default Logo;
