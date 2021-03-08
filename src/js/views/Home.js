import React, { useState, useContext } from "react";
import "../../sass/views/Home.scss";
import homepageContent from "../utils/homepageContent.js";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import HomeCard from "../components/HomeCard";
import HomeContentBlock from "../components/HomeContentBlock";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Home = props => {
	const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const jumbotronTitle = () => {
		if (showLogin) {
			return "Welcome, tracker!";
		} else if (showRegister) {
			return "Fill out and start tracking!";
		} else {
			return "Routines made simple and fun!";
		}
	};
	return (
		<Container fluid="true" className="home-bg-image h-100">
			<Container className="p-0 mb-5">
				<Jumbotron className="mt-4 mt-lg-5 home-jumbotron px-4 px-md-5">
					<h1 className="display-4 text-center text-md-left">
						{jumbotronTitle()}
					</h1>
					{showLogin ? (
						<LoginForm
							goBackHandler={e => setShowLogin(false)}
							goRegisterHandler={e => {
								setShowLogin(false);
								setShowRegister(true);
							}}
						/>
					) : showRegister ? (
						<RegisterForm
							goBackHandler={e => setShowRegister(false)}
							goLoginHandler={e => {
								setShowLogin(true);
								setShowRegister(false);
							}}
						/>
					) : (
						<React.Fragment>
							<p className="mt-4">
								Start tracking your habits and occupations in
								order to take control and feel better, regulate
								your body, stabilize your emotions, gain
								awareness about your life and ownership over
								your self.
							</p>
							<div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end">
								<Button
									size="lg"
									className="m-md-2 my-2 mx-0"
									variant="primary"
									onClick={e => {
										setShowRegister(true);
									}}
								>
									Sign me up!
								</Button>
								<Button
									size="lg"
									className="m-md-2 my-2 mx-0"
									variant="success"
									onClick={e => setShowLogin(true)}
								>
									Log me in!
								</Button>
							</div>
						</React.Fragment>
					)}
				</Jumbotron>
				{homepageContent.contentBlocks.map(block => {
					let batch = homepageContent.contentItems.filter(
						item => item.belongsTo === block.id
					);
					return (
						<HomeContentBlock
							key={block.id}
							block={block}
							cards={batch}
							conceptsCard={homepageContent.conceptsCard}
						/>
					);
				})}
			</Container>
		</Container>
	);
};

export default Home;
