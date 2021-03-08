import React from "react";
import PropTypes from "prop-types";

const HappyIcon = ({ color }) => {
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
				<path
					id="path4549"
					d="m 41.510331,42.791627 c 0,0 -2.043569,4.204985 -8.531908,4.204985 -6.48834,0 -8.531909,-4.204985 -8.531909,-4.204985"
					style={{
						strokeWidth: 3.02633691
					}}
				/>
			</g>
		</svg>
	);
};

export default HappyIcon;

HappyIcon.propTypes = {
	color: PropTypes.string
};
