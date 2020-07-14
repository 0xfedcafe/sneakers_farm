import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, Switch} from 'react-router-dom';
import { Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Slider extends React.Component{


  render(){
    return(
      <div class="slider">
         How it works?
        <div>
          <div>We scan all resell platforms for best prices</div>
          <div></div>
          <div></div>
        </div>
      </div>

    );
  }
}

export default Slider;
