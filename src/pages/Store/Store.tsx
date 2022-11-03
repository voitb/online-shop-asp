import { Component, createEffect, createSignal, For, onMount } from "solid-js";
import Filters from "../../components/FIlters/Filters";
import ItemList from "../../components/ItemList/ItemList";
import StoreItem from "../../components/StoreItem/StoreItem";
import css from "./Store.module.scss";

export const createItemOptions = (data: any) => ({
	id: data.id,
	img: data.img,
	title: data.itemname,
	price: data.itemprice,
	status: data.status,
});

const testOptions = [
	{
		id: 1,
		img: "https://prod-api.mediamarkt.pl/api/images/gallery_545_400/thumbnails/images/21/21419900/tu7022-1.jpg",
		title: "Telewizor SAMSUNG UE55TU7022K",
		price: "2000",
		category: 1,
	},
	{
		id: 1,
		img: "https://prod-api.mediamarkt.pl/api/images/gallery_545_400/thumbnails/images/21/21419900/tu7022-1.jpg",
		title: "Telewizor SAMSUNG UE55TU7022K",
		price: "2000",
		category: 1,
	},
	{
		id: 1,
		img: "https://prod-api.mediamarkt.pl/api/images/gallery_545_400/thumbnails/images/21/21419900/tu7022-1.jpg",
		title: "Telewizor SAMSUNG UE55TU7022K",
		price: "2000",
		category: 1,
	},
	{
		id: 1,
		img: "https://prod-api.mediamarkt.pl/api/images/gallery_545_400/thumbnails/images/21/21419900/tu7022-1.jpg",
		title: "Telewizor SAMSUNG UE55TU7022K",
		price: "2000",
		category: 1,
	},
	{
		id: 1,
		img: "https://prod-api.mediamarkt.pl/api/images/gallery_545_400/thumbnails/images/21/21419900/tu7022-1.jpg",
		title: "Telewizor SAMSUNG UE55TU7022K",
		price: "2000",
		category: 1,
	},
	{
		id: 1,
		img: "https://prod-api.mediamarkt.pl/api/images/gallery_545_400/thumbnails/images/21/21419900/tu7022-1.jpg",
		title: "Telewizor SAMSUNG UE55TU7022K",
		price: "2000",
		category: 1,
	},
];

const Store: Component<{}> = (props) => {
	const [rawOptions, setRawOptions] = createSignal<any>([]);
	const [options, setOptions] = createSignal([]);

	const handleOnCategory = (value: number) => {
		const filtered = rawOptions().filter(
			(option: any) => +option.category === +value
		);
		setOptions(value ? filtered : testOptions);
	};
	const handleOnSearch = (value: string) => {
		const filtered = rawOptions().filter((option: any) =>
			(option.title || option.name).toLowerCase().includes(value.toLowerCase())
		);
		setOptions(filtered);
	};

	onMount(() => {
		fetch("http://localhost:8080/item/getAll", {
			method: "GET",
			mode: "cors",
			headers: { "Content-Type": "application/json" },
		})
			.then((e) => e.json())
			.then((res) => {
				setRawOptions(res);
				setOptions(res);
			});
	});

	return (
		<div class={css.store}>
			<div class={css["store-wrapper"]}>
				<Filters
					methods={{ onSearch: handleOnSearch, onCategory: handleOnCategory }}
				/>

				<ItemList data={{ options: options }} />
			</div>
		</div>
	);
};

export default Store;
