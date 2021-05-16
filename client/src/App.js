//import logo from './logo.svg';
import './App.css';
import Login from "./pages/Auth/Login";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Footer from './components/Footer';
import Signup from './pages/Signup/Signup'
import newLog from "./pages/newLog/newLog"
import React, { Component, useState, useEffect, useContext } from 'react';
import Auth from "./utils/Auth";
import API from "./utils/API";
import { BrowserRouter, Route, Link, Redirect, withRouter, useHistory } from 'react-router-dom';
import {FormBtn} from "./components/Form";
import Saved from "./pages/Saved/Saved";
import AuthContext from "./utils/AuthContext";
import NewLogin from "./pages/NewAuth/NewLogin";
import Geolocation from './components/Geolocation/Geolocation';




const Public = () => <h3>Public</h3>
const Private = () => <h3>Private</h3>

/*
const PrivateRoute =({ component: Component, ...rest}) => (
  <Route{...rest} render={(props) => (
    AuthContext.isAuthenticated === true 
      ?  <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location}
      }}/>

  )}/>
)

const PublicRoute =({ component: Component, ...rest}) => (
  <Route{...rest} render={(props) => (
    AuthContext.isAuthenticated === false 
      ?  <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location}
      }}/>

  )}/>
)

*/

//class LoginApp extends Component {

/*
  state = {
    redirectToReferrer:false
  }
  login = () => {
    AuthContext.authenticate(() => {
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
*/

function App() {
  const [isAuthenticated, setIsAuthenticated ] = useState(false);
  const value = { isAuthenticated, setIsAuthenticated };

  // We check if user is already logged in, and if they are then we set isAuthenticated to true
  useEffect(() => {
    Auth.userLoggedIn().then(response => {
      setIsAuthenticated(response.data.isAuthenticated)
    })
  }, []);



  const AuthButton = withRouter(({ history }) => (
    AuthContext.isAuthenticated === true 
    ? 
    <p>
      Welcome! <button onClick={() => {
      API.signout(() => history.push('/'))
      }}> Sign Out 
      </button>
    </p>
    : 
    <p>You are not logged in</p>
  ))



  return (
    <AuthContext.Provider value={value}>
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
            <Route path='/login' component={NewLogin}></Route>
            <Route path="/private"/>
              {isAuthenticated ?
                <Saved /> : <NewLogin />}
            <Route path='/signup' component={Signup}></Route>


              <Footer></Footer>
          </Wrapper>
          <Geolocation></Geolocation>
        </BrowserRouter>
        </AuthContext.Provider>  );
}

export default App;

