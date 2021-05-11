//import logo from './logo.svg';
import './App.css';
import Login from "./pages/Auth/Login";
import Saved from "./pages/SavedLogs/Saved"
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Footer from './components/Footer';
import Signup from './pages/Signup/Signup'
import newLog from "./pages/newLog/newLog"
import React, { Component } from 'react';
import Auth from "./utils/Auth";
import API from "./utils/API";

class App extends Component {

  constructor() {
    super();
      this.state={
        loggedIn: false,
        user:null
      };
  }

  componentDidMount() {
    Auth.getUser().then(response => {
      console.log(response.data);
      if (!!response.data.user) {
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      } else {
          this.setState({
              loggedIn: false,
              user: null
          });
      }
    });
  }

  logout = (event) => {
    event.preventDefault();
      Auth.logout().then(response => {
        console.log("logged out");
        if (response.status === 200) {
          this.setState({
            loggedIn: false,
            user:null
          });
        }
      });
  }

  login = (email, password) => {
      Auth.login().then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            loggedIn: true,
            user:null
          });
        }
      });
  }

render() {
    return (
    <div>
      <Wrapper>
        <Header></Header>
        <Signup>
          
        </Signup>
          <Footer></Footer>
      </Wrapper>
    </div>
    )
  }
}



export default App;
