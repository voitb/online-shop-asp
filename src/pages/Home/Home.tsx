import { Component, Index, onMount } from "solid-js";
import Card1 from "../../assets/card-images/card1.jpg";
import Card from "../../components/Card/Card";
import css from "./Home.module.scss";

export type Item = {
	imageUrl: string;
	text: string;
	align: "right" | "left";
};

const mainCards: Item[] = [
	{
		imageUrl: Card1,
		text: "“We cannot solve problems with the kind of thinking we employed when we came up with them.” — Albert Einstein. In Samsung we are trying to resolve these problems and help you with them",
		align: "right",
	},
	{
		imageUrl: Card1,
		text: "“We cannot solve problems with the kind of thinking we employed when we came up with them.” — Albert Einstein. In Samsung we are trying to resolve these problems and help you with them",
		align: "right",
	},
	{
		imageUrl: Card1,
		text: "“We cannot solve problems with the kind of thinking we employed when we came up with them.” — Albert Einstein. In Samsung we are trying to resolve these problems and help you with them",
		align: "right",
	},
	{
		imageUrl: Card1,
		text: "“We cannot solve problems with the kind of thinking we employed when we came up with them.” — Albert Einstein. In Samsung we are trying to resolve these problems and help you with them",
		align: "right",
	},
];

const Home: Component = (props) => {
	return (
		<div class={css.home}>
			<Index each={mainCards}>{(item) => <Card data={item()} />}</Index>
		</div>
	);
};

export default Home;
