import { Component } from "solid-js";
import Divider from "../../../../components/Divider/Divider";
import Login from "../../../../components/Login/Login";

const LoginPage: Component<{}> = (props) => {
	const handleOnLogin = async (data: any) => {
		let user: any;

		await fetch("http://localhost:8080/user/getAll", {
			method: "GET",
			mode: "cors",
			headers: { "Content-Type": "application/json" },
		})
			.then((e) => e.json())
			.then((res) => {
				user = res.find((reqUser: any) => reqUser.login === data.login);
			});

		if (user?.password === data?.password) {
			localStorage.setItem(
				"LOGIN",
				JSON.stringify({
					id: user.id,
					login: user.login,
					address: user.address,
					admin: user.admin,
				})
			);
			document.location.href = "/";
		} else {
			return "ERROR";
		}
	};
	const handleOnCreate = (data: any) => {
		const registerData = { ...data, admin: data.login.includes("admin") };
		fetch("http://localhost:8080/user/add", {
			method: "POST",
			mode: "cors",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(registerData),
		});
	};
	return (
		<>
			<Login value="Login" onClick={handleOnLogin} />
			<Divider />
			<Login value="Create" onClick={handleOnCreate} register />
		</>
	);
};

export default LoginPage;
