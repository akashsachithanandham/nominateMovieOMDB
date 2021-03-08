import React, { useState, Component } from "react";
import { connect } from "react-redux";
import './movie.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pushNomination, removeNomination } from "./redux";
toast.configure();
function Movie(props) {
  const [nominated, setNominated] = useState(props.nominated);

  function handleNominate(event) {
    console.log(event.target.id);
    setNominated("nominated");

    console.log(
      "nominate button is clicked and the value: ",
      event.target.value
    );
    console.log("nominateList", props.nominateList);
    console.log(props);

    try {
      if (props.nominateList.length < 5) {
        props.pushNomination(props.movieInfo);
        toast.success("Thanks for nominating " + props.movieInfo.Title+"!", { position: toast.POSITION.TOP_CENTER ,autoClose:1000});
        console.log("afeter nomination:", props.nominateList);
        localStorage.setItem("nominated",JSON.stringify([...props.nominateList,props.movieInfo]));
        console.log("After nomination",JSON.parse(localStorage.getItem("nominated")))
      } else {
        toast.error("Nomination Limit Reached!", { position: toast.POSITION.TOP_CENTER });
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleRemoveNominate(event) {
    console.log(
      "nominate button is clicked and the value: ",
      event.target.value
    );
    console.log("nominateList", props.nominateList);
    console.log(props);

    try {
      props.removeNomination(props.movieInfo);
      setNominated("notNominated");
      console.log("inside remove", props.movieInfo);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div id="movie" className="rowInside">
      <div id="movieInfoInside"><img className="poster" src={props.movieInfo.Poster} alt={props.movieInfo.Title} style={{objectFit: "contain",
                        height: "200px",
                        width: "100%",
                        maxWidth: "200px",}}></img></div>
      <div id="movieInfoInside"  style={{marginLeft:"50px"}}><h2 style={{textAlign:"center"}}>{props.movieInfo.Title}</h2>
      <h4 >Year: {props.movieInfo.Year}</h4>
     
     
      {!props.nominateList.some(movie => movie.imdbID === props.movieInfo.imdbID)?(
        <button
          onClick={handleNominate}
          id="nominateButton"
          value={props.movieInfo}
          
        >
          Nominate
        </button>
      ) : (
        <button
          onClick={handleRemoveNominate}
          id="nominateButton"
          value={props.movieInfo}
        >
          
          Remove Nominate
        </button>
      )}
    </div></div>
  );
}
function mapStateToProps(state) {
  return {
    nominateList: state.nominateList,
  };
}

export default connect(mapStateToProps, { pushNomination, removeNomination })(
  Movie
);
