import React from "react";
import Card from "react-bootstrap/Card";
import HomeCard from "./HomeCard";
import PropTypes from "prop-types";

const HomeContentBlock = props => {
	return (
		<React.Fragment>
			<h2 className="display-4 text-center mt-5 mb-4">
				{props.block.title}
			</h2>
			<div className="row">
				{props.block.id === 3 && (
					<Card
						className="p-0 px-md-3 m-2 home-card"
						key={"concept-card-" + props.block.id}
					>
						<h3 className="mb-3 mt-5 text-center">
							{props.conceptsCard.title}
						</h3>
						<Card.Body className="d-flex flex-column justify-content-center">
							{props.conceptsCard.concepts.map(
								(concept, index) => {
									return (
										<React.Fragment key={index}>
											<h4>{concept.subtitle}</h4>
											<p>{concept.texts[0]}</p>
											<p>{concept.texts[1]}</p>
										</React.Fragment>
									);
								}
							)}
						</Card.Body>
					</Card>
				)}
				{props.cards.map(card => {
					return <HomeCard key={card.id} card={card} />;
				})}
			</div>
		</React.Fragment>
	);
};

export default HomeContentBlock;

HomeContentBlock.propTypes = {
	block: PropTypes.object,
	conceptsCard: PropTypes.object,
	cards: PropTypes.arrayOf(PropTypes.object)
};
