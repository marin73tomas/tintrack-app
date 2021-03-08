import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimePicker from "react-bootstrap-time-picker";

const ScheduleWeek = ({ weekNumber, state, setState }) => {
	const [weekdaysControl, setWeekdaysControl] = useState({
		allWeek: true,
		weekTimes: [
			{
				value: "any",
				id: 0
			}
		],
		days: [
			{
				label: "monday",
				control: "full"
			},
			{
				label: "tuesday",
				control: "full"
			},
			{
				label: "wednesday",
				control: "full"
			},
			{
				label: "thrusday",
				control: "full"
			},
			{
				label: "friday",
				control: "full"
			},
			{
				label: "saturday",
				control: "full"
			},
			{
				label: "sunday",
				control: "full"
			}
		]
	});
	const addTimeHolder = (value, weekNumber, dayIndex) => {
		let newState = state;
		newState[weekNumber - 1].days[dayIndex].push({
			value,
			id: Math.floor(Math.random() * 10000 + 500)
		});
		setState(newState);
		setWeekdaysControl({
			...weekdaysControl,
			allWeek: false
		});
	};
	const deleteTimeHolder = (weekNumber, dayIndex, idToDelete) => {
		let newState = state;
		let filteredTimes = state[weekNumber - 1].days[dayIndex].filter(day => {
			return day.id != idToDelete;
		});
		newState[weekNumber - 1].days[dayIndex] = filteredTimes;
		setState(newState);
		setWeekdaysControl({
			...weekdaysControl,
			allWeek: false
		});
	};
	const handleTimeChange = (newTime, weekNumber, dayIndex, timeId) => {
		let newState = state;
		let filteredTimes = state[weekNumber - 1].days[dayIndex].filter(
			time => {
				return time.id != timeId;
			}
		);
		let changedTime = {
			id: timeId,
			value: newTime
		};
		filteredTimes.push(changedTime);
		newState[weekNumber - 1].days[dayIndex] = filteredTimes;
		setState(newState);
		setWeekdaysControl({
			...weekdaysControl,
			allWeek: false
		});
	};
	const handleSetWeek = weekNumber => {
		let newState = state;
		for (let i = 0; i < 7; i++) {
			newState[weekNumber - 1].days[i] = [];
			for (let j = 0; j < weekdaysControl.weekTimes.length; j++) {
				newState[weekNumber - 1].days[i].push({
					id: Math.floor(Math.random() * 10000 + 500),
					value: weekdaysControl.weekTimes[j].value
				});
			}
		}
		setState(newState);
		setWeekdaysControl({
			...weekdaysControl,
			allWeek: true
		});
	};
	return (
		<div className={"schedule-week-card week" + weekNumber}>
			{/* <div className="schedule-week-card-header">
				<h5>{"Week " + weekNumber}</h5>
			</div> */}
			<Form.Label className="text-center mb-3">
				{"week " + weekNumber}
			</Form.Label>
			<div className="schedule-week-body">
				{/* <div className="week-main"> */}
				<div className="week-control">
					<Button
						variant="dark"
						disabled={weekdaysControl.allWeek}
						onClick={e => {
							handleSetWeek(weekNumber);
						}}
					>
						{"set week"}
					</Button>
				</div>
				<div className="week-times">
					{weekdaysControl.weekTimes.map(time => {
						return (
							<div
								className={
									time.value === "any"
										? "time-holder time-holder-any"
										: "time-holder"
								}
								key={"week" + weekNumber + "-" + time.id}
							>
								<div
									className="delete-button"
									onClick={e => {
										setWeekdaysControl({
											...weekdaysControl,
											allWeek: false,
											weekTimes: weekdaysControl.weekTimes.filter(
												value => {
													return value.id != time.id;
												}
											)
										});
									}}
								>
									<FontAwesomeIcon icon={["fas", "times"]} />
								</div>

								{time.value === "any" ? (
									<div className="time-holder-value">
										{time.value}
									</div>
								) : (
									<div className="time-holder-value">
										<TimePicker
											onChange={newTime => {
												let filteredTimes = weekdaysControl.weekTimes.filter(
													value => {
														return (
															value.id != time.id
														);
													}
												);
												filteredTimes.push({
													id: time.id,
													value: newTime
												});
												setWeekdaysControl({
													...weekdaysControl,
													weekTimes: filteredTimes
												});
											}}
											className="picker"
											start="0:00"
											end="23:59"
											step={30}
											value={time.value}
											format={24}
										/>
									</div>
								)}
							</div>
						);
					})}
					<Button
						onClick={e => {
							setWeekdaysControl({
								...weekdaysControl,
								allWeek: false,
								weekTimes: [
									...weekdaysControl.weekTimes,
									{
										value: "any",
										id: Math.floor(
											Math.random() * 10000 + 500
										)
									}
								]
							});
						}}
						variant="outline-primary"
					>
						{"any"}
					</Button>
					<Button
						onClick={e => {
							setWeekdaysControl({
								...weekdaysControl,
								allWeek: false,
								weekTimes: [
									...weekdaysControl.weekTimes,
									{
										value: 28800,
										id: Math.floor(
											Math.random() * 10000 + 500
										)
									}
								]
							});
						}}
						variant="outline-primary"
					>
						{"@time"}
					</Button>
				</div>
				{/* </div>
				<div className="weekdays-main"> */}
				{weekdaysControl.days.map((day, index) => {
					return (
						// <div className="weekday-row" key={day.label}>
						<React.Fragment key={day.label}>
							<div className={"weekday-control day-" + index}>
								<p className="weekday-label">{day.label}</p>
								<Badge
									pill
									variant="dark"
									className="mx-1 py-1"
								>
									{state[weekNumber - 1].days[index].length}
								</Badge>
							</div>
							<div className={"weekday-times times-" + index}>
								{state[weekNumber - 1].days[index].map(time => {
									return (
										<div
											className={
												time.value === "any"
													? "time-holder time-holder-any"
													: "time-holder"
											}
											key={
												"wn-" +
												weekNumber +
												"-day-" +
												index +
												"-tid-" +
												time.id
											}
										>
											<div
												className="delete-button"
												onClick={e => {
													deleteTimeHolder(
														weekNumber,
														index,
														time.id
													);
												}}
											>
												<FontAwesomeIcon
													icon={["fas", "times"]}
												/>
											</div>
											{time.value === "any" ? (
												<div className="time-holder-value">
													{time.value}
												</div>
											) : (
												<div className="time-holder-value">
													<TimePicker
														onChange={newTime => {
															handleTimeChange(
																newTime,
																weekNumber,
																index,
																time.id
															);
														}}
														start="0:00"
														end="23:59"
														step={30}
														value={time.value}
														format={24}
													/>
												</div>
											)}
										</div>
									);
								})}
								<Button
									onClick={e => {
										addTimeHolder("any", weekNumber, index);
									}}
									variant="outline-primary"
								>
									{"any"}
								</Button>
								<Button
									onClick={e => {
										addTimeHolder(
											"08:00",
											weekNumber,
											index
										);
									}}
									variant="outline-primary"
								>
									{"@time"}
								</Button>
							</div>
						</React.Fragment>

						// </div>
					);
				})}
				{/* </div> */}
			</div>
		</div>
	);
};

export default ScheduleWeek;

ScheduleWeek.propTypes = {
	weekNumber: PropTypes.number,
	state: PropTypes.array,
	setState: PropTypes.func
};
