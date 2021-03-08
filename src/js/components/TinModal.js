import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const TinModal = ({
	title,
	content,
	okButton,
	okVariant = "",
	cancelButton = "",
	cancelVariant = "",
	handleOk = () => {},
	handleCancel = () => {},
	handleOuterClick = () => {}
}) => {
	return (
		<React.Fragment>
			<div className="tin-modal">
				<div className="tin-modal-title">
					<h4>{title}</h4>
				</div>
				<br />
				<div className="tin-modal-body">
					<div className="tin-modal-content">{content}</div>
				</div>
				<br />
				<div className="tin-modal-actions">
					<Button
						variant={okVariant === "" ? "success" : okVariant}
						onClick={e => handleOk()}
						className="m-2"
					>
						{okButton}
					</Button>
					{cancelButton != "" && (
						<Button
							variant={
								cancelVariant === "" ? "danger" : cancelVariant
							}
							className="m-2"
							onClick={e => handleCancel(e)}
						>
							{cancelButton}
						</Button>
					)}
				</div>
			</div>
			<div
				className="tin-modal-overlay"
				onClick={e => handleOuterClick(e)}
			></div>
		</React.Fragment>
	);
};

export default TinModal;

TinModal.propTypes = {
	title: PropTypes.string,
	content: PropTypes.node,
	okButton: PropTypes.string,
	cancelButton: PropTypes.string,
	okVariant: PropTypes.string,
	cancelVariant: PropTypes.string,
	handleOk: PropTypes.func,
	handleCancel: PropTypes.func,
	handleOuterClick: PropTypes.func
};
