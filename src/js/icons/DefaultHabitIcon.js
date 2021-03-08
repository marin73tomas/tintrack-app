import React from "react";
import PropTypes from "prop-types";

const DefaultHabitIcon = ({ color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 67.733337 67.733337"
			version="1.1"
			id="svg4618"
		>
			<g
				id="layer1"
				transform="translate(-18.92455,22.491217)"
				style={{
					fill: "none",
					stroke: color,
					strokeWidth: 1.52082503,
					strokeLinecap: "butt",
					strokeLinejoin: "miter",
					strokeMiterlimit: 4,
					strokeDasharray: "none",
					strokeOpacity: 1
				}}
			>
				<circle
					style={{
						display: "inline",
						strokeWidth: 2.09204578,
						strokeLinejoin: "round",
						paintOrder: "fill markers stroke"
					}}
					id="path993"
					cx="52.791218"
					cy="11.375452"
					r="32.820644"
				/>
				<path
					id="path863-6"
					d="M 49.003948,1.0576555 V 24.516766 M 32.003834,0.30793493 H 66.004063 V 25.245548 H 32.003834 Z"
				/>
				<path
					id="path863-7"
					d="M 79.45601,12.776742 H 70.195593 M 74.825801,8.1465334 V 17.40695"
				/>
				<path
					id="path863-6-9"
					style={{
						strokeOpacity: 0.6
					}}
					d="m 44.549204,12.776741 h -8.17991 M 44.810623,5.2092919 V 20.344191 H 36.115177 V 5.2092919 Z m 0,0 -8.695446,15.1349001"
				/>
				<path
					id="path863-6-9-9"
					style={{
						strokeOpacity: 0.6
					}}
					d="M 61.6313,12.776741 H 53.45139 M 61.892719,5.209292 V 20.344191 H 53.197273 V 5.209292 Z m 0,0 -8.695446,15.1349"
				/>
			</g>
		</svg>
	);
};

export default DefaultHabitIcon;

DefaultHabitIcon.propTypes = {
	color: PropTypes.string
};
