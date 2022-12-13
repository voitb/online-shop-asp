import {
	Component,
	createEffect,
	createSignal,
	For,
	Index,
	onMount,
} from "solid-js";
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
		await fetch("https://localhost:7059/api/Purchases", {
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
		const cartValues = cartItems().map((value: any) => ({
			img: value.img,
			itemprice: value.price.toString(),
			itemname: (value.title || value.name).toString(),
			userid: user.id,
			status: "undelivered",
		}));
		fetch("https://localhost:7059/api/Purchases", {
			method: "POST",
			mode: "cors",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(cartValues),
		});
		setCartItems([]);
	};

	const handleOnRemove = async (value: any) => {
		if (!hideHeader) {
			const filtered = cartItems()
				.map((item: any) => {
					if (item.key === value.key) {
						return undefined;
					} else if (item.key > value.key) {
						return { ...item, key: item.key - 1 };
					} else {
						return item;
					}
				})
				.filter(Boolean);
			!hideHeader && localStorage.setItem("CART", JSON.stringify(filtered));
			setCartItems(filtered);
		} else {
			await fetch(`https://localhost:7059/api/Purchases/${value.id}`, {
				method: "PUT",
				mode: "cors",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: value.id,
					img: value.img,
					itemprice: value.price,
					itemname: value.title || value.name,
					userid: user.id,
					status: "delivered",
				}),
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
