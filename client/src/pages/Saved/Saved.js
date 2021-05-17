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



//saved logs state
class Saved extends Component {
    state = {
        locationName:"",
        location: "",
        menuItems:"",
        thoughts:"",
        userId: "",
    }

    //set state of saved books (variable: function)
    componentDidMount() {
        this.loadLogs();
    }
    
    loadLogs = () => {
        API.getUserLogs(this.props.userId)
            .then(res => 
                this.setState({userId: res.data, locationName:"", location:"", menuItems:"", thoughts:""})
                )
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

    handleFormSubmit = event => {
        event.preventDefault();
        API.saveLog({
            locationName: this.state.locationName,
            location: this.state.location,
            menuItems: this.state.menuItems,
            thoughts: this.state.thoughts,
            userId: this.state.userId
        })
        .then(res => this.loadLogs())
        .catch(err => console.log(err))
        this.setState({
            redirectTo:"/"
        });
    }
    


    //render using savedBooks state created above 
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
    
        }
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
                            <FormBtn onClick={this.handleFormSubmit}>Submit Log</FormBtn>
                            <LogoutBtn>Logout Button</LogoutBtn>

                        </form>    
                    </Col>

                    <Col size="md-8">
                        {this.state.logs? (
                            <List>
                                {this.state.logs.map(logs => {
                                    return (
                                        <ListItem key={logs.id}>
                                            <a href={"api/logs/email/test@test"}>
                                                <h3>{logs.locationName}</h3>
                                            </a>
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

export default Saved;