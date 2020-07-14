import React from 'react';
import PostData from '../../../AppJson.json';
import Size from '../../Size';

import ImgGoat from '../../../images/Goat icon@2x.png';
import ImgStockx from '../../../images/Stockx icon@2x.png';
import ImgFlightclub from '../../../images/Fightclub icon@2x.png';
import ImgAdidas from '../../../images/Adidas icon.png';
import ImgYeezymafia from '../../../images/Yeezymarfia icon@2x.png';
import ImgKlekt from '../../../images/Klekt icon@2x.png';
import ImgStadiumgoods from '../../../images/StadiumGods icon@2x.png';
import ImgSolesupremacy from '../../../images/Solesupremacy icon@2x.png';

class PostDetail extends React.Component{
  render () {

    const {post} = this.props;

    return(
                            <div className = "WebSiteButton" >

                            <div className = "WebSiteIcon">
                                {(() =>{switch(post.shop) {
                                case "Goat.com":

                                return (<img src= {ImgGoat} alt="" width= "32px" height="32px" />);
                                break;
                                case "Stockx.com":
                                return (<img src= {ImgStockx} alt="" width= "32px" height="32px" />);
                                break;
                                case "Flightclub.com":
                                return (<img src= {ImgFlightclub} alt="" width= "32px" height="32px" />);
                                break;
                                case "Adidas.com":
                                return (<img src= {ImgAdidas} alt="" width= "32px" height="32px" />);
                                break;
                                case "Yeezymafia.com":
                                return (<img src= {ImgYeezymafia} alt="" width= "32px" height="32px" />);
                                break;
                                case "Klekt.com":
                                return (<img src= {ImgKlekt} alt="" width= "32px" height="32px" />);
                                break;
                                case "Solesuprimacy.com":
                                return (<img src= {ImgSolesupremacy} alt="" width= "32px" height="32px" />);
                                break;
                                case "Stadiumgoods.com":
                                return (<img src= {ImgStadiumgoods} alt="" width= "32px" height="32px" />);
                                break;

                                }
                              }
                            )()}
                            </div>

                                  <div>
                                        <div className = "TwoName">
                                            <div className = "BattonName">{post.shop}</div>
                                            <div className = "BestPriceText">Best price</div>
                                        </div>
                                      <div className = "AllPrice BestPrice">{0}$</div>

                                  </div>

                            </div>
                  )
              }
          }

export default PostDetail;
