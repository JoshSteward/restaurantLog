//import logo from './logo.svg';
import './App.css';
import Login from "./pages/Auth/Login";
import Saved from "./pages/SavedLogs/Saved"
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Footer from './components/Footer';
import Signup from './pages/Signup/Signup'
import newLog from "./pages/newLog/newLog"

function App() {
  return (
   <div>
     <Wrapper>
       <Header></Header>
        <newLog>
          
        </newLog>
        <Footer></Footer>
     </Wrapper>
   </div>
  );
}

export default App;
