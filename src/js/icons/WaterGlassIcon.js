import React from "react";
import PropTypes from "prop-types";

const WaterGlassIcon = ({ color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 67.733337 67.733335"
			id="svg8"
		>
			<g id="layer2" transform="translate(-51.951032,-3.6804387)">
				<g
					id="g836"
					style={{
						fill: "none",
						stroke: color,
						strokeOpacity: 1,
						strokeLinecap: "butt",
						strokeMiterlimit: 4,
						strokeDasharray: "none"
					}}
					transform="matrix(0.8,0,0,0.8,28.033707,3.3265035)"
				>
					<path
						id="path827"
						d="M 57.641368,67.379463 53.053,23.182369 c 0,0 3.895342,-4.231941 19.176589,-4.009043 15.281246,0.222898 19.176588,4.276312 19.176588,4.276312 L 86.862596,67.81638 c 0,0 -4.976258,2.539061 -14.610614,2.539061 -9.634356,0 -14.610614,-2.975978 -14.610614,-2.975978 z"
						style={{
							strokeWidth: 2.11666656,
							strokeLinejoin: "miter"
						}}
					/>
					<path
						id="path829"
						d="m 54.267721,35.908745 c 0,0 4.387541,3.84906 17.962269,3.84906 13.574727,0 17.962268,-3.84906 17.962268,-3.84906 0,0 -4.104908,-3.651669 -17.962268,-3.651669 -13.857361,0 -17.962269,3.651669 -17.962269,3.651669 z"
						style={{
							strokeWidth: 1.32291663,
							strokeLinejoin: "round"
						}}
					/>
					<path
						id="path831"
						d="m 53.053,23.182369 c 0,0 3.442134,3.186678 19.176589,3.186678 15.734454,0 19.176588,-2.919409 19.176588,-2.919409"
						style={{
							strokeWidth: 2.11666656,
							strokeLinejoin: "miter"
						}}
					/>
				</g>
				<circle
					style={{
						fill: "none",
						fillOpacity: 1,
						stroke: color,
						strokeWidth: 2.09461951,
						strokeLinejoin: "round",
						strokeMiterlimit: 4,
						strokeDasharray: "none",
						strokeOpacity: 1
					}}
					id="path838"
					cx="85.817696"
					cy="37.547104"
					r="32.159935"
				/>
			</g>
		</svg>
	);
};

export default WaterGlassIcon;

WaterGlassIcon.propTypes = {
	color: PropTypes.string
};
