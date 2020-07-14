import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, Switch} from 'react-router-dom';
import { Link} from 'react-router-dom';
import Ad from './admin.js';
import Details from './list.js';
import Cookies from 'universal-cookie';
import Model from './model/details.js'
const cookies = new Cookies();


class Admin_main extends React.Component{
  state={
    password:"FbzAjUCxCAVR3Tet"
  }
  push=()=>{this.props.history.push('/admin/details')};
  constructor(props){
    super(props);
    if(props.match.params.password!=this.state.password){
      this.props.history.push('/');
    }
  }
  render(){
    return(
          <div class="header_admin">
            <Link class="div" to={'/admin/'+this.props.match.params.password+'/details'} >Sneakers</Link>
            <Link class="div" to={'/admin/'+this.props.match.params.password+'/parser'} >Parser settings</Link>
          </div>
    );
  }
}

export default Admin_main;
