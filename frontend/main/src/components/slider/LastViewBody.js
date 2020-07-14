import React from 'react';
import PostData from '../../AppJson.json';
import SneakersBlock_2 from './SneakersBlock_2';
import {Helmet} from "react-helmet";
import openSocket from 'socket.io-client';
import { Router, Route, IndexRoute, BrowserRouter, Switch} from 'react-router-dom';
import { Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class SearchBody extends React.Component{
  state={
    mass:[]
  }
  constructor(props){
    super(props);
    const socket = openSocket('https://back-krsvk.herokuapp.com');
    socket.emit('resent',{data:cookies.get('resent')});
    socket.on('resent',  (data)=> {
      this.setState({
        mass: data.data.map((el) =>{if(el!=null)return <SneakersBlock_2 post={el} className = "slider-max"/> })
      });
    })
  }
  render(){
    return(
    <>
              <div className = "search-body">
                {this.state.mass}
              </div>
    </>
    );
  }
}

export default SearchBody;
