import React from 'react';
import PostData from '../../../AppJson.json';
import { Router, Route, IndexRoute, BrowserRouter, browserHistory} from 'react-router-dom';
import { Link} from 'react-router-dom';
import Img from "../../../images/Logos/Placeholder image.png";
import * as st from "../../../tools/strings.js"

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

class SneakersBlock extends React.Component{
  render () {

    const {post} = this.props;
    let name = "Farfetch.com"
    var price="";
    if(post.min!=undefined){
      name = post.min.shop;
      price = post.min.price;
    }
    let icon = ""

      return(

        <>
        {
        (() =>{
        switch(name) {
        case "Goat.com":
        icon = IconGoat;
        break;

        case "Stockx.com":
        icon = IconStockx;
        break;

        case "Flightclub.com":
        icon = IconFlightclub ;
        break;

        case "Yeezymafia.com":
        icon = IconYeezymafia ;
        break;

        case "Klekt.com":
        icon = IconKlekt ;
        break;

        case "Solesupremacy.com":
        icon = IconSolesupremacy ;
        break;

        case "Stadiumgoods.com":
        icon = IconStadiumgoods ;
        break;

        case "Farfetch.com":
        icon = IconFarfetch ;
        break;

        case "UrbanNecessities.com":
        icon = IconUrbannecessities ;
        break;

        case "Solestage.com":
        icon = IconSolestage;
        break;

        }
        }
        )()
        }

            <Link to = {"/Sneakers/"+st.toLink(st.toArr(post.name_for_search))}>

                  <div className = "sneakers-block"> {/*начало блока кроссовка*/}

                        <div className = "sneakers-block-content"> {/*блок содержимим блока кроссовка*/}

                            <div className = "sneakers-block-image"> {/*блок с картинкой кроссовка*/}
                              <img src={post.img} height = "120px" max-width = "100%" className = "sneakers-image search-sneaker-img-size"/> {/*картинка кроссовка*/}
                            </div>  {/*конец блок с картинкой кроссовка*/}
                            <div className = "sneakers-block-model-name">{post.name.set+post.name.color}</div> {/*название модели кроссовка*/}



                        <div className = "sneakers-block-min-price"> {/*блок с иконконкой и минимальной ценой кроссовка*/}


                          <div className = "sneakers-block-price"> {/*минимальная цена*/}
                            <div><img src = {icon} className = "sneakers-block-icon"/></div>{/*иконка*/}
                            <div>{price === 0 ?("sold out") : (price+"$")}</div>
                          </div>

                        </div> {/*конец блок с иконконкой и минимальной ценой кроссовка*/}
                      </div> {/*конец блока с содержимим блока кроссовка*/}
                  </div> {/*конец блока кроссовка*/}

            </Link>
          </>

            )
  }
}

export default SneakersBlock;
