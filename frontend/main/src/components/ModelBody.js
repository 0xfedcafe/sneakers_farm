import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, browserHistory} from 'react-router-dom';
import { Link} from 'react-router-dom';
import SneakersBlock from './Body/Budy_Support/SneakersBlock';
import PostData from '../AppJson.json';
import {Helmet} from "react-helmet";
import * as st from "../tools/strings.js"
import SearchNoResult from "./SearchNoResult"
class ModelBody extends React.Component{

  state={
    mass:""
  }
  constructor(props) {
        super(props);
        var type="set";
        if(props.match.url.search('search')>=0){
          type="name";
          console.log("ytpe");
        }
        fetch('https://back-krsvk.herokuapp.com/list_result', {
          method: 'post',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: st.toLine(st.toArr(props.match.params.id))+" ",
            type: type
          })
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({mass: data.map((el) =>{return <SneakersBlock post = {el}/> })});
        })
  }
  componentWillReceiveProps=(nextProps)=>{
    var type="set";
    if(nextProps.match.url.search('search')>=0){
      type="name";
      console.log("ytpe");
    }
    fetch('https://back-krsvk.herokuapp.com/list_result', {
      method: 'post',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: st.toLine(st.toArr(nextProps.match.params.id)),
            type:type
          })
      })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      this.setState({mass: data.map((el) =>{return <SneakersBlock post = {el}/> })});
    })
  }
  render(){

    return(
      <>
              {this.props.match.params.type==="set"  ?
                <Helmet>
                  <title>Yeezy {this.props.match.params.id}</title>
                  <meta name="description" content="Best prices for your size of Yeezy sneakers across all major resell platforms.We make finding and shopping of Yeezy sneakers much easier by taking care of shop selection. No more need manualy switching between shops and finding cheapest price for your size, it’s all in 1 place." />
                  <meta name="theme-color" content="#4DCC34" />
                  <meta name="keywords" content={this.props.match.params.id+",sneakers.farm,sneakers,sneaker,compare,comparison,price,Goat,Stockx,Solesupremacy,Flightclub,Solestage,Stadiumgoods,Yeezymadia,Klekt,Stadiumgoods,Farfetch,Urbannecessities,yeezy,shose,350,380,500,700,750,900"} />
                </Helmet>:<></>

              }


<div className = "sneakers-big-title"><h1>YEEZY {this.props.info.data.name.set} {this.props.info.data.name.color} PRICES</h1></div>
                  <div className = "search-body">
                    {this.state.mass}
                  </div>



      </>
    );
  }
}

export default ModelBody;
