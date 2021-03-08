import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import injectAppContext, { AppContext } from "./store/AppContext.js";
import TinNavbar from "./components/TinNavbar.js";
import Home from "./views/Home.js";
import Routine from "./views/Routine.js";
import TinFooter from "./components/TinFooter.js";
import Dashboard from "./views/Dashboard";
import footerContent from "./utils/footerContent.js";
import "./utils/fontAwesomeLibrary";
import Login from "./views/Login.js";
import Register from "./views/Register.js";
import { Container } from "react-bootstrap";
import Loader from "./components/Loader.js";

export const Layout = props => {
	const { store, actions } = useContext(AppContext);
	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
				<TinNavbar />
				{store.authLoading ? (
					<Container fluid="true" className="home-bg-image h-100">
						<Container className="p-0 mb-5">
							<Loader message={"please wait"} />
						</Container>
					</Container>
				) : (
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/dashboard">
							{store.me.isAuthenticated ? (
								<Dashboard />
							) : (
								<Redirect to="/" />
							)}
						</Route>
						<Route path="/routine">
							{store.me.isAuthenticated ? (
								<Routine />
							) : (
								<Redirect to="/" />
							)}
						</Route>
					</Switch>
				)}
				<TinFooter content={footerContent} />
			</BrowserRouter>
		</div>
	);
};

export default injectAppContext(Layout);
