import React, { Component } from "react";
import Results from "../../components/Results";
import API from "../../utils/API";

//saved logs state
class Saved extends Component {
    state = {
        savedLogs: [],
    }

    //set state of saved books (variable: function)
    componentDidMount() {
        API.savedLogs()
            .then(savedLogs => this.setState({ savedLogs: savedLogs }))
            .catch(err => console.error(err));
    }

    //render using savedBooks state created above 
    render() {
        return (
            <div className="container">
                <h2>Saved Logs</h2>
                <Results logs={this.state.savedLogs} />
            </div>
        )
    }
}

export default Saved;