import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, browserHistory} from 'react-router-dom';
import { Link} from 'react-router-dom';

class SearchWelcomeText extends React.Component{
  render(){

    return(
      <div className = "search-welcome-text-body">
        <div className = "search-welcome-text-body-content">
          <div><h2>Find Yeezy</h2></div>
          <div>For example, “Yeezy 500”. You can also be more specific like “Yeezy 350 True Form”, or just simply “true form”</div>
        </div>
      </div>
    );
  }
}

export default SearchWelcomeText;
