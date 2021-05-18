import React, { Component } from "react";
import Container from "../../components/Container";
import Results from "../../components/Results";
import API from "../../utils/API";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { FormBtn, Input } from "../../components/Form"
import List from "../../components/List/List";
import ListItem from "../../components/ListItem/ListItem";
import { Redirect } from 'react-router-dom';
import { LogoutBtn } from "../../components/LogoutBtn/LogoutBtn";
import { AuthContext } from "../../utils/AuthContext";
import { ListGroup} from "react-bootstrap";


//saved logs state
class Saved extends Component {
    state = {
        logs: []
    }



    //set state of saved books (variable: function)
    componentDidMount() {
        this.loadLogs();
    }

    loadLogs = () => {
        console.log("state", this.state);
        API.getUserLogs()
            .then(res => {
                console.log("res.data", res.data)
                this.setState({ logs: res.data })
            })
            .catch(err => console.log(err));
    }

    //input delete recipe
    //111 add delete button 

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = (event, userId) => {
        event.preventDefault();
        API.saveLog({
            locationName: this.state.locationName,
            location: this.state.location,
            menuItems: this.state.menuItems,
            thoughts: this.state.thoughts,
            //needs to be come from response.data.data.id
            userId: this.context.userId
        })
            .then(response => {
            })
            .then(res => this.loadLogs())
            .catch(err => console.log(err))
        console.log(this.state);
        this.setState({
            locationName:"", location:"", menuItems:"", thoughts:""})
            window.alert("Entry Submitted!");
        
        //this.setState({
            //redirectTo: "/"
        //});
    }



    //render using savedBooks state created above 
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />

        }
        let userId = this.context;
        console.log(userId);
        return (
            <Container>
                <Row>
                    <Col size="md-8">
                        <h2>Submit New Log</h2>
                        <form>
                            <Input
                                value={this.state.locationName}
                                onChange={this.handleInputChange}
                                name="locationName"
                                placeholder="Restaurant Name"
                                inputvalue=""
                            >
                            </Input>
                            <Input
                                value={this.state.location}
                                onChange={this.handleInputChange}
                                name="location"
                                placeholder="Location"
                                inputvalue=""
                            >
                            </Input>
                            <Input
                                value={this.state.menuItems}
                                onChange={this.handleInputChange}
                                name="menuItems"
                                placeholder="Menu Items"
                                inputvalue=""
                            >
                            </Input>
                            <Input
                                value={this.state.thoughts}
                                onChange={this.handleInputChange}
                                name="thoughts"
                                placeholder="Thoughts"
                                inputvalue=""
                            >
                            </Input>
                            <FormBtn onClick={(e) => this.handleFormSubmit(e, this.context.userId)}>Submit Log</FormBtn>
                            <LogoutBtn>Logout Button</LogoutBtn>

                        </form>
                    </Col>

                    <Col size="md-8">
                        {this.state.logs ? (
                            <List>
                                <h2>Previous User Logs</h2>
                                {this.state.logs.filter(logs => logs.userId === userId.userId)
                                .map(logs => {
                                    //for (let i = 0; i <= this.state.logs.length; i++) {
                                        //console.log("this.context: ", this.context.userId);
                                        //console.log("i in for: ",);
                                        //if (this.state.logs[0].userId === this.context.userId) {
                                            //console.log("i: ",this.state.logs);
                                            //console.log("state: ", this.state.logs.userId);
                                            return (
                                                <ListItem key={userId}>
                                                    <ListGroup.Item variant="primary">Name: {logs.locationName}</ListGroup.Item>
                                                    <ListGroup.Item variant="light">Location: {logs.location}</ListGroup.Item>
                                                    <ListGroup.Item variant="light">Menu Items: {logs.menuItems}</ListGroup.Item>
                                                    <ListGroup.Item variant="light">Thoughts: {logs.thoughts}</ListGroup.Item>

                                                </ListItem>
                                            ); 
                                        //} 
                                    //}
                                })}
                            </List>
                        ) : (
                                <h3>No Logs</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

Saved.contextType = AuthContext;

export default Saved;