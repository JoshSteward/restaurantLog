//fake authentication
/*
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
*/

  

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
            <Route path='/login' component={NewLogin}></Route>
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