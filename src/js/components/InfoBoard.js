import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import ScheduleDisplay from "./ScheduleDisplay";

const InfoBoard = ({ counter, task }) => {
	return (
		<React.Fragment>
			{counter ? (
				<React.Fragment>
					<div className="kpi-slot text-center">
						<p className="mb-1">{task.targetPeriod}</p>
						<div className="kpi-number kpi-number-left">
							<p>{task.targetValues[0]}</p>
						</div>
						<div className="kpi-number kpi-number-right">
							<p>{task.targetValues[1]}</p>
						</div>
					</div>
					<div className="options-info">
						<Form>
							<Form.Check
								custom
								type="radio"
								label="enforce"
								name="radio-enforce"
								disabled
								checked={task.toBeEnforced}
							/>
							<Form.Check
								custom
								type="radio"
								label="quit"
								name="radio-quit"
								disabled
								checked={!task.toBeEnforced}
							/>
						</Form>
					</div>
				</React.Fragment>
			) : (
				<ScheduleDisplay size="card" weekSched={task.weekSched} />
			)}
		</React.Fragment>
	);
};

export default InfoBoard;

InfoBoard.propTypes = {
	counter: PropTypes.bool,
	task: PropTypes.object
};
