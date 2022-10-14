import {
	Component,
	For,
	createSignal,
	createEffect,
	onMount,
	onCleanup,
} from "solid-js";
import { useApp } from "../../context/AppContext/AppProvider";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import css from "./Header.module.scss";

const Header: Component = () => {
	const { direction } = useApp();
	return (
		<div
			classList={{
				[css["header"]]: true,
				[css["header-up"]]: direction() === "up",
				[css["header-down"]]: direction() === "down",
			}}
		>
			<HeaderMenu />
		</div>
	);
};

export default Header;
