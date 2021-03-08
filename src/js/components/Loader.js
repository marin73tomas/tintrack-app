import React from "react";
import PropTypes from "prop-types";

const Loader = ({ message, color }) => {
	return (
		<div className="component-loader-wrapper">
			<div className={"component-loader "}>
				<div className={"component-loader-box " + color}></div>
				<div className={"component-loader-hill " + color}></div>
			</div>
			{message && (
				<div className="component-loader-message">
					<p className="display-4">{message}</p>
				</div>
			)}
		</div>
	);
};

export default Loader;

Loader.propTypes = {
	message: PropTypes.string,
	color: PropTypes.string
};
