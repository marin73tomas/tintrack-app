import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Container, Jumbotron } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Register = props => {
	const history = useHistory();
	return (
		<Container fluid="true" className="home-bg-image h-100">
			<Container className="p-0 mb-5">
				<Jumbotron className="mt-4 mt-lg-5 home-jumbotron px-4 px-md-5">
					<h1 className="display-4 text-center text-md-left">
						{"Welcome, tracker!"}
					</h1>
					<RegisterForm
						goLoginHandler={e => history.push("/login")}
					/>
				</Jumbotron>
			</Container>
		</Container>
	);
};

export default Register;
