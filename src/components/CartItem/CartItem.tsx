import { Component, createEffect } from "solid-js";
import css from "./CartItem.module.scss";

type Data = {
	value: any;
	isCartView: boolean;
};

const CartItem: Component<{ data: Data; methods: any }> = (props) => {
	const {
		data: { value, isCartView },
		methods: { onClick, onRemove },
	} = props;
	const getLogin = localStorage.getItem("LOGIN");
	const isAdmin = JSON.parse(getLogin as string).admin;

	return (
		<div onClick={onClick} class={css["cart-item"]}>
			<div classList={{ [css["cart-align"]]: true, [css["cart-key"]]: true }}>
				{value?.key}
			</div>
			<div classList={{ [css["cart-align"]]: true, [css["cart-image"]]: true }}>
				<img src={value?.img} />
			</div>
			<div class={css["cart-title"]}>{value?.title || value?.name}</div>
			<div classList={{ [css["cart-align"]]: true, [css["cart-price"]]: true }}>
				{value?.price}
			</div>
			<div
				classList={{ [css["cart-align"]]: true, [css["cart-status"]]: true }}
			>
				{value?.status}
			</div>
			<div
				classList={{
					[css["cart-align"]]: true,
					[css["cart-delete"]]: isCartView,
					[css["cart-completed"]]: true,
				}}
				onClick={() => onRemove(value)}
			>
				{isAdmin && !isCartView && "Set as completed"}
				{isCartView ? "x" : ""}
			</div>
		</div>
	);
};

export default CartItem;
