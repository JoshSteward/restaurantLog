import React, { Component } from 'react';
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import Card from "../../components/Card";
import {Input, FormBtn} from "../../components/Form";
import 'bootstrap/dist/css/bootstrap.min.css';


//add link next to redirect
//check link to API link
//on line 70 add 
//                            <Link to="/signup">SignUp</Link>
//when ready 
import { Redirect, Link } from 'react-router-dom';


class login extends Component {

    constructor() {
        super();
        
            this.state = {
                username: '',
                password: '',
                redirectTo: null
            };
        }
    
        handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    
        handleSubmit = (event) => {
            event.preventDefault();
            console.log('handleSubmit');
            this.props.login(this.state.username, this.state.password);
            this.setState({
                redirectTo: '/'
            });
        }

        render() {
            if(this.state.redirectTo) {
                return<Redirect to={{ pathname: this.state.redirectTo}} />
            } else {
                return (
                    <div ClassName="login">
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
                            name="Email"
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
                            <FormBtn onClick={this.handleSubmit}>Login</FormBtn>
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