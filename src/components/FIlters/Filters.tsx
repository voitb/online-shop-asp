import { Component } from "solid-js";
import Input from "../Input/Input";
import Select from "../Select/Select";
import css from "./Filters.module.scss";

const Filters: Component<{
	methods: { onSearch: Function; onCategory: Function };
}> = (props) => {
	const {
		methods: { onSearch, onCategory },
	} = props;

	return (
		<div class={css.filters}>
			Search for product
			<Input placeholder="type to search" onChange={onSearch} />
			<Select onChange={onCategory} />
		</div>
	);
};
export default Filters;
