import React from "react";

import PropTypes from "prop-types";
import { ButtonGroup, Button } from "react-bootstrap";
import { validateNumber } from "../utils/validators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormQtyButtons = ({ state, setState, validate, variant = "dark" }) => {
	return (
		<ButtonGroup className="w-100" aria-label="quantity buttons">
			<Button
				name="minus one"
				variant={variant}
				onClick={e => {
					if (
						!isNaN(state.input.value) &&
						parseInt(state.input.value) > 0
					) {
						setState({
							input: validateNumber({
								item: parseInt(state.input.value) - 1,
								minQty: validate.minQty,
								maxQty: validate.maxQty
							}),
							firstBlood: false
						});
					}
				}}
			>
				<FontAwesomeIcon className="my-auto" icon={["fas", "minus"]} />
			</Button>
			<Button
				name="plus one"
				variant={variant}
				onClick={e => {
					let item = 1;
					if (!isNaN(state.input.value)) {
						item = parseInt(state.input.value + 1);
					}
					setState({
						input: validateNumber({
							item,
							minQty: validate.minQty,
							maxQty: validate.maxQty
						}),
						firstBlood: false
					});
				}}
			>
				<FontAwesomeIcon className="my-auto" icon={["fas", "plus"]} />
			</Button>
		</ButtonGroup>
	);
};

export default FormQtyButtons;

FormQtyButtons.propTypes = {
	state: PropTypes.object,
	setState: PropTypes.func,
	validate: PropTypes.object,
	variant: PropTypes.string
};
