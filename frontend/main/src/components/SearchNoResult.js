import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, browserHistory} from 'react-router-dom';
import { Link} from 'react-router-dom';

class SearchNoResult extends React.Component{
  render(){

    return(
      <div className = "search-welcome-text-body">
        <div className = "search-welcome-text-body-content">
          <div><h2>No search results…</h2></div>
        </div>
      </div>
    );
  }
}

export default SearchNoResult;
