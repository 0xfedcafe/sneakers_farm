import React from 'react';
import {Helmet} from "react-helmet";
import { Router, Route, IndexRoute, BrowserRouter, Switch} from 'react-router-dom';
import { Link} from 'react-router-dom';
import SneakersBlock_2 from './SneakersBlock_2';
class Lastview extends React.Component{


  render(){



return(
      <div className = "wrapper-slider">
        <div className = "slider-text">

            <h2>Recently Viewed</h2>

                  <Link to = {"/last-view"}><div className = "slider-arrow"></div></Link>



                  </div>
          <div className = "slider-body">

            {this.props.mass}

          </div>

      </div>
    );
  }
}

export default Lastview;
