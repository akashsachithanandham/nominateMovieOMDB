function pushMovies(movieData) {
  return {
    type: "MOVIE_PUSH",
    payload: movieData,
  };
}
function pushNomination(movieData) {
  return {
    type: "NOMINATE_MOVIE",
    payload: movieData,
  };
}
function appendMovies(movieData){
    return {
        type: "APPEND_MOVIES",
        payload: movieData,
      };
}
function insertSearchQuery(searchQuery){
    return {
        type: "APPEND_SEARCH_QUERY",
        payload: searchQuery,
      };
}

function removeNomination(movieData){
    return {
        type: "REMOVE_NOMINATION",
        payload: movieData,
      };
}


function loadMore(movieData){
    return {
        type: "LOAD_MORE",
        payload: movieData,
      };
}
export { pushMovies, pushNomination, appendMovies, removeNomination, loadMore,insertSearchQuery };
