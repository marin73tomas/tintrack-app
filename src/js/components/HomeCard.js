import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";

const HomeCard = props => {
	return (
		<div className="py-3 px-2 col-md-6 col-lg-4">
			<Card key={props.card.id} className="p-0 p-md-2 m-0 home-card">
				<Card.Body className="d-flex flex-column justify-content-center">
					<h3 className="text-center mb-4">{props.card.title}</h3>
					<Card.Img
						className="m-auto"
						src={props.card.icon}
					></Card.Img>
					<Card.Text className="mt-4 text-center">
						{props.card.description}
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
};

export default HomeCard;

HomeCard.propTypes = {
	card: PropTypes.object
};
