import React, { useState, useContext, useEffect } from "react";
import { Container, Jumbotron, Toast, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import LoginForm from "../components/LoginForm";
import { AppContext } from "../store/AppContext";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const { store, actions } = useContext(AppContext);
  useEffect(() => {
    if (store.authAlert.title) {
      console.log("qeueing dismissal");
      setTimeout(() => {
        actions.dismissAuthAlert();
      }, 5000);
    }
    return () => {
      // cleanup
    };
  }, [store.authAlert]); // only on first load...
  return (
    <Container fluid="true" className="home-bg-image h-100">
      <Container className="p-0 mb-5">
        {store.authAlert.title && (
          <Alert
            dismissible
            className="mt-5"
            variant={store.authAlert.variant}
            onClose={(e) => {
              actions.dismissAuthAlert();
            }}
          >
            {store.authAlert.title}
          </Alert>
        )}

        <Jumbotron className="mt-4 mt-lg-5 home-jumbotron px-4 px-md-5">
          <h1 className="display-4 text-center text-md-left">
            {"Welcome, tracker!"}
          </h1>
          <LoginForm goRegisterHandler={(e) => history.push("/register")} />
        </Jumbotron>
      </Container>
    </Container>
  );
};

export default Login;
