import { Component, onMount, createSignal } from "solid-js";
import css from "./Select.module.scss";

const Select: Component<{ onChange: Function }> = (props) => {
	const { onChange } = props;

	const [categories, setCategories] = createSignal<any>([]);
	onMount(() => {
		fetch("https://localhost:7059/api/Categories", {
			method: "GET",
			mode: "cors",
			headers: { "Content-Type": " application/json; charset=utf-8" },
		})
			.then((e) => e.json())
			.then((res) => {
				setCategories(
					res.map((option: any) => (
						<option value={option.id}>{option.title}</option>
					))
				);
			});
	});

	const handleOnChange = (event: any) => {
		onChange(event.target.value);
	};
	return (
		<select class={css.select} onChange={handleOnChange}>
			<option selected style={{ color: "grey" }} value={undefined}>
				Select category
			</option>
			{categories()}
		</select>
	);
};

export default Select;
