import React from 'react';
import PostData from '../../../AppJson.json';
import Size from '../../Size';

import IconGoat from '../../../images/Logos/Goat.svg';
import IconStockx from '../../../images/Logos/Stockx.svg';
import IconFlightclub from '../../../images/Logos/Flightclub.svg';
import IconYeezymafia from '../../../images/Logos/Yeezymarfia.svg';
import IconKlekt from '../../../images/Logos/Klekt.svg';
import IconStadiumgoods from '../../../images/Logos/Stadiumgod.svg';
import IconSolesupremacy from '../../../images/Logos/Solesupremacy.svg';
import IconFarfetch from '../../../images/Logos/Farfetch.svg';
import IconUrbannecessities from '../../../images/Logos/Urbannecessities.svg';
import IconSolestage from '../../../images/Logos/Solestage.svg';



class PostDetail extends React.Component{
  state={
    top: ""
  }
  render () {


    const {post} = this.props;

   //console.log(this.props.size);


//console.log(post.price.length);


if (this.props.size === post.size){
    return(
          <div>
                {post.price.map((post , index )=>{
                  if (post.best === "true"){
                    return(
                          <a href = {post.href} key = {`post-list-key1`}>
                            <div className = {"site-button " + this.state.top}>
                                  <div className = "site-icon">
                                          {(() =>{switch(post.name) {
                                          case "Goat.com":
                                          return (<img src= {IconGoat} alt="" width= "32px" height="32px" />);
                                          break;

                                          case "Stockx.com":
                                          return (<img src= {IconStockx} alt="" width= "32px" height="32px" />);
                                          break;

                                          case "Flightclub.com":
                                          return (<img src= {IconFlightclub} alt="" width= "32px" height="32px" />);
                                          break;

                                          case "Yeezymafia.com":
                                          return (<img src= {IconYeezymafia} alt="" width= "32px" height="32px" />);
                                          break;

                                          case "Klekt.com":
                                          return (<img src= {IconKlekt} alt="" width= "32px" height="32px" />);
                                          break;

                                          case "Solesupremacy.com":
                                          return (<img src= {IconSolesupremacy} alt="" width= "32px" height="32px" />);
                                          break;

                                          case "Stadiumgoods.com":
                                          return (<img src= {IconStadiumgoods} alt="" width= "32px" height="32px" />);
                                          break;

                                          case "Farfetch.com":
                                          return (<img src= {IconFarfetch} alt="" width= "32px" height="32px" />);
                                          break;

                                          case "UrbanNecessities.com":
                                          return (<img src= {IconUrbannecessities} alt="" width= "32px" height="32px" />);
                                          break;

                                          case "Solestage.com":
                                          return (<img src= {IconSolestage} alt="" width= "32px" height="32px" />);
                                          break;

                                          }})()}
                                  </div>

                                  <div className = "site-name">
                                  <div>{post.name}</div>
                                  <div className = "site-best-price">Best-price</div>
                                  </div>

                                  <div className = "site-buttons-price site-price-best">
                                  <div className = "price-number">{post.price}$</div>
                                  <div className = "site-arrow-green"></div>
                                  </div>

                            </div>
                          </a>
                            )
                                            }
                  else if (post.best === "false"){
                    return(
                        <>
                          {post.price!=1000000000 ?(
                            <a href = {post.href} key = {`post-list-key1`}>
                              <div className = {"site-button " + this.state.top}>
                                    <div className = "site-icon">
                                            {(() =>{switch(post.name) {
                                            case "Goat.com":
                                            return (<img src= {IconGoat} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Stockx.com":
                                            return (<img src= {IconStockx} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Flightclub.com":
                                            return (<img src= {IconFlightclub} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Yeezymafia.com":
                                            return (<img src= {IconYeezymafia} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Klekt.com":
                                            return (<img src= {IconKlekt} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Solesupremacy.com":
                                            return (<img src= {IconSolesupremacy} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Stadiumgoods.com":
                                            return (<img src= {IconStadiumgoods} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Farfetch.com":
                                            return (<img src= {IconFarfetch} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "UrbanNecessities.com":
                                            return (<img src= {IconUrbannecessities} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Solestage.com":
                                            return (<img src= {IconSolestage} alt="" width= "32px" height="32px" />);
                                            break;
                                            }})()}
                                    </div>

                                    <div className = "site-name">
                                    <div>{post.name}</div>
                                    </div>

                                    <div className = "site-buttons-price">
                                    <div className = "price-number">{post.price}$</div>
                                    <div className = "site-arrow-black"></div>
                                    </div>

                              </div>
                            </a>
                            ):(
                            <>
                              <div className = { "site-button-opacity" + this.state.top}>
                                    <div className = "site-icon">
                                            {(() =>{switch(post.name) {
                                            case "Goat.com":
                                            return (<img src= {IconGoat} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Stockx.com":
                                            return (<img src= {IconStockx} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Flightclub.com":
                                            return (<img src= {IconFlightclub} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Yeezymafia.com":
                                            return (<img src= {IconYeezymafia} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Klekt.com":
                                            return (<img src= {IconKlekt} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Solesupremacy.com":
                                            return (<img src= {IconSolesupremacy} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Stadiumgoods.com":
                                            return (<img src= {IconStadiumgoods} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Farfetch.com":
                                            return (<img src= {IconFarfetch} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "UrbanNecessities.com":
                                            return (<img src= {IconUrbannecessities} alt="" width= "32px" height="32px" />);
                                            break;

                                            case "Solestage.com":
                                            return (<img src= {IconSolestage} alt="" width= "32px" height="32px" />);
                                            break;
                                            }})()}
                                    </div>

                                    <div className = "site-name">
                                    <div>{post.name}</div>
                                    </div>

                                    <div className = "site-buttons-price">
                                    </div>

                              </div>
                            </>
                            )}
                          </>
                                )

                                                  }
                                                    })}
          </div>
          )}

                    else {
                      return(<></>)
                          }


                      }}

export default PostDetail;
