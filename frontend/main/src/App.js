import React , {Component} from 'react'
import SearchHeader from './components/SearchHeader';
import SearchWelcomeText from './components/SearchWelcomeText';
import HeaderRegular from './components/HeaderRegular';

import MainPage from './components/MainPage/MainPage'
import Results from './components/results';
import Body from './components/Body';
import Admin from './components/Admin/admin_main';
import Model from './components/Admin/model/details';
import Sneakers from './components/Body/Sneakers';
import Price from './components/Body/Price';
import About from './components/Body/About';
import Ad from './components/Admin/admin.js';
import Details from './components/Admin/list.js';
import DiscriptionBlock from './components/Admin/discriptionBlock.js';
import LastViewBody from './components/slider/LastViewBody';
import ScrollMemory from 'react-router-scroll-memory';


import SearchBody from './components/SearchBody';

import { Router, Route, IndexRoute, BrowserRouter, Switch } from 'react-router-dom';
import { Link} from 'react-router-dom';



class App extends React.Component {
  render(){

    return(
      <div>
<BrowserRouter >
  <ScrollMemory />
        <Route path="/search" component = {SearchHeader}/>
        <Route path="/models" component = {HeaderRegular}/>
        <Route exact path="/last-view" component = {HeaderRegular}/>
        <Route path="/Sneakers/*" component = {HeaderRegular}/>

        <Route exact path="/search" component = {SearchWelcomeText}/>

        <Route path="/admin/:password" component = {Admin}/>
        <Route path="/admin/:password/parser" component = {Ad}/>
        <Route path="/admin/:password/details" component={Details}/>
        <Route path="/admin/:password/details/description" component={DiscriptionBlock}/>

        <Route path="/admin/:password/model/:name" component={Model}/>




               <Route exact path="/" component = {MainPage}/>

               <Route exact path="/last-view" component = {LastViewBody}/>

               <Route path="/Sneakers/:name" component = {Body}/>
               <Route  path="/search/:id" component={SearchBody} />
               <Route  path="/models/:id" component={SearchBody} />

</BrowserRouter>



      </div>
    );
  }
}

export default App;
