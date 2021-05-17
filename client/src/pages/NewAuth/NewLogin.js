import React, { useState, useContext, Component } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import API from "../../utils/API"
import { AuthContext } from "../../utils/AuthContext";
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import Card from "../../components/Card";
import {Input, FormBtn} from "../../components/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "../../utils/Auth";
import Saved from "../Search/Search";
import "./NewLogin.css";
import background from "../../Images/LoginPicture.jpeg";

function NewLogin() {
  // This allows us to set the user's authentication state in the context object
  const { setIsAuthenticated } = useContext(AuthContext);

  // State object to store everything from our form
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });

  const [hasErrorState, setHasErrorState] = useState(false);

  // history hook to use for navigating the user
  const history = useHistory();

  // if a value in the form changes, we update the state object above
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value.trim() })
  };

  // handle form submit button clicked
  function handleFormSubmit(e) {
    e.preventDefault(); // Avoid reloading page (which is default behaviour upon submit for a form)
    setHasErrorState(false);
    console.log("button pushed");
    console.log('form state ', formState);
    if (formState.email && formState.password) { // Was email and password entered?
      // We make the API call, and if there's a returned object from the server we navigate the user back to the root level and set the context
      Auth.login({
        username: formState.email,
        password: formState.password
      })
        .then(response => {
            console.log("response: ", response);
            console.log("RESPONSE.DATA.ID: ", response.data.data.id)
          if (response.data.data.id) {
            setIsAuthenticated(true);
            history.push('/');
          } else {
            setHasErrorState(true);
          }
        })
        .catch(err => {
          setFormState({
            email: "",
            password: ""
          });
          setHasErrorState(true);
          console.log(err);
        }
        )
    }
  }

   

  return (
    <Container className="toBeDone" style={{backgroundImage: 'url(${background})'}}>

            <Row className="toBeDone">
                <Col className="toBeDone" size="md-3"></Col>
                <Col className="toBeDone" size="md-6">
                    <Card className="toBeDone" title="Login">
                        <form className="toBeDone">
                            <h3>Login Form</h3>
                            <label htmlFor="Email: ">Email</label>
                            <Input
                            type="text"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            />
                            <label htmlFor="password">Password</label>
                            <Input
                            type="password"
                            name="password"
                            value={formState.password}
                            onChange={handleInputChange}
                            />
                            <br></br>
                            <FormBtn onClick={handleFormSubmit}>Login</FormBtn>
                            <Link to="/signup" float="middle">Signup</Link>
                        </form>
                    </Card>
                </Col>
                <Col size="md-3"></Col>

            </Row>

                    </Container>
  );
}



export default NewLogin;
