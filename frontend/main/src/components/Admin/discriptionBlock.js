import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, Switch} from 'react-router-dom';
import { Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Model from './model/details.js'
import openSocket from 'socket.io-client';
import SneakersBlock from './model/list_model.js';
const cookies = new Cookies();


class DiscriptionBlock extends React.Component{
  set_des=()=>{
      var brr=[];
      var arr = document.querySelectorAll('input');
      for(var el of arr){
        if(el.checked){
          brr.push(el.value);
        }
      }
      console.log(brr);
      const socket = openSocket('https://back-krsvk.herokuapp.com', {transports: ['websocket']});
      socket.emit('set_des',{arr:brr,des:this.description.value});
  }
  render(){

    return(
      <>
        <div className = "discription-block">
          <div className = "discription-block-head">
            <Link to={'/admin/'+this.props.match.params.password + "/details"}><div className = "discription-block-head-no"></div></Link>
            <div className = "discription-block-head-text">Editing description</div>
            <Link to={'/admin/'+this.props.match.params.password + "/details"}><div onClick={this.set_des} className = "discription-block-head-save" >Save</div></Link>
          </div>
          <div className = "">
              <textarea className = "discription-block-text" id = "textarea" ref={e => this.description = e}></textarea>
          </div>
        </div>
        <div className = "discription-block-body"></div>
      </>
    );
  }
}

export default DiscriptionBlock;
