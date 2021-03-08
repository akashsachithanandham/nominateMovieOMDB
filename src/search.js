import React from "react";
import { connect } from "react-redux";
import "./movie.css"

import { pushMovies,insertSearchQuery } from "./redux";

function Search(props) {
    
  function getMovies(e) {
    console.log(e.target.value);
    
    console.log("props", props);
    console.log("PAGENUBER: ",props.page);
    console.log("https://www.omdbapi.com/?apikey="+process.env.REACT_APP_API_KEY+"&page="+props.page+"s=" + e.target.value)
    fetch(
      "https://www.omdbapi.com/?apikey="+process.env.REACT_APP_API_KEY+"&s=" + e.target.value
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.Search);
        console.log("inside props:", props);
       

        props.pushMovies(res.Search);
        props.insertSearchQuery(e.target.value);
      });
    
  }

  return (
    <React.Fragment>
      <input
        id="search"
        className="search"
        type="text"
        placeholder="Search..."
        onChange={getMovies}
        
      />
      <button
        onClick={getMovies}
        className="search"
        style={{
          display: "inline",
          minWidth: "20px",
          marginLeft: "-20px",
          cursor: "pointer",
          backgroundColor:"SteelBlue"
        }}
      >
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    movieList: state.movieList,
    page:state.page,
    searchQuery:state.searchQuery
  };
}

export default connect(mapStateToProps, { pushMovies,insertSearchQuery })(Search);
