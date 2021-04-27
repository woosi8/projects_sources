import React from "react";
import { useHistory } from "react-router-dom";

const Home = (props) => {
	const history = useHistory(); // props로 component안해줘도 history받아오게 하는법 :component로 하면 랜더될때마다 새롭게 마운팅되기때문에 자식component로 전달해줘야한다
	return (
		<>
			<h1>Home</h1>
			<button
				onClick={() => {
					history.push("/profile");
				}}
			>
				Go to Profile
			</button>
		</>
	);
};

export default Home;
