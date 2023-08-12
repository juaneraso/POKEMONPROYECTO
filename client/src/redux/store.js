import { createStore ,applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ; //esta linea sirve para conectar nuestra app con la extension redux devtools con el navegador



const store = createStore (
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) //esta linea nos sirver para hacer peticiones a una API/SERVIDOR
    );

export default store;
