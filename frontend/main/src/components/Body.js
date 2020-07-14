import React from 'react';
import Sneakers from './Body/Sneakers';
import Price from './Body/Price';
import About from './Body/About';
import Size from './Size'
import Json from '../AppJson'
import openSocket from 'socket.io-client';
import { Router, Route, IndexRoute, BrowserRouter, Switch} from 'react-router-dom';
import { Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import * as st from "../tools/strings.js"
const cookies = new Cookies();


class Body extends React.Component{

  state={
    json:Json
  }
  check=(arr,t)=>{
    for(var i=0;i<arr.length;i++){
      if(arr[i]==t){
        arr.splice(i,i+1)
        i--;
      }
    }
    return arr;
  }
  constructor(props) {
      super(props);
      var arr=cookies.get('resent');
      var text = st.toArr(props.match.params.name);
      text = text[text.length-1].toUpperCase();
      console.log(text);
      if(arr!="undefined" && arr!=undefined){
        this.check(arr,text);
        arr.unshift(text);
        cookies.set('resent', arr, { path: '/' ,maxAge:3600000});
      }
      else{
        cookies.set('resent', [text], { path: '/',maxAge:3600000 });
      }

      const socket = openSocket('http://localhost:8090', {transports: ['websocket']});
      socket.emit('getAdminInfo',{ind:text});
      socket.on('newInfo',  (data)=> {
        var loaded = data.loaded;
        data=data.data;
        console.log(data);
        console.log(data.description);
        if(this.state.json.size==""){
          this.state.json.size = data.size[0].size;
          this.state.json.min = data.size[0].price[0].price;
          console.log(0);
        }
        this.setState({
          json:{
            data :{
                name_for_search : data.name_for_search,
                name: data.name,
                img: data.img.href[0],
                price: data.min,
                ind:data.ind,
                condition: true
              },
              About:{
                "HypeIndex":"- - -",
                "DroppedDate":data.release,
                "DroppedQuantity":"7500",
                "SellQuantity":"1394",
                "text": data.description
              },
              size:this.state.json.size,
              loaded:loaded,
              min:this.state.json.min,
              new:data.size,
              used:data.used,
              AllSize : data.size,
              hrefs: data.hrefs
            }
        });
      });
  }

  updateData =(e)=>{
    this.state.json.size=e;
    for(var i=0;i<this.state.json.AllSize.length;i++){
      if(this.state.json.AllSize[i].size==this.state.json.size){
        this.state.json.min = this.state.json.AllSize[i].price[0].price;
      }
    }
  }
  worn =(e)=>{
    this.state.json.data.condition = !this.state.json.data.condition;
    console.log(  this.state.json.data.condition);
    if(this.state.json.data.condition)this.state.json.AllSize = this.state.json.new;
    else this.state.json.AllSize = this.state.json.used;
  }
  render(){



    return(


<>
  <Route exact path="/Sneakers/:name/size">
      <div className="sneakers-body">
          <Sneakers info={this.state.json}/>
          <Size info={this.state.json} updateData={this.updateData} size = {this.state.json}/>
      </div>
  </Route>

  <Route exact path="/Sneakers/:name">
      <div className="sneakers-body">
          <Sneakers info={this.state.json}/>
          <Price worn={this.worn} info={this.state.json}/>
        </div>

        <About info={this.state.json}/>

  </Route>
</>




    );
  }
}

export default Body;
