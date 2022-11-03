import { ParentComponent } from "solid-js";
import css from "./Tooltip.module.scss";

const Tooltip: ParentComponent<{ visible: boolean }> = (props) => {
	const { children, visible = true } = props;
	return (
		<div class={css.tooltip}>
			{children}
			{visible && (
				<span class={css.tooltiptext}>
					You have to log in to add items to a cart
				</span>
			)}
		</div>
	);
};

export default Tooltip;
