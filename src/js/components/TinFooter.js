import React from "react";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";

const TinFooter = props => {
	return (
		<Container fluid className="bg-dark">
			<Container>
				<div className="row footer-sn-row py-3 justify-content-center mt-3">
					{props.content.ssnnItems.map(item => {
						return (
							<img
								className="mx-3 my-1"
								key={item.name}
								src={item.icon}
								alt={item.name}
							/>
						);
					})}
				</div>
				<div className="footer-terms d-none d-md-block">
					{props.content.terms.map(term => {
						return (
							<React.Fragment key={term.title}>
								<h5 className="mt-3 mb-2 text-center text-md-left">
									{term.title}
								</h5>
								<React.Fragment>
									{term.contents.map((content, index) => {
										return (
											<p
												key={term.title + "-" + index}
												className="text-justify"
											>
												{content}
											</p>
										);
									})}
								</React.Fragment>
							</React.Fragment>
						);
					})}
				</div>
				<div className="row footer-cpr mb-4">
					<div className="my-2 col-md-6 justify-content-left">
						<img
							src={props.content.copyrights.icon}
							className="ml-0"
						/>
						{props.content.copyrights.texts.map((text, index) => {
							return <p key={index}>{text}</p>;
						})}
					</div>
					<div className="my-2 col-md-6 text-right">
						<p>
							{"created by: " +
								props.content.copyrights.createdBy}
						</p>
						<p>{"built by: " + props.content.copyrights.builtBy}</p>
						<div className="row align-items-center justify-content-end">
							<p>powered by:</p>
							<img src={props.content.copyrights.poweredBy} />
						</div>
					</div>
				</div>
			</Container>
		</Container>
	);
};

export default TinFooter;

TinFooter.propTypes = {
	content: PropTypes.object
};
