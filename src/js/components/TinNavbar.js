import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import tintrackIcon from "../../assets/icons/favicon.svg";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import { AppContext } from "../store/AppContext";
import { Button } from "react-bootstrap";

const TinNavbar = props => {
	const location = useLocation();
	const history = useHistory();
	const { store, actions } = useContext(AppContext);
	const handleLogout = async e => {
		console.log("logging out");
		await actions.fetchLogUserOut();
		history.push("/");
	};
	return (
		<Navbar
			collapseOnSelect
			variant="dark"
			bg="dark"
			expand="md"
			sticky="top"
		>
			<Container>
				<Navbar.Brand className="d-flex">
					<img src={tintrackIcon} height="48" alt="tintrack logo" />
					<div className="brand-title d-none d-md-block">
						Tintrack
					</div>
				</Navbar.Brand>
				{!store.authLoading && (
					<React.Fragment>
						<Navbar.Toggle aria-controls="navbar-pills" />
						<Navbar.Collapse
							id="navbar-pills"
							className="justify-content-end py-2"
						>
							<Nav
								variant="pills"
								activeKey={location.pathname}
								defaultActiveKey={location.pathname}
							>
								<Nav.Item className="mx-md-1">
									<Nav.Link
										className="px-2 text-right"
										as={NavLink}
										exact
										to="/"
										eventKey="Home"
									>
										Home
									</Nav.Link>
								</Nav.Item>
								{store.me.isAuthenticated ? (
									<React.Fragment>
										<Nav.Item className="mx-md-1">
											<Nav.Link
												as={NavLink}
												exact
												to="/dashboard"
												eventKey="Dashboard"
												className="px-2 text-right"
											>
												Dashboard
											</Nav.Link>
										</Nav.Item>
										<Nav.Item className="mx-md-1">
											<Nav.Link
												as={NavLink}
												exact
												to="/routine"
												eventKey="Routine"
												className="px-2 text-right"
											>
												Routine
											</Nav.Link>
										</Nav.Item>
										<Nav.Item className="mx-md-1">
											<Nav.Link
												as={NavLink}
												isActive={() => false}
												to="#"
												onSelect={handleLogout}
												eventKey="Logout"
												className="px-2 text-right"
											>
												Logout
											</Nav.Link>
										</Nav.Item>
									</React.Fragment>
								) : (
									<React.Fragment>
										<Nav.Item className="mx-md-1">
											<Nav.Link
												as={NavLink}
												exact
												to="/register"
												eventKey="Register"
												className="px-2 text-right"
											>
												Sign up
											</Nav.Link>
										</Nav.Item>
										<Nav.Item className="mx-md-1">
											<Nav.Link
												as={NavLink}
												exact
												to="/login"
												eventKey="Login"
												className="px-2 text-right"
											>
												Log in
											</Nav.Link>
										</Nav.Item>
									</React.Fragment>
								)}
							</Nav>
						</Navbar.Collapse>
					</React.Fragment>
				)}
			</Container>
		</Navbar>
	);
};

export default TinNavbar;
