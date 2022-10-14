import { Component } from "solid-js";
import Tooltip from "../Tooltip/Tooltip";
import css from "./StoreItem.module.scss";
const StoreItem: Component<{
	data: { img: string; name: string; price: string };
	methods: { onClick: Function | any };
}> = (props) => {
	const {
		data,
		data: { img, name, price },
		methods: { onClick },
	} = props;
	const loggedValue = localStorage.getItem("LOGIN");
	const isLoggedIn = loggedValue ? true : false;
	const handleOnClick = () => {
		if (!isLoggedIn) return;
		const getCart = localStorage.getItem("CART");
		const value = getCart ? JSON.parse(getCart) : [];
		localStorage.setItem(
			"CART",
			JSON.stringify([...value, { key: value.length + 1, ...data }])
		);
	};

	return (
		<div class={css.item}>
			<div>
				<img src={img} />
				<div class={css["item-wrapper"]}>
					<div>
						<div>{name}</div>
						<div>{price}</div>
					</div>
					<Tooltip visible={!isLoggedIn}>
						<span
							classList={{
								[css["item-button"]]: true,
								[css["item-notlogged"]]: !isLoggedIn,
							}}
							onClick={handleOnClick}
						>
							ADD TO CART
						</span>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

export default StoreItem;
