import { Component, Index, createSignal, Show } from "solid-js";
import Logo from "../Logo/Logo";
import css from "./HeaderMenu.module.scss";
import { Link } from "@solidjs/router";

type Menu = {
	id: number;
	name: string;
	path: string;
	active: boolean;
};

const getMenuSelected = () => {
	switch (window.location.pathname) {
		case "/":
			return 2;
		case "/account":
			return 3;
		case "/cart":
			return 4;
		default:
			return 2;
	}
};

const menu: Menu[] = [
	{ id: 1, name: "logo", path: "/", active: true },
	{ id: 2, name: "store", path: "/", active: true },
	{ id: 3, name: "account", path: "/account", active: true },
	{ id: 4, name: "cart", path: "/cart", active: true },
];

const HeaderMenu: Component = () => {
	const [selected, setSelected] = createSignal<number>(getMenuSelected());

	return (
		<div class={css.menu}>
			<Index each={menu}>
				{(item) => (
					<>
						<Show when={item().name !== "logo"} fallback={<Logo />}>
							<Link href={item().path}>
								<div
									classList={{
										[css["menu_item"]]: true,
										[css["menu_item--active"]]: selected() === item().id,
									}}
									onClick={() => setSelected(item().id)}
								>
									{item().name}
								</div>
							</Link>
						</Show>
					</>
				)}
			</Index>
		</div>
	);
};
export default HeaderMenu;
