import { Component } from "solid-js";
import { Item } from "../../pages/Home/Home";
import css from "./Card.module.scss";

type Props = {
	data: Item;
};

const Card: Component<Props> = (props) => {
	const {
		data: { imageUrl, text },
	} = props;
	return (
		<div class={css.card}>
			<img src={imageUrl} /> {text}
		</div>
	);
};

export default Card;
