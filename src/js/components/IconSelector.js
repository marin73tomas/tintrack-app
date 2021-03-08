import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../store/AppContext";
import { Form } from "react-bootstrap";
import TaskIcon from "./TaskIcon";

const IconSelector = ({
	icons,
	label,
	size,
	color,
	state,
	setState,
	className = ""
}) => {
	const { store, actions } = useContext(AppContext);
	const items = store.iconsInventory[icons];
	return (
		<Form.Group className={className}>
			{label && <Form.Label>{label}</Form.Label>}
			<div className="icon-selector">
				{items.map(icon => {
					return (
						<TaskIcon
							onClickHandler={(event, icon) => {
								setState(icon);
							}}
							icon={icon}
							key={icon}
							side={size}
							color={color}
							marked={icon === state}
						/>
					);
				})}
			</div>
		</Form.Group>
	);
};

export default IconSelector;

IconSelector.propTypes = {
	icons: PropTypes.string,
	label: PropTypes.string,
	size: PropTypes.number,
	color: PropTypes.string,
	state: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	setState: PropTypes.func,
	className: PropTypes.string
};
