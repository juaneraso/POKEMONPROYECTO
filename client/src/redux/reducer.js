import { GET_POKEMONES} from "./actions";
import { SEARCH_POKEMONES } from "./actions";
import { SEARCH_ID} from "./actions";
import { CLEAN_SEARCH } from "./actions";

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
         searchResults:action.payload,
          
        };

        case SEARCH_ID: 
        return {...state,
          searchResultsId:action.payload,
          
        };

        case CLEAN_SEARCH: 
        return {...state,
          searchResults:[],
          
        };
       
       
     default:
       return{ ...state };  // retornar una copia del estado 



  }
  


};

export default rootReducer;