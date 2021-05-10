import React, { Component } from "react";
import API from "../../utils/API";

class Results extends Component {
    //need to add this in saved.js
    state = {
        savedLogs: [],
    }

    componentDidMount() {
        API.savedLogs()
            .then(savedLogs => this.setState({ savedLogs: savedLogs }))
            .catch(err => console.error(err));
    }

    //save and delete logs using routes from front end API
    handleSave = log => {

        if (this.state.savedLogs.map(log => log._id).includes(log._id)) {
            //add API route deleteLog
            API.deleteLog(log._id)
                .then(deletedLog => this.setState({ savedLogs: this.state.savedLogs.filter(log => log._id !== deletedLog._id) }))
                //changing state of (variable:function) savedbooks: will return items in array where book id does not = delete book id (unsave item from array)
                
                .catch(err => console.error(err));
        } else {
            API.saveLog(log)
                .then(savedLog => this.setState({ savedLogs: this.state.savedLogs.concat([savedLog]) }))
                .catch(err => console.error(err));
        }
    }

    render() {
        return (
            <div>
                {!this.props.logs.length ? (
                    <h1 className="text-center">No Results to Display</h1>
                ) : (
                        <div>
                            {this.props.logs.map(result => (
                                <div className="card mb-3" key={result._id}>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img alt={result.title} className="img-fluid" />
                                        </div>
                                        <div className="col-md-10">
                                            <div className="card-body">
                                                <h5 className="card-title">{result.title} by {result.authors}</h5>
                                                <p className="card-text">{result.description}</p>
                                                <div>
                                                    <a href={result.link} className="btn badge-pill btn-outline-dark mt-3" target="_blank" >View</a>
                                                    
                                                    <button onClick={() => this.handleSave(result)} className="btn badge-pill btn-outline-warning mt-3 ml-3" >
                                                        {this.state.savedLogs.map(log => log._id).includes(result._id) ? "Unsave" : "Save"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        )
    }
}

export default Results;
