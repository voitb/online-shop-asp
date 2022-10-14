import { Component, createEffect, createSignal, For } from "solid-js";
import StoreItem from "../StoreItem/StoreItem";
import css from "./ItemList.module.scss";
const ItemList: Component<{ data: { options: any } }> = (props) => {
	const {
		data: { options },
	} = props;

	const [localOptions, setLocalOptions] = createSignal(options());
	createEffect(() => {
		setLocalOptions(options());
	});
	return (
		<div class={css.list}>
			<For each={localOptions()}>
				{(item) => (
					<StoreItem data={item as any} methods={{ onClick: () => {} }} />
				)}
			</For>
		</div>
	);
};

export default ItemList;
