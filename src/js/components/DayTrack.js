import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import DayCard from "./DayCard";

const DayTrack = props => {
	let habitCounters = props.day.habitCounters;
	let plannedTasks = props.day.plannedTasks;
	return (
		<div className="day-track p-md-4 justify-content-md-start">
			{habitCounters.map((habit, index) => {
				return (
					<DayCard key={"habit-" + habit.id} counter task={habit} />
				);
			})}
			{plannedTasks.map((task, index) => {
				return <DayCard key={"task-" + task.id} task={task} />;
			})}
		</div>
	);
};

export default DayTrack;

DayTrack.propTypes = {
	day: PropTypes.object
};
