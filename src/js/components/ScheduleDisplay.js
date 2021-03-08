import React from "react";
import PropTypes from "prop-types";

const ScheduleDisplay = ({ size, weekSched }) => {
	const getClassNameForDay = times => {
		if (times === 0) {
			return "schedule-day";
		} else if (times === 1) {
			return "schedule-day schedule-day-on";
		} else if (times === 2) {
			return "schedule-day schedule-day-double";
		} else {
			return "schedule-day schedule-day-full";
		}
	};
	const timesPerDay = [];
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 7; j++) {
			timesPerDay.push(weekSched[i].days[j].length);
		}
	}
	return (
		<div className="schedule">
			<div className="schedule-top-legend">
				<div className="schedule-weekdays">
					{["m", "t", "w", "t", "f", "s", "s"].map((day, index) => {
						return (
							<div key={index} className="weekday">
								{day}
							</div>
						);
					})}
				</div>
			</div>
			<div className="schedule-content">
				<div
					className={
						size === "card"
							? "schedule-container schedule-container-sm"
							: "schedule-container schedule-container-lg"
					}
				>
					{timesPerDay.map((times, index) => {
						return (
							<div
								key={"day-" + index}
								className={getClassNameForDay(times)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ScheduleDisplay;

ScheduleDisplay.propTypes = {
	size: PropTypes.string,
	weekSched: PropTypes.arrayOf(PropTypes.object)
};
