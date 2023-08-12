
import  {Home,Landing,Detail,Form} from "./views";
import {Route} from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function App() {
const location = useLocation();

  return (
    <div className="App">

      {location.pathname !== "/" && <NavBar/>}
      
      <Route exact path="/" component = {Landing}/>
      <Route exact path="/detail" component = {Detail}/>
      <Route exact path="/create" component = {Form}/>     
      <Route  path="/home">
      <Home/>
      </Route>
     
    </div>
  );
}

export default App;
