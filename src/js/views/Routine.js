import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "../../sass/views/Routine.scss";
import EditTrack from "../components/EditTrack";
import { AppContext } from "../store/AppContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button } from "react-bootstrap";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import HabitForm from "../components/HabitForm";
import TaskForm from "../components/TaskForm";
import TinModal from "../components/TinModal";

const Routine = prop => {
	const match = useRouteMatch();
	const { store, actions } = useContext(AppContext);
	const [routineLoaded, setRoutineLoaded] = useState(false);
	const [showModal, setShowModal] = useState({
		show: false,
		kind: "",
		params: {}
	});
	useEffect(() => {
		// fetch routine to populate store.
		return () => {
			// cleanup
		};
	}, []);
	const getModalContent = () => {
		// get habit or task
		let item = {};
		if (showModal.params.isHabit) {
			const filteredHabits = store.routine.habits.filter(habit => {
				return habit.id === parseInt(showModal.params.id);
			});
			item = filteredHabits[0];
		} else {
			const filteredTasks = store.routine.tasks.filter(task => {
				return task.id === parseInt(showModal.params.id);
			});
			item = filteredTasks[0];
		}
		if (showModal.kind === "delete") {
			return (
				<React.Fragment>
					{item && (
						<p>
							{"please confirm you want to delete "}
							<strong>{item.name}</strong>
							{showModal.params.isHabit ? " habit " : " task "}
							{"from your routine schedule."}
						</p>
					)}
				</React.Fragment>
			);
		}
	};
	const deleteRoutineItem = async () => {
		let success = await actions.fetchDeleteRoutineItem(
			showModal.params.isHabit,
			showModal.params.id
		);
		if (success) {
			await actions.fetchGetRoutine();
			setShowModal({
				show: false,
				kind: "",
				params: {}
			});
		}
	};
	const handleDeleteItem = (isHabit, itemId) => {
		setShowModal({
			show: true,
			kind: "delete",
			params: {
				id: itemId,
				isHabit
			}
		});
	};
	useEffect(() => {
		const checkRoutine = async () => {
			console.log("trying to fetch");
			let gotRoutine = await actions.fetchGetRoutine();
			setRoutineLoaded(gotRoutine);
		};
		// running on first mount
		console.log("running on routine first mount");
		// check if there is routine in store
		if (!routineLoaded) {
			checkRoutine();
		}
		return () => {
			// cleanup
		};
	}, []);
	return (
		<Container fluid className="routine-bg">
			<Container className="routine-wrapper">
				<Switch>
					<Route exatc path={match.path + "/task"}>
						<TaskForm add title="creating planned task" />
					</Route>
					<Route path={match.path + "/tasks/:id"}>
						<TaskForm title="editing planned task" />
					</Route>
					<Route exact path={match.path + "/habit"}>
						<HabitForm add title="creating habit counter" />
					</Route>
					<Route path={match.path + "/habits/:id"}>
						<HabitForm title="editing habit counter" />
					</Route>
					<Route exact path={match.path}>
						<Container className="routine-tools bg-dark">
							<div className="title">
								<h4>{"routine items"}</h4>
							</div>
							<div className="tasks text-center">
								<p className="m-0">
									<Badge
										pill
										variant="primary"
										className="mx-2"
									>
										{store.routine.tasks.length}
									</Badge>
									{store.routine.tasks.length === 1
										? "task"
										: "tasks"}
								</p>
							</div>
							<div className="habits text-center">
								<p className="m-0">
									<Badge
										pill
										variant="primary"
										className="mx-2"
									>
										{store.routine.habits.length}
									</Badge>
									{store.routine.habits.length === 1
										? "habit"
										: "habits"}
								</p>
							</div>
							<div className="add-habit text-center">
								<Link
									to={match.url + "/habit"}
									className="no-text-style"
								>
									<FontAwesomeIcon
										icon={["far", "plus-square"]}
									/>
									<span className="legend">
										{"add habit"}
									</span>
								</Link>
							</div>
							<div className="add-task text-center">
								<Link
									to={match.url + "/task"}
									className="no-text-style"
								>
									<span className="legend">{"add task"}</span>
									<FontAwesomeIcon
										icon={["far", "plus-square"]}
									/>
								</Link>
							</div>
						</Container>
						<EditTrack
							habits={store.routine.habits}
							tasks={store.routine.tasks}
							removeItem={handleDeleteItem}
						/>
						{showModal.show && (
							<TinModal
								title={
									showModal.kind === "delete"
										? "confirm deletion"
										: "confirm unknown action"
								}
								content={getModalContent()}
								okButton={
									showModal.kind === "delete"
										? "yes, delete it!"
										: "ok, confirm"
								}
								cancelButton={
									showModal.kind === "delete"
										? "wait, nevermind"
										: ""
								}
								handleOk={
									showModal.kind === "delete" &&
									deleteRoutineItem
								}
								handleCancel={e => {
									setShowModal({
										show: false,
										kind: "",
										params: {}
									});
								}}
								handleOuterClick={e => {
									setShowModal({
										show: false,
										kind: "",
										params: {}
									});
								}}
							/>
						)}
					</Route>
				</Switch>
			</Container>
		</Container>
	);
};

export default Routine;
