import React from "react";
import PropTypes from "prop-types";

const HappierIcon = ({ color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 67.733332 67.733335"
			version="1.1"
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
					cx="33.866665"
					cy="33.866665"
					r="25.040924"
					id="path4530"
				/>
				<path
					id="path4549"
					d="m 43.661724,41.545384 c 0,0 -1.879913,7.846532 -9.795055,7.846532 -7.915142,0 -9.795056,-7.846532 -9.795056,-7.846532 z"
					style={{
						fill: color,
						strokeLinecap: "butt",
						strokeLinejoin: "miter"
					}}
				/>
				<path
					id="path819"
					d="m 20.141245,30.244564 c 1.614753,-0.838002 3.270868,-1.603618 6.280833,0"
				/>
				<path
					id="path819-3"
					d="m 40.929938,30.244564 c 1.614752,-0.838002 3.270868,-1.603618 6.280831,0"
				/>
			</g>
		</svg>
	);
};

export default HappierIcon;

HappierIcon.propTypes = {
	color: PropTypes.string
};
