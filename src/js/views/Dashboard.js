import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import {
	returnMonthName,
	ordinalInteger,
	addDaysToDate
} from "../utils/helpers.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../sass/views/Dashboard.scss";
import DayTrack from "../components/DayTrack";
import { AppContext } from "../store/AppContext";
import TinModal from "../components/TinModal";
import { useHistory } from "react-router-dom";

const Dashboard = props => {
	const { store, actions } = useContext(AppContext);
	const [viewedDay, setViewedDay] = useState("loading date information...");
	const [showModal, setShowModal] = useState({
		show: false,
		kind: "",
		params: {}
	});
	const history = useHistory();
	const getModalContent = () => {
		if (showModal.kind === "choose") {
			return (
				<p>{"please, choose what kind of item you wish to create."}</p>
			);
		}
	};
	const disableTomorrow = dateObject => {
		let requestedDate = new Date(
			dateObject.year,
			dateObject.month - 1,
			dateObject.day
		);
		let today = new Date();
		let disable = false;
		switch (store.me.ranking) {
			case "starter":
				break;
			case "enrolled":
				today.setDate(today.getDate() + 7);
				break;
			case "experienced":
				today.setDate(today.getDate() + 14);
				break;
			case "veteran":
				today.setDate(today.getDate() + 28);
		}
		if (requestedDate > today) {
			disable = true;
		}
		return disable;
	};
	const disableYesterday = dateObject => {
		let requestedDate = new Date(
			dateObject.year,
			dateObject.month - 1,
			dateObject.day
		);
		let memberSince = new Date(store.me.memberSince);
		if (requestedDate < memberSince) {
			// date is off limits
			return true;
		} else {
			return false;
		}
	};
	useEffect(() => {
		// runs on first dashboard mount
		console.log("mounting dashboard...");
		let today = new Date();
		actions.getScheduleForDate({
			year: today.getFullYear(),
			month: today.getMonth() + 1,
			day: today.getDate()
		});
		return () => {
			// cleanup
		};
	}, []);
	useEffect(() => {
		console.log("running dashboardDay effect");
		if (
			store.dashboardDay.dayName &&
			store.dashboardDay.year &&
			store.dashboardDay.month &&
			store.dashboardDay.day
		) {
			setViewedDay(
				store.dashboardDay.dayName +
					", " +
					returnMonthName(store.dashboardDay.month - 1) +
					" " +
					ordinalInteger(store.dashboardDay.day) +
					" " +
					store.dashboardDay.year
			);
		}
		return () => {};
	}, [store.dashboardDay]);
	return (
		<Container fluid className="dashboard-bg-image">
			<Container className="dashboard-wrapper">
				<Container className="dashboard-tools bg-dark">
					<div className="title">
						<h4>{viewedDay}</h4>
					</div>
					<div
						className="prev text-center"
						onClick={() => {
							if (
								!disableYesterday(
									addDaysToDate(
										{
											year: store.dashboardDay.year,
											month: store.dashboardDay.month,
											day: store.dashboardDay.day
										},
										-1
									)
								)
							) {
								actions.getScheduleForDate(
									addDaysToDate(
										{
											year: store.dashboardDay.year,
											month: store.dashboardDay.month,
											day: store.dashboardDay.day
										},
										-1
									)
								);
							} // write else alert...
						}}
					>
						<FontAwesomeIcon
							icon={["far", "arrow-alt-circle-left"]}
						/>
						<span className="legend">{"yesterday"}</span>
					</div>
					<div
						className="search text-center"
						onClick={e => history.push("/routine")}
					>
						<FontAwesomeIcon icon={["far", "calendar-alt"]} />
						<span className="legend">{"routine planning"}</span>
					</div>
					<div
						className="add text-center"
						onClick={e => {
							setShowModal({
								show: true,
								kind: "choose",
								params: {}
							});
						}}
					>
						<span className="legend">{"add activity"}</span>
						<FontAwesomeIcon icon={["far", "plus-square"]} />
					</div>
					<div
						className="next text-center"
						onClick={() => {
							if (
								!disableTomorrow(
									addDaysToDate(
										{
											year: store.dashboardDay.year,
											month: store.dashboardDay.month,
											day: store.dashboardDay.day
										},
										1
									)
								)
							) {
								actions.getScheduleForDate(
									addDaysToDate(
										{
											year: store.dashboardDay.year,
											month: store.dashboardDay.month,
											day: store.dashboardDay.day
										},
										1
									)
								);
							}
						}}
					>
						<span className="legend">{"tomorrow"}</span>
						<FontAwesomeIcon
							icon={["far", "arrow-alt-circle-right"]}
						/>
					</div>
				</Container>
				<DayTrack day={store.dashboardDay} />
				{showModal.show && (
					<TinModal
						title={
							showModal.kind === "choose"
								? "choose an option"
								: "confirm unknown action"
						}
						content={getModalContent()}
						okButton={
							showModal.kind === "choose"
								? "create a habit"
								: "ok, confirm"
						}
						okVariant={"primary"}
						cancelButton={
							showModal.kind === "choose"
								? "plan a routine task"
								: ""
						}
						cancelVariant="primary"
						handleOk={
							showModal.kind === "choose" &&
							(e => {
								history.push("/routine/habit");
							})
						}
						handleCancel={
							showModal.kind === "choose" &&
							(e => {
								history.push("/routine/task");
							})
						}
						handleOuterClick={e => {
							setShowModal({
								show: false,
								kind: "",
								params: {}
							});
						}}
					/>
				)}
				{/* <DayTrack dayName={something.that.returns.dayName} />*/}
			</Container>
		</Container>
	);
};

export default Dashboard;
