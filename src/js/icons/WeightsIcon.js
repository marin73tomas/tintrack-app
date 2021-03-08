import React from "react";
import PropTypes from "prop-types";

const WeightsIcon = ({ color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 67.733329 67.733333"
			id="svg8"
		>
			<g id="layer2" transform="translate(-72.495834,-86.60524)">
				<g
					id="g875"
					transform="matrix(0.75157593,0,0,0.75157593,27.118996,29.492075)"
					style={{
						fill: "none",
						stroke: color,
						strokeWidth: 1.88749998,
						strokeOpacity: 1,
						strokeLinecap: "round",
						strokeLinejoin: "round",
						strokeMiterLimit: 4,
						strokeDasharray: "none"
					}}
				>
					<path
						id="path831"
						d="m 73.289583,117.08333 v 7.9375 h 5.291667 v -7.9375 z"
					/>
					<path
						id="path833"
						d="m 78.58125,106.5 v 29.10417 h 7.9375 V 106.5 Z"
					/>
					<path
						id="path835"
						d="m 86.51875,101.20833 v 39.6875 h 9.260416 v -39.6875 z"
					/>
					<path
						id="path837"
						d="m 95.779166,117.08333 v 7.9375 h 19.314584 v -7.9375 z"
					/>
					<path
						id="path831-5"
						d="m 137.58333,117.08333 v 7.9375 h -5.29167 v -7.9375 z"
					/>
					<path
						id="path833-4"
						d="m 132.29166,106.5 v 29.10417 h -7.93749 V 106.5 Z"
					/>
					<path
						id="path835-3"
						d="m 124.35417,101.20833 v 39.6875 h -9.26042 v -39.6875 z"
					/>
				</g>
				<circle
					style={{
						fill: "none",
						fillOpacity: 1,
						stroke: color,
						strokeWidth: 2.09461951,
						strokeMiterlimit: 4,
						strokeDasharray: "none",
						strokeOpacity: 1
					}}
					id="path825"
					cx="106.3625"
					cy="120.4719"
					r="32.819355"
				/>
			</g>
		</svg>
	);
};

export default WeightsIcon;

WeightsIcon.propTypes = {
	color: PropTypes.string
};
