import redux, { createStore } from "redux";
// import thunk from "redux-thunk";

const initialState = {
  nominateList: JSON.parse(localStorage.getItem("nominated")),
  movieList: [],
  page:2,
  searchQuery:""
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "MOVIE_PUSH":
      return { ...state, movieList: action.payload };
      case "APPEND_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "NOMINATE_MOVIE":
        // localStorage.setItem("nominated",JSON.stringify([...state.nominateList,action.payload]));
        console.log("afeter nomination:", state.nominateList);
        console.log("After nomination",JSON.parse(localStorage.getItem("nominated")))
      return {
        ...state,
        nominateList: [...state.nominateList, action.payload],
      };
    
    case "LOAD_MORE":
        return{
            ...state,movieList:[...state.movieList, ...action.payload],page:state.page+1
        }
    case "REMOVE_NOMINATION": {
      const nominateListCopy = [...state.nominateList];
        console.log("After remove inside store: ",state.nominateList.some(movie => movie.imdbID === action.payload.imdbID))
        
      const updatedArr = nominateListCopy.filter(
        (thing) => thing.imdbID !== action.payload.imdbID
      );
      localStorage.setItem("nominated",JSON.stringify([...updatedArr]));
      return {
        ...state,
        nominateList: updatedArr,
      };
    }

    default:
      return state;
  }
}

const store = createStore(reducer);
store.subscribe(() => console.log("from store: ", store.getState()));
console.log("store: ", store.getState());
export default store;
