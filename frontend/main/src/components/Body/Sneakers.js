import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, browserHistory, Link}  from 'react-router-dom';
import Img from '../../images/non_photo.svg';

class Sneakers extends React.Component{
  render(){
    const {post} = this.props;
    return(
      <div className="sneakers-top">

                <div className = "sneakers-big-title"><h1>YEEZY {this.props.info.data.name.set} {this.props.info.data.name.color} PRICES</h1></div>

                <div className = "sneakers-small-title"><h3>
                <Link to = {"/"} className ="grey-color">All</Link> / <Link to = {"/"} className ="grey-color">{this.props.info.data.name.brand}</Link> / <Link to = {"/search/"+this.props.info.data.name.set +"/set"} className ="grey-color">{this.props.info.data.name.set}</Link> / {this.props.info.data.name.color}</h3></div>

                <div>

                    {this.props.info.data.img=="../../../images/non_photo.svg"  ? <img src={Img} alt="" width = "256px" /> : <img className = "SneakersImg" src={this.props.info.data.img} alt = "" width = "256px"></img> }

                </div>



      </div>
    );
  }
}

export default Sneakers;
