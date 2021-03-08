import React, { useState, useContext, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { AppContext } from "../store/AppContext";
import { useHistory, useRouteMatch, Prompt } from "react-router-dom";
import {
	toListWithId,
	toListWithoutId,
	matchWeeksDaysTimes
} from "../utils/helpers";
import FormInput from "./FormInput";
import IconSelector from "./IconSelector";
import ScheduleWeek from "./ScheduleWeek";

const TaskForm = ({ add, title }) => {
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
	const [selectedIcon, setSelectedIcon] = useState("default-task");
	const [formState, setFormState] = useState({
		kind: "create",
		success: false,
		hasChanged: false
	});
	const [weekSched, setWeekSched] = useState([
		{
			weekNumber: 1,
			days: [
				[{ value: "any", id: 1 }],
				[{ value: "any", id: 2 }],
				[{ value: "any", id: 3 }],
				[{ value: "any", id: 4 }],
				[{ value: "any", id: 5 }],
				[{ value: "any", id: 6 }],
				[{ value: "any", id: 7 }]
			]
		},
		{
			weekNumber: 2,
			days: [
				[{ value: "any", id: 10 }],
				[{ value: "any", id: 20 }],
				[{ value: "any", id: 30 }],
				[{ value: "any", id: 40 }],
				[{ value: "any", id: 50 }],
				[{ value: "any", id: 60 }],
				[{ value: "any", id: 70 }]
			]
		},
		{
			weekNumber: 3,
			days: [
				[{ value: "any", id: 21 }],
				[{ value: "any", id: 22 }],
				[{ value: "any", id: 23 }],
				[{ value: "any", id: 24 }],
				[{ value: "any", id: 25 }],
				[{ value: "any", id: 26 }],
				[{ value: "any", id: 27 }]
			]
		},
		{
			weekNumber: 4,
			days: [
				[{ value: "any", id: 71 }],
				[{ value: "any", id: 72 }],
				[{ value: "any", id: 73 }],
				[{ value: "any", id: 74 }],
				[{ value: "any", id: 75 }],
				[{ value: "any", id: 76 }],
				[{ value: "any", id: 77 }]
			]
		}
	]);
	const [original, setOriginal] = useState({
		name: "",
		message: "",
		selectedIcon: "default-task",
		weekSched: [
			{
				weekNumber: 1,
				days: toListWithoutId(weekSched[0].days)
			},
			{
				weekNumber: 2,
				days: toListWithoutId(weekSched[1].days)
			},
			{
				weekNumber: 3,
				days: toListWithoutId(weekSched[2].days)
			},
			{
				weekNumber: 4,
				days: toListWithoutId(weekSched[3].days)
			}
		]
	});
	const handleIconChange = updatedState => {
		setSelectedIcon(updatedState);
		setFormState({
			...formState,
			hasChanged: formHasChanged()
		});
	};
	const handleMessageChange = updatedState => {
		setMessage(updatedState);
		setFormState({
			...formState,
			hasChanged: formHasChanged()
		});
	};
	const handleWeekSchedChange = updatedState => {
		setWeekSched(updatedState);
		setFormState({
			...formState,
			hasChanged: formHasChanged()
		});
	};
	const handleNameChange = updatedState => {
		setName(updatedState);
		setFormState({
			...formState,
			hasChanged: formHasChanged()
		});
	};
	const formHasChanged = () => {
		const originalWeekSched = [];
		const actualWeekSched = [];
		for (let i = 0; i < 4; i++) {
			originalWeekSched.push(original.weekSched[i].days);
			actualWeekSched.push(toListWithoutId(weekSched[i].days));
		}
		const weekSchedSame = matchWeeksDaysTimes(
			originalWeekSched,
			actualWeekSched
		);
		if (
			original.name === name.input.value &&
			original.message === message.input.value &&
			original.selectedIcon === selectedIcon &&
			weekSchedSame
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
			selectedIcon != ""
		) {
			return true;
		} else {
			return false;
		}
	};
	const handleBeforeUnload = event => {
		if (!formState.success && formState.hasChanged) {
			event.preventDefault();
			event.returnValue = true;
		}
	};
	const handleSubmit = async event => {
		event.preventDefault();
		event.stopPropagation();
		let newTask = {
			name: name.input.value,
			personalMessage: message.input.value,
			iconName: selectedIcon,
			weekSched: [
				{
					weekNumber: 1,
					days: toListWithoutId(weekSched[0].days)
				},
				{
					weekNumber: 2,
					days: toListWithoutId(weekSched[1].days)
				},
				{
					weekNumber: 3,
					days: toListWithoutId(weekSched[2].days)
				},
				{
					weekNumber: 4,
					days: toListWithoutId(weekSched[3].days)
				}
			]
		};
		newTask["durationEstimate"] = 30;
		if (add) {
			let taskCreated = await actions.fetchCreateTask(newTask);
			if (taskCreated) {
				setFormState({
					...formState,
					success: true
				});
				await actions.fetchGetRoutine();
			}
		} else {
			let taskEdited = await actions.fetchEditTask(
				newTask,
				match.params.id
			);
			if (taskEdited) {
				setFormState({
					...formState,
					success: true
				});
				await actions.fetchGetRoutine();
			}
		}
	};
	// effect for event beforeunload, handles refresh and weindow/tab
	// closing with unsaved changes.
	useEffect(() => {
		window.removeEventListener("beforeunload", handleBeforeUnload);
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [formState.success, formState.hasChanged]);
	// initial effects
	useEffect(() => {
		const prepareTaskForEdit = async taskId => {
			let task = await actions.fetchGetTask(taskId);
			setName({
				...name,
				input: {
					...name.input,
					value: task.name,
					isValid: true
				}
			});
			setMessage({
				...message,
				input: {
					...message.input,
					value: task.personalMessage,
					isValid: true
				}
			});
			setSelectedIcon(task.iconName);
			setWeekSched([
				{
					weekNumber: 1,
					days: toListWithId(task.weekSched[0].days)
				},
				{
					weekNumber: 2,
					days: toListWithId(task.weekSched[1].days)
				},
				{
					weekNumber: 3,
					days: toListWithId(task.weekSched[2].days)
				},
				{
					weekNumber: 4,
					days: toListWithId(task.weekSched[3].days)
				}
			]);
			setFormState({
				...formState,
				kind: "edit"
			});
			setOriginal({
				name: task.name,
				message: task.personalMessage,
				selectedIcon: task.iconName,
				weekSched: task.weekSched
			});
		};
		if (!add) {
			prepareTaskForEdit(match.params.id);
		}
		return () => {};
	}, []);
	return (
		<React.Fragment>
			<Prompt
				when={!formState.success && formState.hasChanged}
				message="changes not saved, please confirm you want to cancel."
			/>
			{formState.success ? (
				<Container className="outcome-message">
					<h3 className="mx-2 mb-4 mr-md-4 mt-md-4">
						{formState.kind + " task was successful!"}
					</h3>
					<Button
						variant="success"
						onClick={e =>
							history.replace("/routine", "task created!")
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
								disabled={!formHasChanged || !formIsReady()}
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
							<FormInput
								inputAs="input"
								label="name"
								placeholder="name for habit"
								state={name}
								setState={handleNameChange}
								validate={{
									minLength: 3,
									maxLength: 30,
									allowNumbers: true
								}}
							/>
							<FormInput
								inputAs="textarea"
								label="personal message"
								placeholder="why you want to enforce or quit this habit..."
								state={message}
								setState={handleMessageChange}
								validate={{
									minLength: 10,
									maxLength: 240,
									allowNumbers: true
								}}
							/>
							<IconSelector
								icons="taskIcons"
								label="icon for task"
								size={64}
								color="#343A40"
								state={selectedIcon}
								setState={handleIconChange}
							/>
							<Form.Label>
								{"planned schedule 4-weeks month"}
							</Form.Label>
							<div className="schedule-weeks-wrapper">
								{weekSched.map((week, index) => {
									return (
										<ScheduleWeek
											weekNumber={week.weekNumber}
											state={weekSched}
											setState={handleWeekSchedChange}
											key={week.weekNumber}
										/>
									);
								})}
							</div>
						</div>
					</Container>
				</Form>
			)}
		</React.Fragment>
	);
};

export default TaskForm;

TaskForm.propTypes = {
	title: PropTypes.string,
	add: PropTypes.bool
};
