import React from "react";
import PropTypes from "prop-types";

const IndifferentIcon = ({ color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 67.733332 67.733335"
		>
			<g
				transform="translate(0.88824641,0.05669581)"
				style={{
					fill: "none",
					fillOpacity: 1,
					stroke: color,
					strokeWidth: 2.64583325,
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeMiterlimit: 4,
					strokeDasharray: "none",
					strokeDashoffset: 0,
					strokeOpacity: 1,
					paintOrder: "fill markers stroke"
				}}
			>
				<circle
					r="25.040924"
					cy="33.809971"
					cx="32.97842"
					id="path4530"
				/>
				<circle
					r="3.2127976"
					cy="29.36875"
					cx="22.48958"
					id="path4532"
					style={{
						fill: color
					}}
				/>
				<circle
					r="3.2127976"
					cy="29.36875"
					cx="43.278275"
					id="path4532-6"
					style={{
						fill: color
					}}
				/>
				<path d="M 39.499759,43.849961 H 26.457086" />
			</g>
		</svg>
	);
};

export default IndifferentIcon;

IndifferentIcon.propTypes = {
	color: PropTypes.string
};
