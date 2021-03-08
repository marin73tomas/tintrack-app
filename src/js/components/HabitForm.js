import React, { useState, useContext, useEffect } from "react";
import {
	Container,
	Button,
	Form,
	Image,
	ButtonGroup,
	Row
} from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskIcon from "./TaskIcon";
import { AppContext } from "../store/AppContext";
import { validateString, validateNumber } from "../utils/validators";
import { useHistory, Prompt, useRouteMatch } from "react-router-dom";
import { numberToDigits, digitsToNumber } from "../utils/helpers";
import FormInput from "./FormInput";
import FormQtyButtons from "./FormQtyButtons";
import IconSelector from "./IconSelector";

const HabitForm = ({ add, title }) => {
	const match = useRouteMatch();
	const { store, actions } = useContext(AppContext);
	const history = useHistory();
	const [name, setName] = useState({
		input: {
			value: "",
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	const [message, setMessage] = useState({
		input: {
			value: "",
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	const [period, setPeriod] = useState("daily");
	const [goal, setGoal] = useState({
		input: {
			value: "",
			isValid: false,
			error: ""
		},
		firstBlood: true
	});
	const [selectedIcon, setSelectedIcon] = useState("default-habit");
	const [toBeEnforced, setToBeEnforced] = useState(true);
	const [formState, setFormState] = useState({
		kind: "create",
		success: false
	});
	const [original, setOriginal] = useState({
		name: "",
		message: "",
		period: "daily",
		goal: "",
		selectedIcon: "default-habit",
		toBeEnforced: true
	});
	const formHasChanged = () => {
		if (
			original.name === name.input.value &&
			original.message === message.input.value &&
			original.period === period &&
			original.goal === goal.input.value &&
			original.selectedIcon === selectedIcon &&
			original.toBeEnforced === toBeEnforced
		) {
			return false;
		} else {
			return true;
		}
	};
	const formIsReady = () => {
		if (
			name.input.value &&
			!name.input.error &&
			message.input.value &&
			!message.input.error &&
			goal.input.value &&
			!goal.input.error &&
			period != "" &&
			selectedIcon != ""
		) {
			return true;
		} else {
			return false;
		}
	};
	const handleSubmit = async event => {
		event.preventDefault();
		event.stopPropagation();
		// build habit object and fetch to create or edit habit
		let newHabitCounter = {
			name: name.input.value,
			personalMessage: message.input.value,
			targetPeriod: period,
			targetValue: goal.input.value,
			iconName: selectedIcon,
			toBeEnforced: toBeEnforced
		};
		if (add) {
			let habitCreated = await actions.fetchCreateHabit(newHabitCounter);
			if (habitCreated) {
				setFormState({
					...formState,
					success: true
				});
				await actions.fetchGetRoutine();
			}
		} else {
			let habitEdited = await actions.fetchEditHabit(
				newHabitCounter,
				match.params.id
			);
			if (habitEdited) {
				setFormState({
					...formState,
					success: true
				});
				await actions.fetchGetRoutine();
			}
		}
	};
	const handleBeforeUnload = event => {
		if (!formState.success) {
			event.preventDefault();
			event.returnValue = true;
		}
	};
	// initial effects
	useEffect(() => {
		// initial effects
		// if not add, must fetch habit info based on its id
		const prepHabitForEdit = async habitId => {
			let habit = await actions.fetchGetHabit(habitId);
			if (habit) {
				setName({
					...name,
					input: {
						...name.input,
						value: habit.name,
						isValid: true
					}
				});
				setMessage({
					...message,
					input: {
						...message.input,
						value: habit.personalMessage,
						isValid: true
					}
				});
				setGoal({
					...goal,
					input: {
						...goal.input,
						value: digitsToNumber(habit.targetValues),
						isValid: true
					}
				});
				setPeriod(habit.targetPeriod);
				setSelectedIcon(habit.iconName);
				setToBeEnforced(habit.toBeEnforced);
				setFormState({
					...formState,
					kind: "edit"
				});
				setOriginal({
					name: habit.name,
					message: habit.personalMessage,
					period: habit.targetPeriod,
					goal: digitsToNumber(habit.targetValues),
					selectedIcon: habit.iconName,
					toBeEnforced: habit.toBeEnforced
				});
			}
		};
		if (!add) {
			prepHabitForEdit(match.params.id);
		}
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);
	return (
		<React.Fragment>
			<Prompt
				when={!formState.success && formHasChanged()}
				message="changes not saved, please confirm you want to cancel."
			/>
			{formState.success ? (
				<Container className="outcome-message">
					<h3 className="mx-2 mb-4 mr-md-4 mt-md-4">
						{formState.kind + " habit was successful!"}
					</h3>
					<Button
						variant="success"
						onClick={e =>
							history.replace("/routine", "habit created!")
						}
					>
						{"Back to routine"}
					</Button>
				</Container>
			) : (
				<Form onSubmit={handleSubmit}>
					<Container
						className={
							add ? "form-tools form-tools-add" : "form-tools"
						}
					>
						<div className="form-title">
							<h4 className="p-0 my-auto">{title}</h4>
						</div>
						<div className="save text-center">
							<Button
								block
								variant="success"
								type="submit"
								disabled={!formIsReady() || !formHasChanged()}
							>
								{add ? "create" : "save"}
							</Button>
						</div>
						<div className="cancel text-center">
							<Button
								block
								variant="danger"
								onClick={e => {
									history.goBack();
								}}
							>
								{"cancel"}
							</Button>
						</div>
					</Container>
					<Container className="form-wrapper">
						<div className="form-body px-md-4 px-lg-5 py-2">
							<Form.Row>
								<FormInput
									className="col-md-8"
									inputAs="input"
									label="name"
									placeholder="name for habit"
									state={name}
									setState={setName}
									validate={{
										minLength: 3,
										maxLength: 30,
										allowNumbers: true
									}}
								/>
								<Form.Group className="col-md-4 d-flex justify-content-around align-items-start pt-4">
									<Form.Check
										onChange={e => setToBeEnforced(true)}
										custom
										type="radio"
										label="enforce"
										name="radio-enforce"
										id="radioEnforce"
										checked={toBeEnforced}
									/>
									<Form.Check
										onChange={e => setToBeEnforced(false)}
										custom
										type="radio"
										label="quit"
										name="radio-quit"
										id="radioQuit"
										checked={!toBeEnforced}
									/>
								</Form.Group>
							</Form.Row>
							<FormInput
								inputAs="textarea"
								label="personal message"
								placeholder="why you want to enforce or quit this habit..."
								state={message}
								setState={setMessage}
								validate={{
									minLength: 10,
									maxLength: 240,
									allowNumbers: true
								}}
							/>
							<div className="form-row">
								<Form.Group className="col-6 col-lg-7">
									<Form.Label>{"control period"}</Form.Label>
									<Form.Control
										value={period}
										as="select"
										onChange={e => {
											setPeriod(e.target.value);
										}}
									>
										<option>{"daily"}</option>
										<option>{"weekly"}</option>
										<option>{"monthly"}</option>
									</Form.Control>
								</Form.Group>
								<FormInput
									className="col-3"
									inputAs="quantity"
									label="goal"
									placeholder="0"
									state={goal}
									setState={setGoal}
									validate={{
										minQty: 1,
										maxQty: 99
									}}
								/>
								<div className="col-3 col-lg-2 form-qty-buttons">
									<FormQtyButtons
										state={goal}
										setState={setGoal}
										validate={{
											minQty: 1,
											maxQty: 99
										}}
									/>
								</div>
							</div>
							<IconSelector
								icons="habitIcons"
								label="icon for habit"
								size={64}
								color="#343A40"
								state={selectedIcon}
								setState={setSelectedIcon}
							/>
						</div>
					</Container>
				</Form>
			)}
		</React.Fragment>
	);
};

export default HabitForm;

HabitForm.propTypes = {
	add: PropTypes.bool,
	title: PropTypes.string
};
