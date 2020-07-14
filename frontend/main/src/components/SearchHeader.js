import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, browserHistory} from 'react-router-dom';
import { Link} from 'react-router-dom';
import BrowseAll from './BrowseAll.js';

class Header extends React.Component{
  componentDidMount(){
        console.log(1);
        document.getElementById("input").focus();
  }
  path = () =>
  {
    if(this.textInput.value!="")
    {
      this.props.history.push('/search/'+this.textInput.value);
    }
    else {
      this.props.history.push('/search');
    }
  }
  render(){

    return(

    <div className="search-header">
      <div className="search-header-content">
        <Link to = "/"><div className = "back-button"></div></Link>

        <form className="header-search-block">
          <input className="search-input" type = "text"  placeholder="Yeezy model, color, etc." onChange={this.path} ref={e => this.textInput = e} id="input"></input>
          <div className="search-icon"></div>
        </form>
      </div>
    </div>
    );
  }
}

export default Header;
