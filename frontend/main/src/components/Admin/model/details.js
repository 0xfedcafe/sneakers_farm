import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, Switch} from 'react-router-dom';
import { Link} from 'react-router-dom';
import Shop from './shop.js';
import Cookies from 'universal-cookie';
import openSocket from 'socket.io-client';
const cookies = new Cookies();


class Details extends React.Component{
  state={
    data:{
      img:{href:["asdfdasf"],shop:"sdkaflnsajdf"}
    },
    mass: "",
    ind: "",
    hrefs: []
  }
  constructor(props){
    super(props);
    this.parse();
  }

  size = () =>{
    const socket = openSocket('https://back-krsvk.herokuapp.com');
    socket.emit('parse',{text:this.props.match.params.name});
    socket.on('new', function (data) {
      console.log(data);
    });
  }
  parse = ()=>{
    fetch('https://back-krsvk.herokuapp.com/get_admin', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text:this.props.match.params.name})
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          data:{
            img:data.img
          }
        })
        this.state.ind =data.ind;
        this.color.value = data.name.color;
        this.model.value = data.name.set;
        this.brand.value = data.name.brand;
        this.update.value = "";
        this.release.value = data.release;
        this.description.value = data.description;
        this.setState({
          mass:data.hrefs.map((item , index)=>{
            return <div class="link_admin"  onClick={()=>{this.img(item)}} id={item.shop}>
              <Shop post={item}/>
            </div>;
          }),
          hrefs: data.hrefs
        });
      })
  }
  img=(item)=>{
    fetch('https://back-krsvk.herokuapp.com/img', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ind: this.state.ind,
          shop:item.shop,
          href:item.href
        })
    })
    .then(response => {
      return response.json();
    })
    .then(data=>{
      console.log(data);
      this.setState({
        data:{
          img:data
        }
      })
    })
  }
  save =()=>{
    console.log(this.state.ind);
    fetch('https://back-krsvk.herokuapp.com/change', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ind:this.state.ind,
          color:this.color.value,
          set : this.model.value,
          release: this.release.value,
          description:this.description.value,
          img: this.state.data.img
        })
    })
  }
  des =()=>{
    for(var el of this.state.hrefs){
      if(el.shop=="Stockx.com"){
        fetch('https://back-krsvk.herokuapp.com/des', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              shop:el.shop,
              href:el.href
            })
        })
        .then(response => {
          return response.json();
        })
        .then(data=>{
          this.description.value = data.description;
          this.release.value = data.release;
        })
      }
    }
    console.log("ok");
  }
  render(){
    return(
      <section class="page">
        <div class="header">
          <div class="back">Back</div>
          <div class="back" onClick={this.des}>Description</div>
          <div class="back" onClick={this.size}>Size</div>
          <div class="save" onClick={this.save}>Save</div>
        </div>
        <div class="info">
          <div>Colorway/Name</div>
          <div>Model</div>
          <div>Brand</div>
          <div>Update time</div>
          <div>Release date</div>

          <input  type="text" ref={e => this.color = e}/>
          <input type="text" ref={e => this.model = e}></input>
          <input type="text" ref={e => this.brand = e}></input>
          <input type="text" ref={e => this.update = e}></input>
          <input type="text" ref={e => this.release = e}></input>
        </div>
        <div class="image">
          <div><b>image</b><p>{this.state.data.img.href[0]}</p></div>
          <img src={this.state.data.img.href[0]}></img>
        </div>
        <div class="desk">
          <b>description</b>
          <p><textarea class="description" name="text"  ref={e => this.description = e}></textarea></p>
        </div>
        <div class="links"><b>Parser links</b>{this.state.mass}</div>
      </section>
    );
  }
}

export default Details;
