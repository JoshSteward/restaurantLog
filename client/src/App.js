//import logo from './logo.svg';
import './App.css';
import Login from "./pages/Auth/Login";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Footer from './components/Footer';
import Signup from './pages/Signup/Signup'
import newLog from "./pages/newLog/newLog"
import React, { Component } from 'react';
import Auth from "./utils/Auth";
import API from "./utils/API";
import { BrowserRouter, Route, Link, Redirect, withRouter } from 'react-router-dom';
import {FormBtn} from "./components/Form";
import Saved from "./pages/Saved/Saved";
import AuthContext from "./utils/AuthContext";
import newLogin from "./pages/NewAuth/NewLogin";


//fake authentication

const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}



const Public = () => <h3>Public</h3>
const Private = () => <h3>Private</h3>

const PrivateRoute =({ component: Component, ...rest}) => (
  <Route{...rest} render={(props) => (
    fakeAuth.isAuthenticated === true 
      ?  <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location}
      }}/>

  )}/>
)

const PublicRoute =({ component: Component, ...rest}) => (
  <Route{...rest} render={(props) => (
    fakeAuth.isAuthenticated === false 
      ?  <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location}
      }}/>

  )}/>
)

class LoginApp extends Component {

  state = {
    redirectToReferrer:false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer:true
      }))
    })
  }
  render() {
    const { redirectToReferrer } = this.state
    const { from } = this.props.location.state || {from: {pathname: '/'}}
    if (redirectToReferrer === true) {
      return (
        <Redirect to= {from}/>
      )
    }
    return(
      <div>
        <p> must login to view this page at {from.pathname}</p>
        <FormBtn onClick = {this.login} >Login </FormBtn>
      </div>
    )
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated === true 
  ? 
  <p>
    Welcome! <button onClick={() => {
    fakeAuth.signout(() => history.push('/'))
    }}> Sign Out 
    </button>
  </p>
  : 
  <p>You are not logged in</p>
))

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
        <BrowserRouter>
          <Wrapper>
            <AuthButton />
            <Header></Header>
            <ul>
              <li><Link to='/public'>Public Page</Link></li>
              <li><Link to='/private'>Private Page</Link></li>
              <li><Link to='/signup'>Signup</Link></li>


            </ul>
            <Route path='/public' component={Public}></Route>
            <Route path='/login' component={Login}></Route>
            <PrivateRoute path="/private" component={Saved}/>
            <PublicRoute path='/signup' component={Signup}></PublicRoute>


              <Footer></Footer>
          </Wrapper>
        </BrowserRouter>
    </div>
    )
  }
}



export default App;
