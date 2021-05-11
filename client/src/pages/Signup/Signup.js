//singup page for application 
import React, { Component } from 'react';
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import Card from "../../components/Card";
import {Input, FormBtn} from "../../components/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';
import Auth from "../../utils/Auth";

class Signup extends Component {

    constructor() {
        super();

            this.state = {
                firstName: "",
                lastName: "",
                dob:"",
                email:"",
                password:"",
                confirmPassword:""
            };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

        //handleSubmit has to be linked to an API 
        //still need to create front end api 
        handleSubmit = (event) => {
            //method tells the user agent that if the event does not get explicitly handled, 
            //its default action should not be taken as it normally would be
            event.preventDefault();
                //insert api
                //API.signup line
                Auth.signup({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                dob: this.state.dob,
                email: this.state.email,
                password: this.state.email
            }).then(response => {
                console.log(response)
                this.setState({
                    redirectTo:"/"
                });

            });
            //check what's coming out
        }

        render() {
            if (this.state.redirectTo) {
                return <Redirect to={{ pathname: this.state.redirectTo }} />

            }

            return (
                <div className="login">
                <Container className="toBeDone">

        <Row className="toBeDone">
            <Col className="toBeDone" size="md-3"></Col>
            <Col className="toBeDone" size="md-6">
                <Card className="toBeDone" title="Signup">
                    <form className="toBeDone">
                        <h3>Signup Form</h3>
                        <label htmlFor="fistName: ">First Name</label>
                        <Input
                        type="text"
                        name="firstName"
                        value={this.state.username}
                        onChange={this.handleChange}
                        />
                        <label htmlFor="lastName: ">Last Name</label>
                        <Input
                        type="text"
                        name="lastName"
                        value={this.state.username}
                        onChange={this.handleChange}
                        />
                        <label htmlFor="dob: ">Date of Birth</label>
                        <Input
                        type="text"
                        name="dob"
                        value={this.state.username}
                        onChange={this.handleChange}
                        />
                        <label htmlFor="Email: ">Email</label>
                        <Input
                        type="text"
                        name="email"
                        value={this.state.username}
                        onChange={this.handleChange}
                        />
                        <label htmlFor="password">Password</label>
                        <Input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        />
                        <FormBtn onClick={this.handleSubmit}>Signup</FormBtn>
                    </form>
                </Card>
            </Col>
            <Col size="md-3"></Col>

        </Row>

                </Container>
                </div>
            )
        }
    
    
}

export default Signup;