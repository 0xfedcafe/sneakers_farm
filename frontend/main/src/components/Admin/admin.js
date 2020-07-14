import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, Switch} from 'react-router-dom';
import { Link} from 'react-router-dom';
import SneakersBlock from './model/model.js';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class All_models extends React.Component{

  state={
    json:"",
    mass1: [],
    mass2: [],
    choose_old: -1,
    choose_new: -1,
    delete: false,
    password:"FbzAjUCxCAVR3Tet"
  }
  constructor(props){
    super(props);
    if(props.match.params.password!=this.state.password){
      this.props.history.push('/');
    }
  }
  choose_new= (e)=>{
    if(this.state.choose_new>=0  && !this.state.delete)document.getElementById(this.state.choose_new).className=" ";
    console.log(e);
    this.state.choose_new=e;
    if(this.state.delete){
      this.BaseDelete(e);
    }
  }
  choose_old= (e)=>{
    if(this.state.choose_old>=0 && !this.state.delete)document.getElementById(this.state.choose_old).className=" ";
    console.log(e);
    this.state.choose_old=e;
    if(this.state.delete){
      this.BaseDelete(e);
    }
  }
  path1 = ()=>{
    fetch('https://back-krsvk.herokuapp.com/admin_old', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text:this.textInput1.value})
    })
    .then(response => {
        return response.json();
    })
  }
  path2 = ()=>{
    fetch('https://back-krsvk.herokuapp.com/admin_new', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text:this.textInput2.value})
    })
    .then(response => {
        return response.json();
    })
  }
  add=()=>{
    console.log(9090);
    fetch('https://back-krsvk.herokuapp.com/add', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text:this.state.choose_new})
    })
  }
  remove=()=>{
    console.log(9090);
    fetch('https://back-krsvk.herokuapp.com/remove', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text:this.state.choose_old})
    })
  }
  make=()=>{
    console.log(9090);
    fetch('https://back-krsvk.herokuapp.com/add_to_old', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({admin:this.state.choose_old,new_admin:this.state.choose_new})
    })
  }
  apply=()=>{
    console.log("apply");
    fetch('https://back-krsvk.herokuapp.com/apply', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
  }

  parse = (e)=>{
    fetch('https://back-krsvk.herokuapp.com/' + e.currentTarget.id, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
  }
  delete = (e)=>{
    fetch('https://back-krsvk.herokuapp.com/delete', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
  }
  BaseDelete = (text)=>{
    fetch('https://back-krsvk.herokuapp.com/delete', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text:text})
    })
  }
  clean = ()=>{
    cookies.set('resent', [], { path: '/' });
    fetch('https://back-krsvk.herokuapp.com/clean', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
  }
  render(){
    return(
<>
              <div class="holder">
                <input class="input " onChange={this.path1} ref={e => this.textInput1 = e} type="text"/>
                <input class="input" onChange={this.path2} ref={e => this.textInput2 = e} type="text"/>
                  <div class = "Sneakers-Center-Block">
                    {this.state.mass1}
                  </div>
                  <div class = "Sneakers-Center-Block">
                    {this.state.mass2}
                  </div>
                <div class="buttons">
                  <div class="input" onClick={this.add}> Add</div>
                  <div class="input" onClick={this.make}>Reparse</div>
                  <div class="input" onClick={this.apply}> Apply</div>
                  <div class="input" onClick={this.delete}>Delete</div>
                  <div class="input" onClick={this.remove}>Remove</div>
                  <div class="input" onClick={this.clean}>Clean</div>
                  <div class="input" ></div>
                </div>


              </div>

      <div class="shops">
          <div onClick={this.parse} id="sx">StockX.com</div>
          <div onClick={this.parse} id="gt">Goat.com</div>
          <div onClick={this.parse} id="fc">Flight.club</div>
          <div onClick={this.parse} id="kl">Klekt.com</div>
          <div onClick={this.parse} id="sg">Stadiumgoods.com</div>
          <div onClick={this.parse} id="ss">Solesuprimacy.com</div>
          <div onClick={this.parse} id="sd">sneakerdon.com</div>
          <div onClick={this.parse} id="ff">farfetch.com</div>
          <div onClick={this.parse} id="st">solestage.com</div>
          <div onClick={this.parse} id="un">urbannecessities.com</div>
      </div>
</>
    );
  }
}

export default All_models;
