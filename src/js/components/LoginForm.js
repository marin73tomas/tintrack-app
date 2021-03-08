import React, { useState, useContext } from "react";
import { Form, Container, Button } from "react-bootstrap";
import FormInput from "./FormInput";
import { AppContext } from "../store/AppContext";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";

const LoginForm = ({ goBackHandler, goRegisterHandler }) => {
	const { store, actions } = useContext(AppContext);
	let history = useHistory();
	let location = useLocation();
	const [email, setEmail] = useState({
		input: {
			value: store.me.email || "",
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	const [password, setPassword] = useState({
		input: {
			value: "",
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	const formIsFilled = () => {
		if (email.input.value && password.input.value) {
			return true;
		} else {
			return false;
		}
	};
	const formIsReady = () => {
		if (email.input.isValid && password.input.isValid) {
			return true;
		} else {
			return false;
		}
	};
	const handleSubmit = async e => {
		e.preventDefault();
		e.stopPropagation();
		if (formIsReady()) {
			let success = await actions.fetchLogUserIn({
				email: email.input.value,
				password: password.input.value
			});
			// if success log in was successful and
			// we know who user is... otherwise, show alerts...
			if (success) {
				// redirect user
				console.log("now supposed to redirect");
				history.push("/dashboard");
			} else {
				actions.createAuthAlert(
					"Sorry, friend! Credentials you provided do not match our records; check your info and try again...",
					"warning"
				);
				if (location.pathname != "/login") {
					history.push("/login");
				}
			}
		} else {
			console.log("form is not ready");
		}
	};
	return (
		<Form onSubmit={handleSubmit}>
			<div className="form-wrapper-auth">
				<div className="col-md-6">
					<FormInput
						setAutoFocus={true}
						inputAs="email"
						label="email"
						placeholder="your_email@domain.com"
						state={email}
						setState={setEmail}
						validate={{ maxLength: 100 }}
					/>
				</div>
				<div className="col-md-6">
					<FormInput
						inputAs="password"
						label="password"
						placeholder="urP4s$w.rd"
						state={password}
						setState={setPassword}
						validate={{
							minLength: 8,
							maxLength: 50,
							allowNumbers: true
						}}
					/>
				</div>
			</div>
			<div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end mt-3">
				<Button
					variant="success"
					disabled={!formIsFilled()}
					type="submit"
					size="lg"
					className="m-md-2 my-2 mx-0"
				>
					{"Enter tintrack!"}
				</Button>
				<Button
					variant="primary"
					size="lg"
					className="m-md-2 my-2 mx-0"
					onClick={goRegisterHandler}
				>
					{"I'm not registered!"}
				</Button>
				{goBackHandler && (
					<Button
						variant="danger"
						size="lg"
						className="m-md-2 my-2 mx-0"
						onClick={goBackHandler}
					>
						{"Back"}
					</Button>
				)}
			</div>
		</Form>
	);
};

export default LoginForm;

LoginForm.propTypes = {
	goBackHandler: PropTypes.func,
	goRegisterHandler: PropTypes.func
};
