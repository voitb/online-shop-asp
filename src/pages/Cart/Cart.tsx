import { Component, createSignal, For, Index, onMount } from "solid-js";
import Button from "../../components/Button/Button";
import CartItem from "../../components/CartItem/CartItem";
import { createItemOptions } from "../Store/Store";
import css from "./Cart.module.scss";

const Cart: Component<{ hideHeader?: boolean }> = (props) => {
	const { hideHeader } = props;
	const getCart = localStorage.getItem("CART");
	const getUser = localStorage.getItem("LOGIN");
	const user = getUser ? JSON.parse(getUser) : {};
	const items = getCart ? JSON.parse(getCart) : [];
	const values = !hideHeader ? items : [];
	const [cartItems, setCartItems] = createSignal(values);

	const getItems = async () => {
		let orders: any;
		await fetch("http://localhost:8080/purchase/getAll", {
			method: "GET",
			mode: "cors",
			headers: { "Content-Type": "application/json" },
		})
			.then((e) => (orders = e.json()))
			.then((res) => {
				orders = user.admin
					? res.map((order: any) => createItemOptions(order))
					: res
							?.filter((order: any) => order.userid === user.id)
							.map((order: any) => createItemOptions(order));
			});

		return orders;
	};

	onMount(async () => {
		if (!hideHeader) return;
		getItems().then((res) => setCartItems(res));
	});

	const handleOnClick = (id: number) => {
		localStorage.setItem("CART", JSON.stringify([]));
		const cartValues = values.map((value: any) => ({
			img: value.img,
			itemprice: value.price,
			itemname: value.title || value.name,
			userid: user.id,
			status: "undelivered",
		}));
		fetch("http://localhost:8080/purchase/add", {
			method: "POST",
			mode: "cors",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(cartValues),
		});
		setCartItems([]);
	};

	const handleOnRemove = async (id: number) => {
		if (!hideHeader) {
			const filtered = values.filter((value: any) => value.id !== id);
			!hideHeader && localStorage.setItem("CART", JSON.stringify(filtered));
			setCartItems(filtered);
		} else {
			await fetch("http://localhost:8080/purchase/setCompleted", {
				method: "POST",
				mode: "cors",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(id),
			});

			await getItems().then((res) => setCartItems(res));
		}
	};

	return (
		<div classList={{ [css.cart]: true, [css["cart-no-padding"]]: hideHeader }}>
			{!hideHeader && <span>CART</span>}
			<div class={css["cart-wrapper"]}>
				<div class={css["cart-list"]}>
					<For each={cartItems()}>
						{(item, i) => (
							<CartItem
								key={i() + 1}
								data={{ value: item, isCartView: !hideHeader }}
								methods={{ onRemove: handleOnRemove }}
							/>
						)}
					</For>
				</div>
			</div>

			{!hideHeader && cartItems().length && (
				<div class={css["cart-button"]}>
					<div>
						TOTAL:
						{cartItems().reduce((acc: any, item: any) => acc + item?.price, 0)}
					</div>
					<Button value="BUY" onClick={handleOnClick} />
				</div>
			)}
			{!cartItems().length && (
				<div class={css["cart-empty"]}>
					{!hideHeader ? "NO ITEMS IN THE CART" : "NO ORDERS"}
				</div>
			)}
		</div>
	);
};

export default Cart;
