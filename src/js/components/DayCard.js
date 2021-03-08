import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import KpiBoard from "./KpiBoard";
import Button from "react-bootstrap/Button";
import TaskIcon from "./TaskIcon";
import { digitsToNumber } from "../utils/helpers";
import { AppContext } from "../store/AppContext";
import Loader from "./Loader";
import IconSelector from "./IconSelector";
import { FeelingEnum } from "../utils/enums";

const DayCard = ({ task, counter }) => {
	const [markingDone, setMarkingDone] = useState(false);
	const { store, actions } = useContext(AppContext);
	const [feelingBefore, setFeelingBefore] = useState("");
	const [feelingAfter, setFeelingAfter] = useState("");
	const handleAdd = async e => {
		console.log("gonna add 1 to habitCounter count");
		// fetch to habitCounter endpoint
		// build request body
		if (feelingBefore && feelingAfter) {
			let introspective = {
				asFeltBefore: FeelingEnum.getFeelingValue(feelingBefore),
				asFeltAfterwards: FeelingEnum.getFeelingValue(feelingAfter)
			};
			let success = await actions.fetchAddOccurrence(
				introspective,
				task.id,
				counter
			);
			if (success) {
				// add 1 successfull
				await actions.getScheduleForDate({
					year: store.dashboardDay.year,
					month: store.dashboardDay.month,
					day: store.dashboardDay.day
				});
				setFeelingBefore("");
				setFeelingAfter("");
				setMarkingDone(false);
			} else {
				console.log("unsuccessfull, try again");
			}
		}
	};

	return (
		<div className="col-lg-4 col-md-6 p-0 p-md-2 m-2 m-md-0 d-flex justify-content-center">
			<div className="day-card m-0 p-0">
				<div className="day-card-header">
					<div className="card-header-icon">
						<TaskIcon icon={task.iconName} side={64} />
					</div>
					<div className="card-header-kpi">
						{<KpiBoard kpiValues={task.kpiValues} />}
					</div>
				</div>
				<div className="day-card-title">
					<h5>{task.name}</h5>
					{task.startTime && (
						<p className="card-start-time text-right">
							{task.isAny ? "anytime" : task.startTime}
						</p>
					)}
				</div>
				{markingDone ? (
					counter ? (
						<React.Fragment>
							<div className="day-card-body">
								<p className="mb-1 mt-2">
									{"How did you feel before doing this?"}
								</p>
								<IconSelector
									icons={"feelingIcons"}
									size={32}
									color={"#AEB0B3"}
									state={feelingBefore}
									setState={setFeelingBefore}
									className={"feeling-selector"}
								/>
								<p className="mb-1">
									{"And what about after?"}
								</p>
								<IconSelector
									icons={"feelingIcons"}
									size={32}
									color={"#AEB0B3"}
									state={feelingAfter}
									setState={setFeelingAfter}
									className={"feeling-selector"}
								/>
							</div>
							<div className="day-card-actions">
								<Button
									type="button"
									block
									disabled={!feelingBefore || !feelingAfter}
									variant="outline-light"
									onClick={handleAdd}
								>
									{"I did it"}
								</Button>
								<Button
									type="button"
									className="mt-0"
									block
									variant="outline-light"
									onClick={e => {
										setMarkingDone(false);
									}}
								>
									{"Nevermind..."}
								</Button>
							</div>
						</React.Fragment>
					) : (
						<React.Fragment>
							<div className="day-card-body">
								<p className="mb-1 mt-2">
									{"How did you feel before doing this?"}
								</p>
								<IconSelector
									icons={"feelingIcons"}
									size={32}
									color={"#AEB0B3"}
									state={feelingBefore}
									setState={setFeelingBefore}
									className={"feeling-selector"}
								/>
								<p className="mb-1">
									{"And what about after?"}
								</p>
								<IconSelector
									icons={"feelingIcons"}
									size={32}
									color={"#AEB0B3"}
									state={feelingAfter}
									setState={setFeelingAfter}
									className={"feeling-selector"}
								/>
							</div>
							<div className="day-card-actions">
								<Button
									type="button"
									block
									disabled={!feelingBefore || !feelingAfter}
									variant="outline-light"
									onClick={handleAdd}
								>
									{"I did it"}
								</Button>
								<Button
									type="button"
									className="mt-0"
									block
									variant="outline-light"
									onClick={e => {
										setMarkingDone(false);
									}}
								>
									{"Nevermind..."}
								</Button>
							</div>
						</React.Fragment>
					)
				) : (
					<React.Fragment>
						<div className="day-card-body">
							{task.personalMessage}
						</div>
						<div className="day-card-actions">
							{task.startTime ? (
								// its planned task
								task.status === "done" ? (
									// task is done
									<Button
										type="button"
										block
										disabled
										variant="success"
									>
										{"done!"}
									</Button>
								) : task.status === "planned" ? (
									// task is planned
									<Button
										type="button"
										block
										variant="primary"
										onClick={e => {
											setMarkingDone(true);
										}}
									>
										{"mark as done"}
									</Button>
								) : (
									// task was missed?
									<Button
										type="button"
										block
										variant="warning"
										onClick={e => {
											setMarkingDone(true);
										}}
									>
										{"did you do this?"}
									</Button>
								)
							) : task.toBeEnforced ? (
								// its a habit to be enforced
								task.status === "over" ||
								task.status === "around" ? (
									// habit to be enforced is over target
									<Button
										type="button"
										block
										variant="info"
										onClick={e => {
											setMarkingDone(true);
										}}
									>
										{"ok, add one more"}
									</Button>
								) : (
									// habit to be enforced is under target
									<Button
										type="button"
										block
										variant="success"
										onClick={e => {
											setMarkingDone(true);
										}}
									>
										{"come on! add more!"}
									</Button>
								)
							) : // its a habit not to be enforced
							task.status === "under" ? (
								// habit not to be enforced is far from target
								<Button
									type="button"
									block
									variant="warning"
									onClick={e => {
										setMarkingDone(true);
									}}
								>
									{"well... ok, add one"}
								</Button>
							) : (
								// habit not to be enforced is not far from target
								<Button
									type="button"
									block
									variant="danger"
									onClick={e => {
										setMarkingDone(true);
									}}
								>
									{"add one, but please stop!"}
								</Button>
							)}
						</div>
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

export default DayCard;

DayCard.propTypes = {
	task: PropTypes.object,
	counter: PropTypes.bool
};
