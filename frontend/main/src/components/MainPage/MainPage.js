import React from 'react';
import Sneakers from '../Body/Sneakers';
import Price from '../Body/Price';
import About from '../Body/About';
import Size from '../Size';
import HeaderWhithSearchButton from '../HeaderWhithSearchButton';
import BrowseAll from '../BrowseAll';
import MainModelBlock from './MainModelBlock';
import Lastview from "../slider/last-view";
import {Helmet} from "react-helmet";
import amplitude from "amplitude-js";
import { Router, Route, IndexRoute, BrowserRouter, Switch} from 'react-router-dom';
import { Link} from 'react-router-dom';
import openSocket from 'socket.io-client';
import Cookies from 'universal-cookie';
import SneakersBlock_2 from '../slider/SneakersBlock_2'

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


import IconGoat from '../../images/Logos/Goat.svg';
import IconStockx from '../../images/Logos/Stockx.svg';
import IconFlightclub from '../../images/Logos/Flightclub.svg';
import IconYeezymafia from '../../images/Logos/Yeezymarfia.svg';
import IconKlekt from '../../images/Logos/Klekt.svg';
import IconStadiumgoods from '../../images/Logos/Stadiumgod.svg';
import IconSolesupremacy from '../../images/Logos/Solesupremacy.svg';
import IconFarfetch from '../../images/Logos/Farfetch.svg';
import IconUrbannecessities from '../../images/Logos/Urbannecessities.svg';
import IconSolestage from '../../images/Logos/Solestage.svg';

const cookies = new Cookies();

class MainPage extends React.Component{
  amplitudeEvent = (modelName) => {
    amplitude.getInstance().init('aab2a81025fd1de4781fa2341c6e50c7');
    amplitude.getInstance().logEvent('Home Search Click');
  }
  state={
    mass:[],
    arr:[],
    resent:[]
  }
  constructor(props){
    super(props);
    const socket = openSocket('http://localhost:8090', {transports: ['websocket']});
    var arr=cookies.get('resent');
    if(arr!=undefined && arr!='undefined'){
      if(arr.length>8)arr=arr.slice(0,8);
      fetch('http://localhost:8090/resent', {
        method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              list:arr
            })
        })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          resent: data.map((el) =>{if(el!=null)return <SneakersBlock_2 post={el}/> })
        });
      })
    }
    socket.emit('getModels',{data:this.state.arr});
    socket.on('setModels',  (data)=> {
      this.setState({
        arr:data.mass,
        mass: data.mass.map((el) =>{return <MainModelBlock post={el}/> })
      });
    })
  }
  getMoreModels=()=>{
      const socket = openSocket('http://localhost:8090', {transports: ['websocket']});
      socket.emit('getModels',{data:this.state.arr});
      socket.on('setModels',  (data)=> {
        this.setState({
          arr:data.mass,
          mass: data.mass.map((el) =>{return <MainModelBlock post={el}/> })
        });
      })
  }
  render(){

    return(


<>
<Helmet>
    <title>Sneakers farm - Compare Prices on Yeezy Sneakers</title>
    <meta name="description" content="Compare prices on Yeezy sneakers across major resell sites and apps. Pick the best deal for your size. No bullshit and overpaying to resellers." />
    <meta name="theme-color" content="#4DCC34" />
    <meta charset="utf-8" />
    <meta name="keywords" content="sneakers farm,sneakers.farm,sneakers,sneaker,compare,comparison,price,Goat,Stockx,Solesupremacy,Flightclub,Solestage,Stadiumgoods,Yeezymadia,Klekt,Stadiumgoods,Farfetch,Urbannecessities,yeezy,shose,350,380,500,700,750,900" />
</Helmet>


{/*start main page header*/}
<div className = "Main-head"> {/*блок обвертка хедэра*/}

  <div className = "main-page-content"> {/*блок обвертка содержимого хэдэра*/}

    <div className = "logo"></div> {/*логотип хэдэра*/}

    <div className = "main-heder-search-block" onClick = {this.amplitudeEvent}> {/*клопка для перехода на поиск кросовка*/}
      <Link to = {"/search"}><div className = "main-header-search-text">Search Yeezy model, color, etc.</div></Link>
      <div className = "main-header-search-image"></div>
    </div>

    <div className = "main-header-info"><h4>Compare yeezy prices from all verified resell platforms and shops</h4></div> {/*глобальная инфа*/}

  </div>{/*конец обвертки содержимого хедэра*/}

</div>
{/*end main page header*/}

<div className = "MainBody">


        {this.state.resent.length >0  ? (<Lastview mass={this.state.resent}/>) : <></>}




<div className = "model-body-and-title">
<div><h2>Yeezy prices</h2></div>

<div className = "model-body">
  {this.state.mass.length > 0  ? (this.state.mass) : (
    <>
      <SkeletonTheme>
        <div className = "skeleton-block">
          <Skeleton height = "100%" width = "100%"></Skeleton>
          <Skeleton height = "100%" width = "70%" align-self = "center"></Skeleton>
          <Skeleton height = "100%" width = "50%"></Skeleton>
        </div>
      </SkeletonTheme>

      <SkeletonTheme>
        <div className = "skeleton-block">
          <Skeleton height = "100%" width = "100%"></Skeleton>
          <Skeleton height = "100%" width = "70%" align-self = "center"></Skeleton>
          <Skeleton height = "100%" width = "50%"></Skeleton>
        </div>
      </SkeletonTheme>

      <SkeletonTheme>
        <div className = "skeleton-block">
          <Skeleton height = "100%" width = "100%"></Skeleton>
          <Skeleton height = "100%" width = "70%" align-self = "center"></Skeleton>
          <Skeleton height = "100%" width = "50%"></Skeleton>
        </div>
      </SkeletonTheme>

      <SkeletonTheme>
        <div className = "skeleton-block">
          <Skeleton height = "100%" width = "100%"></Skeleton>
          <Skeleton height = "100%" width = "70%" align-self = "center"></Skeleton>
          <Skeleton height = "100%" width = "50%"></Skeleton>
        </div>
      </SkeletonTheme>

      <SkeletonTheme>
        <div className = "skeleton-block">
          <Skeleton height = "100%" width = "100%"></Skeleton>
          <Skeleton height = "100%" width = "70%" align-self = "center"></Skeleton>
          <Skeleton height = "100%" width = "50%"></Skeleton>
        </div>
      </SkeletonTheme>

      <SkeletonTheme>
        <div className = "skeleton-block">
          <Skeleton height = "100%" width = "100%"></Skeleton>
          <Skeleton height = "100%" width = "70%" align-self = "center"></Skeleton>
          <Skeleton height = "100%" width = "50%"></Skeleton>
        </div>
      </SkeletonTheme>
    </>
        )
          }
</div>
<<<<<<< HEAD
<div onClick={this.getMoreModels} className = "main-all-model">Show more models</div>
=======
{/*<div className = "main-all-model">Show more models</div>*/}
>>>>>>> bb1ea63ee0fb20607507d62adcf991b89df5d8f2
</div>

</div>

<div className = "how-it-work">
  <div className = "about-us-wrapper">
    <div className = "about-us">
      <div className = "how-it-work-title"><h2>How Sneakers.farm works</h2></div>
      <div>We simplify your experience of searching and buying Yeezy sneakers by gather prices from more than 10 sites, all in one place.</div>
      <div className = "site-pars">
        <div className = "site-pars-block">
          <div className = "market-icon"><img src = {IconStockx} className = "sneakers-block-icon"/></div>
          <div>Stockx</div>
        </div>

        <div className = "site-pars-block">
          <div className = "market-icon"><img src = {IconGoat} className = "sneakers-block-icon"/></div>
          <div>Goat</div>
        </div>

        <div className = "site-pars-block">
          <div className = "market-icon"><img src = {IconKlekt} className = "sneakers-block-icon"/></div>
          <div>Klekt</div>
        </div>

        <div className = "site-pars-block">
          <div className = "market-icon"><img src = {IconFlightclub} className = "sneakers-block-icon"/></div>
          <div>Flight Club</div>
        </div>

        <div className = "site-pars-block">
          <div className = "market-icon"><img src = {IconStadiumgoods} className = "sneakers-block-icon"/></div>
          <div>Stadium Goods</div>
        </div>

        <div className = "site-pars-block">
          <div className = "market-icon"><img src = {IconSolesupremacy} className = "sneakers-block-icon"/></div>
          <div>Sole Supremacy</div>
        </div>

        <div className = "site-pars-block">
          <div className = "market-icon"><img src = {IconFarfetch} className = "sneakers-block-icon"/></div>
          <div>Farfetch</div>
        </div>
        <div className = "site-pars-block">
          <div className = "market-icon"><img src = {IconUrbannecessities} className = "sneakers-block-icon"/></div>
          <div>Urban Necessities</div>
        </div>

        <div className = "site-pars-block">
          <div className = "market-icon"><img src = {IconSolestage} className = "sneakers-block-icon"/></div>
          <div>Solestage</div>
        </div>

      </div>
      <div>Save your wallet, phycological health, and time so you can spend it on watching some edgy memes.</div>
      <div>Give it a try and select something above, or search for a specific model or colorway through the search. Yeezy 350 v1, 350 v2, 500, 700 v1, 700 v2, 700 v3, and all other models collected and sorted just for you.</div>
    </div>
    </div>

    <div className = "social-networks-wrapper">
        <div className = "social-networks">
            <div className = "logo-bottom"></div>
            <div>We have fresh sneakers memes and regular posts with price updates. Don't say that that doesn't sound compeling to you.</div>
            <a href = "https://www.instagram.com/snkrs.farm/"><div className = "instagram-button">Follow us on Instagram</div></a>
            {/*<div className = "social-networks-button">

                <div className = "instagram">Instagram</div>
                <div className = "twitter">Twitter</div>
            </div>*/}
        </div>
    </div>

  </div>



</>
    );
  }
}

export default MainPage;
