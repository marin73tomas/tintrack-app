import React from "react";
import PropTypes from "prop-types";

const KpiBoard = ({ kpiValues }) => {
	return (
		<React.Fragment>
			{kpiValues ? (
				kpiValues.map((value, index) => {
					return (
						<div className="kpi-slot text-center" key={index}>
							<div className="kpi-number kpi-number-left">
								<p>{value.numbers[0]}</p>
							</div>
							<div className="kpi-number kpi-number-right">
								<p>{value.numbers[1]}</p>
							</div>
							<p>{value.legend}</p>
						</div>
					);
				})
			) : (
				<p>{"still loading"}</p>
			)}
		</React.Fragment>
	);
};

export default KpiBoard;

KpiBoard.propTypes = {
	kpiValues: PropTypes.arrayOf(PropTypes.object)
};
