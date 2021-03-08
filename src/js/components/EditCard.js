import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import InfoBoard from "./InfoBoard";
import TaskIcon from "./TaskIcon";
import { Link } from "react-router-dom";

const EditCard = ({ counter, task, removeItem = () => {} }) => {
	return (
		<div className="col-md-6 col-lg-4 p-0 p-md-2 m-2 m-md-0 d-flex justify-content-center">
			<div className="edit-card m-0 p-0">
				<div className="edit-card-header">
					<div className="card-header-icon">
						<TaskIcon icon={task.iconName} side={64} />
					</div>
					<div className="card-header-info">
						<InfoBoard counter={counter} task={task} />
					</div>
				</div>
				<div className="edit-card-title">
					<h5>{task.name}</h5>
				</div>
				<div className="edit-card-body">
					<p>{task.personalMessage}</p>
				</div>
				<div className="edit-card-actions">
					<span
						onClick={e => removeItem(counter, task.id)}
						className="del-button bg-danger"
					>
						<span className="del-button-msg">
							{counter ? "delete habit" : "delete task"}
						</span>
					</span>
					<Link
						to={location =>
							`${location.pathname}/${
								counter ? "habits" : "tasks"
							}/${task.id}`
						}
						className="no-text-style w-100"
					>
						<Button type="button" block variant="primary">
							{counter
								? "edit habit counter"
								: "edit planned task"}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EditCard;

EditCard.propTypes = {
	counter: PropTypes.bool,
	task: PropTypes.object,
	removeItem: PropTypes.func
};
