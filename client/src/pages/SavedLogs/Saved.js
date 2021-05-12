import React, { Component } from "react";
import Container from "../../components/Container";
import Results from "../../components/Results";
import API from "../../utils/API";
import Col from "../../components/Col";
import Row from "../../components/Row";
import {FormBtn, Input} from "../../components/Form/"
import List from "../../components/List/List";
import ListItem from "../../components/ListItem/ListItem";


//saved logs state
class Saved extends Component {
    state = {
        locationName:"",
        location: "",
        menuItems:"",
        thoughts:"",
        email: "",
    }

    //set state of saved books (variable: function)
    componentDidMount() {
        this.loadLogs();
    }
    
    loadLogs = () => {
        API.getUserLogs(this.props.email)
            .then(res => 
                this.setState({email: res.data, locationName:"", location:"", menuItems:"", thoughts:""})
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
            thoughts: this.state.thoughts
        })
        .then(res => this.loadLogs())
        .catch(err => console.log(err));
    }
    


    //render using savedBooks state created above 
    render() {
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
                            <FormBtn>Submit Log</FormBtn>
                        </form>    
                    </Col>

                    <Col size="md-8">
                        {this.state.logs? (
                            <List>
                                {this.state.logs.map(logs => {
                                    return (
                                        <ListItem key={logs.id}>
                                            <a href={"/logs"+logs.id}>
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