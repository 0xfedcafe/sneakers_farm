import React from 'react';
import PostDetail from './Budy_Support/PostDetail';
import { Router, Route, IndexRoute, BrowserRouter, browserHistory} from 'react-router-dom';
import { Link} from 'react-router-dom';
import Toggle from './Budy_Support/Toggle';
import Size from '../Size';
import {Helmet} from "react-helmet";
import Updated from '../../images/Logos/Updated.svg';
import Updating from '../../images/Logos/Updating.svg';
import Other from '../../images/Logos/Unknown.svg';
import * as st from "../../tools/strings.js"
import { Amplitude, LogOnMount } from "@amplitude/react-amplitude";

class Price extends React.Component{
    state={
      condition:true
    }
    toggle=()=>{
      this.props.worn();
      this.forceUpdate();
      this.state.condition = !this.state.condition;
    }
    constructor(props){
      super(props);
      this.state.condition=props.info.data.condition;
    }
  render(){
    let sizeText = (this.props.info.size);
    let price = (this.props.info.min);
    let allactivesite = this.props.info.hrefs.length;
    let updatesite = this.props.info.loaded;
    let line = "";
    let blackline = allactivesite - updatesite;

    if (allactivesite == updatesite){
      line = "true";
    }else{line = "false";}
console.log(blackline);
    return(

      <div className = "prices" >
          <Helmet>
            <title>{`${this.props.info.data.name.brand} ${this.props.info.data.name.set} ${this.props.info.data.name.color}`}</title>
            <meta name="description" content={this.props.info.About.text} />
            <meta name="theme-color" content="#4DCC34" />
            <meta name="keywords" content={this.props.info.data.name.brand +","+this.props.info.data.name.set+","+ this.props.info.data.name.color+",sneakers.farm,sneakers,sneaker,compare,comparison,price,Goat,Stockx,Solesupremacy,Flightclub,Solestage,Stadiumgoods,Yeezymadia,Klekt,Stadiumgoods,Farfetch,Urbannecessities,yeezy,shose,350,380,500,700,750,900"} />
          </Helmet>

          <div className = "size">
            <Link to = {"/Sneakers/"+st.toLink(st.toArr(this.props.info.data.name_for_search))+"/size"} >
              <div className = "size-block"><div className = "size-text">Size: Us {sizeText}</div><div className = "roll-arrow"/></div>
            </Link>
         {/*
          <div className = "Used-or-new-block">
            <div className = "used-new-block"><div>New</div><div className = "confirm-true"/></div>
            <div className = "or-block"></div>
            <div className = "used-new-block used-color"><div>Used</div><div className = "confirm-fasle"/></div>
          </div>
        */}
          </div>

          <div className = "site-price">

          {allactivesite / updatesite === 1 ?(
              <div className = "Updated">
                  <div className = "site-button ">
                        <div className = "site-icon"><img src= {Updated} alt="" width= "32px" height="32px" /></div>

                        <div className = "site-name">
                        <div>From {price}$</div>
                        <div className = "site-best-price site-grey-color">Prices up to date</div>
                      </div>

                        <div className = "site-buttons-price site-price-best">
                        <div></div>
                        <div className = ""></div>
                        </div>
                    </div>
                </div>
              ) : (
                <div className = "line-button">
                    <div className = "site-button-load">
                          <div className = "site-icon"><img src= {Updating} alt="" width= "32px" height="32px" /></div>

                          <div className = "site-line-content">

                            <div>From {price}$</div>

                            <div className = "line-and-text">
                                <div className = "count-site">{updatesite} / {allactivesite} sites updated</div>

                                <div className = "line" style={{ gridTemplateColumns: updatesite + "fr" + " " + blackline + "fr" }}>
                                    <div className = "green-line"></div>
                                    <div></div>
                                </div>
                              </div>

                            </div>

                          <div className = "site-buttons-price site-price-best">
                          <div></div>
                          <div className = ""></div>
                          </div>
                      </div>
                  </div>)
              }



              {this.props.info.AllSize.map((item , index)=>{
                return <PostDetail post = {item} key = {`post-list-key ${index}`} size = {this.props.info.size}/>
              })}

              <div className = "other-site">
                  <div className = "site-button ">
                        <div className = "site-icon"><img src= {Other} alt="" width= "32px" height="32px" /></div>

                        <div className = "site-name">
                        <div>Looking for other site?</div>
                        <div className = "site-best-price site-grey-color">Tell us so we can add it!</div>
                      </div>

                        <div className = "site-buttons-price site-price-best">
                        <div></div>
                        <div className = ""></div>
                        </div>
                    </div>
                </div>



          </div>
          <Link to = "/"><div className = "all-model-button">Browse all models</div></Link>
      </div>
    );
  }
}

export default Price;
