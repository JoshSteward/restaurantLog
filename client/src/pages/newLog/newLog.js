import React, { Component } from 'react';
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import Card from "../../components/Card";
import {Input, FormBtn} from "../../components/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import API from "../../utils/API";

class newLog extends Component {

    state= {
        locationName: "",
        location: "",
        menuItems: "",
        thoughts: "",
    };

    componentDidMount() {
        this.userLogs();
    }

    loadUserLogs= () => {
        API.getUserLogs(this.props.user.email)
            .then(res => 
                this.setState({  email: res.data, locationName: "", locaiton: "", menuItems: "", thoughts: ""})
                )
                .catch(err => console.log(err));
    };

    deleteLog = id => {
        API.deleteLog(id)
            .then(res => this.loadUserLogs())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const {name, value} = event.target 
        this.setState({
            [name]:value 
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        console.log(this.props)
        API.saveLog({
            locationName: this.state.locationName,
            location: this.state.location,
            menuItems: this.state.menuItems,
            thoughts: this.state.thoughts
        })
        .then(res => this.loadUserLogs())
        .catch(err => console.log(err));
    };

    render() {
        return (
            <Container>
                                            <h1>Hello Test</h1>

                <Row>
                    <Col size="md-6">
                        <Card>
                            <form>
                                <Input
                                value={this.state.locationName}
                                onChange={this.handleInputChange}
                                name="locationName"
                                placeholder="Location Name"
                                inputvalue=""
                                />
                            </form>

                            <form>
                                <div>
                                    <textarea
                                    className="form-control" rows="3" id="Input"
                                    value={this.state.location}
                                    onChange={this.handleInputChange}
                                    name="location"
                                    placeholder="Location"
                                    >
                                    </textarea>
                                    <textarea
                                    className="form-control" rows="3" id="Input"
                                    value={this.state.menuItems}
                                    onChange={this.handleInputChange}
                                    name="menuItems"
                                    placeholder="MenuItems"
                                    >
                                    </textarea>
                                    <textarea
                                    className="form-control" rows="3" id="Input"
                                    value={this.state.thoughts}
                                    onChange={this.handleInputChange}
                                    name="thoughts"
                                    placeholder="Thoughts"
                                    >
                                    </textarea>
                                </div>
                                <FormBtn
                                onClick={this.handleFormSubmit}>
                                </FormBtn>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }


}

export default newLog; 