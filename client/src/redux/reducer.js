import { GET_POKEMONES} from "./actions";
import { SEARCH_POKEMONES } from "./actions";
import { SEARCH_ID} from "./actions";

const initialState = {


 pokemones:[], searchResults:[],searchResultsId:[]

};

const rootReducer = (state = initialState,action) =>{
  switch (action.type){
     case GET_POKEMONES: 
        return {...state,
          pokemones:action.payload,
          
        }
      case SEARCH_POKEMONES: 
        return {...state,
         //searchResults:action.payload,
         searchResults: state.query === "" ? [] : action.payload,
          
        };

        case SEARCH_ID: 
        return {...state,
          searchResultsId:action.payload,
          
        };
       
     default:
       return{ ...state };  // retornar una copia del estado 



  }
  


};

export default rootReducer;