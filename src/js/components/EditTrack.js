import React from "react";
import EditCard from "./EditCard";
import PropTypes from "prop-types";

const EditTrack = ({ habits, tasks, removeItem }) => {
	return (
		<div className="edit-track p-md-4 justify-content-md-start">
			{habits.map((habit, index) => {
				return (
					<EditCard
						key={"habit-" + habit.id}
						counter
						task={habit}
						removeItem={removeItem}
					/>
				);
			})}
			{tasks.map((task, index) => {
				return (
					<EditCard
						key={"task-" + task.id}
						task={task}
						removeItem={removeItem}
					/>
				);
			})}
		</div>
	);
};

export default EditTrack;

EditTrack.propTypes = {
	habits: PropTypes.arrayOf(PropTypes.object),
	tasks: PropTypes.arrayOf(PropTypes.object),
	removeItem: PropTypes.func
};
