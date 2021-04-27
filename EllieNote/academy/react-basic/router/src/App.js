import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./components/home";
import Profile from "./components/profile";
function App() {
	return (
		<BrowserRouter>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/profile">Profile</Link>
			</nav>
			<Switch>
				<Route path={["/", "/home"]} exact>
					{/* component로 하면 랜더될때마다 새롭게 마운팅되기때문에 아래처럼 자식component로 전달해줘야한다 */}
					<Home />
				</Route>
				<Route path="/profile">
					<Profile />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
