import React, { Component } from "react";
import Container from "../../components/Container";
import Results from "../../components/Results";
import API from "../../utils/API";
import Col from "../../components/Col";
import Row from "../../components/Row";
import {FormBtn, Input} from "../../components/Form"
import List from "../../components/List/List";
import ListItem from "../../components/ListItem/ListItem";
import { Redirect } from 'react-router-dom';
import { LogoutBtn } from "../../components/LogoutBtn/LogoutBtn";
import { AuthContext } from "../../utils/AuthContext";


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
                    this.setState({logs:res.data})
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
            redirectTo:"/"
        });
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
                            <FormBtn onClick={(e)=>this.handleFormSubmit(e,this.context.userId)}>Submit Log</FormBtn>
                            <LogoutBtn>Logout Button</LogoutBtn>

                        </form>    
                    </Col>

                    <Col size="md-8">
                        {this.state.logs? (
                            <List>
                                {this.state.logs.map(logs => {
                                    return (
                                        <ListItem key={userId}>
                                                <h3>Name: {logs.locationName}</h3>
                                                <h2>Location: {logs.location}</h2>
                                                <h2>Menu Items: {logs.menuItems}</h2>
                                                <h2>Thoughts: {logs.thoughts}</h2>
                                        </ListItem>
                                    );
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

Saved.contextType=AuthContext;

export default Saved;