import React from "react";
import PropTypes from "prop-types";

const SmokingIcon = ({ color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 67.733337 67.733337"
		>
			<g id="layer1" transform="translate(-18.92455,22.491205)">
				<g
					id="g5188"
					style={{
						stroke: color,
						strokeOpacity: 1
					}}
				>
					<circle
						r="32.820644"
						cy="11.375452"
						cx="52.791218"
						id="path993"
						style={{
							display: "inline",
							fill: "none",
							fillOpacity: 1,

							strokeWidth: 2.09204578,
							strokeLinecap: "butt",
							strokeLinejoin: "round",
							strokeMiterlimit: 4,
							strokeDasharray: "none",

							paintOrder: "fill markers stroke"
						}}
					/>
					<g
						style={{
							display: "inline",
							stroke: color,
							strokeWidth: 2.83178926,
							strokeMiterlimit: 4,
							strokeDasharray: "none",
							strokeOpacity: 1
						}}
						transform="matrix(0.73877172,0,0,0.73877172,28.629789,-17.700428)"
						id="g1000"
					>
						<path
							style={{
								fill: "none",
								strokeLinecap: "butt",
								strokeLinejoin: "round"
							}}
							d="m 1.3211189,47.717903 v 8.734429 H 56.981707 v -8.734429 z"
							id="path968"
						/>
						<path
							style={{
								fill: "none",
								strokeLinecap: "butt",
								strokeLinejoin: "round"
							}}
							d="m 60.471124,47.587201 v 8.995833"
							id="path972"
						/>
						<path
							style={{
								fill: "none",
								strokeLinecap: "butt",
								strokeLinejoin: "round"
							}}
							d="m 60.46973,46.017685 v -5.039023 c 0,0 0.116329,-2.205829 -1.958552,-3.543297 C 56.436297,36.097897 53.97174,36.13259 53.97174,36.13259 h -7.934563 c 0,0 -3.084199,-0.0794 -4.643809,-2.325784 -1.559609,-2.246388 -0.529502,-6.631275 -0.529502,-6.631275 0,0 -8.758114,0.09629 -8.758114,-7.383669 0,-7.479958 6.84878,-7.91786 6.84878,-7.91786"
							id="path974"
						/>
						<path
							style={{
								fill: "none",
								strokeLinecap: "butt",
								strokeLinejoin: "round"
							}}
							d="m 64.00593,46.017685 v -6.743808 c 0,0 0.162728,-3.839437 -3.353172,-7.032529 -3.5159,-3.193092 -7.188109,-3.216517 -7.188109,-3.216517 h -4.856707 c 0,0 3.069289,-5.080404 0.780151,-9.56804 -2.289137,-4.487636 -7.816938,-4.576007 -7.816938,-4.576007"
							id="path976"
						/>
						<path
							style={{
								fill: "none",
								strokeLinecap: "butt",
								strokeLinejoin: "round"
							}}
							d="m 64.088612,47.587201 v 8.995833"
							id="path972-5"
						/>
					</g>
				</g>
			</g>
		</svg>
	);
};

export default SmokingIcon;

SmokingIcon.propTypes = {
	color: PropTypes.string
};
