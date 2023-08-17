
import  {Home,Landing,Detail,Form} from "./views";
import {Route} from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function App() {
const location = useLocation();

  return (
    <div className="App">

      {location.pathname !== "/" && <NavBar/>}
       <br></br>        
      <Route exact path="/" component = {Landing}/>
      <Route exact path="/detail/:id" component = {Detail}/>
      <Route exact path="/create" component = {Form}/>     
      <Route  path="/home">
      <Home/>
      </Route>
     
    </div>
  );
}

export default App;
