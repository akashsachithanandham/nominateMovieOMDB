import React, { Component } from 'react';
import './index.css';
import Search from './search.js';
// import Nomination from './nomination.js';
// import LoadMore from './loadMore.js';
import MovieList from './movieList.js';
// import dotenv from 'dotenv';
// process = dotenv.config();

import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme.js";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};

`;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            theme:"light"
        };
    }
    
    componentDidMount(){
        var nominated = localStorage.getItem("nominated");
        console.log("inside component did mount: ",nominated);
        if(nominated == null){
            localStorage.setItem("nominated",JSON.stringify([]));
        }
        console.log(JSON.parse(localStorage.getItem("nominated")))
        console.log(process.env.REACT_APP_API_KEY
            );
    }
    
    render() { 
        //localStorage.setItem("nominated",JSON.stringify([]));
        
        const themeToggler = () => {
            this.state.theme === "light" ? this.setState({theme:"dark"}) : this.setState({theme:"light"}) ;
          };
        console.log("inside app",JSON.parse(localStorage.getItem("nominated")));
        return ( <ThemeProvider theme={this.state.theme == "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <StyledApp>
        <div>
        <button onClick={() => themeToggler()} style={{float:"right"}}>Change Theme</button>
            <Search/>
            {/* <div style={{display:"flex",flexDirection:"column",float:"left", margin:"auto",marginTop:"30px"}}> */}
            <MovieList />
            {/* </div> */}
            {/* <div style={{display:"flex",flexDirection:"column",float:"right", margin:"auto",marginTop:"30px"}}><Nomination /></div> */}
            
        </div> 
        </StyledApp></ThemeProvider>);
    }
}