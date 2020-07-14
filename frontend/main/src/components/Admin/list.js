import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, Switch} from 'react-router-dom';
import { Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Model from './model/details.js'
import SneakersBlock from './model/list_model.js';
const cookies = new Cookies();


class All_models extends React.Component{

  state={
    json:"",
    mass: [],
    delete: false,
    password:"FbzAjUCxCAVR3Tet"
  }
  constructor(props){
    super(props);
    if(props.match.params.password!=this.state.password){
      this.props.history.push('/');
    }
  }
  path = ()=>{
    fetch('https://back-krsvk.herokuapp.com/admin_old', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text:this.textInput.value})
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
      this.setState({mass: data.map((el) =>{
      return(

        <div className = "name-and-checkbox" >

          <form className = "" >
            <input type="checkbox" value = {el.ind}></input>
          </form>

          <Link to={'/admin/'+this.props.match.params.password+'/model/'+el.ind} class="list_part" >
            <SneakersBlock  post = {el}/>
          </Link></div>
        )
      })});
    })
  }
  render(){
    return(
              <>
                  <div className = "search-and-description">
                    <input class="beautiful_input" placeholder="Find by atribute" onChange={this.path} ref={e => this.textInput = e} type="text"/>
                    <Link to = {'/admin/'+this.props.match.params.password + "/details" + "/description"}><div className = "edit-all-descriptions">Edit descriptions</div></Link>
                  </div>
                <div class="list_part list">
                  <div>Name</div>
                  <div>Model</div>
                  <div>Brand</div>
                  <div>Update time</div>
                  <div>Release</div>
                  <div>Image</div>
                  <div>Descriptions</div>
                  <div>Parser</div>

                </div>
                  <div class = "Admin_list">
                    {this.state.mass}
                  </div>


              </>
    );
  }
}

export default All_models;
