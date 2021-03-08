import React, { useState } from 'react';
import {loadMore} from './redux';
import Movie from './movie.js';
import { connect } from "react-redux";
import './movie.css';
// import LoadMore from './loadMore';
import InfiniteScroll from 'react-infinite-scroll-component';
function MovieList(props){
    const [loadMore, setLoadMore] = useState(false);
    console.log("hi hello this is inside movielist")
    function handleLoadMore(event){
        fetch(
            "https://www.omdbapi.com/?apikey="+process.env.REACT_APP_API_KEY+"&page="+props.page+"&s=" + props.searchQuery
          )
            .then((res) => res.json())
            .then((res) => {
              console.log("inside LoadMore:",res.Search);
              console.log("inside props:", props);
             
              props.loadMore(res.Search);
              
            });
        
    }
   
var movies ="";
var nominatedMovies="";
console.log(typeof(props.movieList))
try{
    const Movies = props.movieList.filter(movie => movie.Type === "movie");
    console.log("only movie length:", Movies.length);
     movies = Movies.map((data) => (
    <Movie movieInfo ={data}  nominated="notNominated"/>
    
      ));
      
      nominatedMovies = props.nominateList.map((data) => (
        <Movie movieInfo ={data}  nominated="nominated"/>
          ));
}
catch(e){
    console.log("error");
}
console.log("movies inside movielist: ",movies);
return(
    <div>
    <div className="row">
    {/* <div id="movieInfo">
        <h1 style={{textAlign:"center"}}>All Movies</h1> */}
        <InfiniteScroll 
        dataLength={movies.length} //This is important field to render the next data
        next={handleLoadMore}
        hasMore={true}
        //loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        >
            <div id="movieInfo" >
    <h1 style={{textAlign:"center"}}>Nominated Movies</h1>
{nominatedMovies}
</div>
             <div id="movieInfo">
        <h1 style={{textAlign:"center"}}>All Movies</h1>
    {movies}
    </div>
    
    {/* <div id="movieInfo" className="nominatedMovieWebView" >
    <h1 style={{textAlign:"center"}}>Nominated Movies</h1>
{nominatedMovies}
</div> */}
</InfiniteScroll></div>
{/* {movies.length?<LoadMore/>:null} */}
</div>
)
}


function mapStateToProps(state) {
    return {
      movieList: state.movieList,
      nominateList: state.nominateList,
      page:state.page,
      searchQuery:state.searchQuery
    };
  }
  
  export default connect(mapStateToProps, {loadMore})(MovieList);
  
