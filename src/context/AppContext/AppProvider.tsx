import {
	createSignal,
	createContext,
	useContext,
	onMount,
	onCleanup,
	Component,
	JSX,
	createEffect,
	batch,
} from "solid-js";

type Props = { children: JSX.Element };

const AppContext = createContext();

export const AppProvider: Component<Props> = (props) => {
	const [scroll, setScroll] = createSignal<number>(0);
	const [direction, setDirection] = createSignal<"up" | "down">("up");

	const handleScroll = () => {
		const position = window.pageYOffset;
		position > scroll() ? setDirection("down") : setDirection("up");
		setScroll(position);
	};
	onMount(() => {
		window.addEventListener("scroll", handleScroll);
	});
	onCleanup(() => window.removeEventListener("scroll", handleScroll));

	const value = {
		scroll,
		setScroll,
		setDirection,
		direction,
	};
	return (
		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
	);
};

export const useApp: any = () => {
	return useContext(AppContext);
};
