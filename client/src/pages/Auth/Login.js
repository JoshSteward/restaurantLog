import React, { Component } from 'react';
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import Card from "../../components/Card";
import {Input, FormBtn} from "../../components/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "../../utils/Auth";
import Saved from "../Search/Search";

 


//add link next to redirect
//check link to API link
//on line 70 add 
//                            <Link to="/signup">SignUp</Link>
//when ready 
import { Redirect, Link, useHistory } from 'react-router-dom';


class login extends Component {


    constructor() {
        super();
        
            this.state = {
                email: '',
                password: '',
                redirectTo: null
            };
        }
    
        handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
        
        //auth.login
        handleSubmit = (event) => {
            event.preventDefault();
            console.log('handleSubmit');
            //this.props.login(this.state.email, this.state.password);
            Auth.login({
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                console.log(response);
                  this.props.history.push('/'); 
            });
        }

        render() {
            if(this.state.redirectTo) {
                return<Redirect to={{ pathname:"Saved", state:this.state.redirectTo}} />
            } else {
                return (
                    <div className="login">
                    <Container className="toBeDone">

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
                            value={this.state.email}
                            onChange={this.handleChange}
                            />
                            <label htmlFor="password">Password</label>
                            <Input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            />
                            <br></br>
                            <FormBtn onClick={this.handleSubmit}>Login</FormBtn>
                            <Link to="/signup" float="middle">Signup</Link>
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
}

export default login;