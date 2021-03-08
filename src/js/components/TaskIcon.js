import React from "react";
import SmokingIcon from "../icons/SmokingIcon";
import PropTypes from "prop-types";
import BedMakingIcon from "../icons/BedMakingIcon";
import WaterGlassIcon from "../icons/WaterGlassIcon";
import WeightsIcon from "../icons/WeightsIcon";
import DefaultHabitIcon from "../icons/DefaultHabitIcon";
import DefaultTaskIcon from "../icons/DefaultTaskIcon";
import SadderIcon from "../icons/SadderIcon";
import SadIcon from "../icons/SadIcon";
import IndifferentIcon from "../icons/IndifferentIcon";
import HappyIcon from "../icons/HappyIcon";
import HappierIcon from "../icons/HappierIcon";

const TaskIcon = ({
	icon,
	side = 24,
	color = "#FFFFFF99",
	marked,
	onClickHandler = () => {}
}) => {
	const matchComponent = () => {
		switch (icon) {
			case "default-task":
				return marked ? (
					<DefaultTaskIcon color={"#FFFFFF"} />
				) : (
					<DefaultTaskIcon color={color} />
				);
			case "default-habit":
				return marked ? (
					<DefaultHabitIcon color={"#FFFFFF"} />
				) : (
					<DefaultHabitIcon color={color} />
				);
			case "smoking":
				return marked ? (
					<SmokingIcon color={"#FFFFFF"} />
				) : (
					<SmokingIcon color={color} />
				);
			case "bed-making":
				return marked ? (
					<BedMakingIcon color={"#FFFFFF"} />
				) : (
					<BedMakingIcon color={color} />
				);
			case "water-glass":
				return marked ? (
					<WaterGlassIcon color={"#FFFFFF"} />
				) : (
					<WaterGlassIcon color={color} />
				);
			case "weights":
				return marked ? (
					<WeightsIcon color={"#FFFFFF"} />
				) : (
					<WeightsIcon color={color} />
				);
			case "sadder":
				return marked ? (
					<SadderIcon color={"#FFC107"} />
				) : (
					<SadderIcon color={color} />
				);
			case "sad":
				return marked ? (
					<SadIcon color={"#FFC107"} />
				) : (
					<SadIcon color={color} />
				);
			case "indifferent":
				return marked ? (
					<IndifferentIcon color={"#FFC107"} />
				) : (
					<IndifferentIcon color={color} />
				);
			case "happy":
				return marked ? (
					<HappyIcon color={"#FFC107"} />
				) : (
					<HappyIcon color={color} />
				);
			case "happier":
				return marked ? (
					<HappierIcon color={"#FFC107"} />
				) : (
					<HappierIcon color={color} />
				);
			default:
				return <h2>no such icon</h2>;
		}
	};
	const iconToRender = matchComponent();
	const iconStyle = {
		display: "flex",
		flexFlow: "column",
		width: side + "px",
		height: side + "px"
	};
	if (marked) {
		iconStyle["backgroundColor"] = "#343A40";
		// iconStyle["border"] = "solid 2px #28A745";
		iconStyle["borderRadius"] = "50%";
		// iconStyle["box-shadow"] = `inset 0px 0px ${side / 4}px ${side /
		// 	5}px rgba(40, 167, 69, 0.5)`;
	}
	return (
		<div onClick={e => onClickHandler(e, icon)} style={iconStyle}>
			{iconToRender}
		</div>
	);
};

export default TaskIcon;

TaskIcon.propTypes = {
	icon: PropTypes.string,
	side: PropTypes.number,
	color: PropTypes.string,
	marked: PropTypes.bool,
	onClickHandler: PropTypes.func
};
