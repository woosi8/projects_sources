import React from "react";
import { useHistory } from "react-router-dom";

const Home = (props) => {
	const history = useHistory(); // props로 component안해줘도 history받아오게 하는법
	return (
		<>
			<h1>Profile</h1>
			<button
				onClick={() => {
					history.push("/Home");
				}}
			>
				Go to Home
			</button>
		</>
	);
};

export default Home;
