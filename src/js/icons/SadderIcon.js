import React from "react";
import PropTypes from "prop-types";

const SadderIcon = ({ color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 67.733332 67.733335"
		>
			<g id="layer2">
				<g
					id="g4555"
					transform="translate(0.88824641,0.05669581)"
					style={{
						stroke: color,
						fillOpacity: 1,
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
						style={{
							fill: "none"
						}}
					/>
					<g id="g839" transform="translate(0.09449197)">
						<path
							id="path4549"
							d="m 44.166517,46.018599 c 0,0 -2.211151,-7.9375 -10.394345,-7.9375 -8.183194,0 -10.394346,7.9375 -10.394346,7.9375"
							style={{
								fill: "none"
							}}
						/>
						<path
							id="path819"
							d="m 20.237457,28.961942 c 1.614753,0.838002 3.270868,1.603619 6.280833,0"
							style={{
								fill: "none"
							}}
						/>
						<path
							id="path819-3"
							d="m 41.02615,28.961942 c 1.614753,0.838002 3.270868,1.603619 6.280833,0"
							style={{
								fill: "none"
							}}
						/>
					</g>
				</g>
			</g>
		</svg>
	);
};

export default SadderIcon;

SadderIcon.propTypes = {
	color: PropTypes.string
};
