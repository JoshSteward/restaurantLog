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


const Public = () => <h3>Public</h3>
const Private = () => <h3>Private</h3>

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

class LoginApp extends Component {


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

function App() {
  // This allows us to set the user's authentication state in the context object
  const { setIsAuthenticated } = useContext(AuthContext);

  // State object to store everything from our form
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });

  const [hasErrorState, setHasErrorState] = useState(false);

  // history hook to use for navigating the user
  const history = useHistory();

  // if a value in the form changes, we update the state object above
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value.trim() })
  };

  // handle form submit button clicked
  function handleFormSubmit(e) {
    e.preventDefault(); // Avoid reloading page (which is default behaviour upon submit for a form)
    setHasErrorState(false);
    if (formState.email && formState.password) { // Was email and password entered?
      // We make the API call, and if there's a returned object from the server we navigate the user back to the root level and set the context
      API.userLogin({
        email: formState.email,
        password: formState.password
      })
        .then(response => {
          if (response.data.id) {
            setIsAuthenticated(true);
            history.push('/');
          } else {
            setHasErrorState(true);
          }
        })
        .catch(err => {
          setFormState({
            email: "",
            password: ""
          });
          setHasErrorState(true);
          console.log(err);
        }
        );
    }
  }

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
            <PrivateRoute path="/private" component={Saved}/>
            <Route path='/signup' component={Signup}></Route>


              <Footer></Footer>
          </Wrapper>
        </BrowserRouter>
  );
}

export default App;

