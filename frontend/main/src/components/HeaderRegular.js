import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, browserHistory} from 'react-router-dom';
import { Link} from 'react-router-dom';

class HeaderRegular extends React.Component{


  render(){
    return(

      <div className="regular-header">
        <div className="regular-header-content">
          <Link to = "/"><div className = "logo-white"></div></Link>

          <Link to = "/search"><div className = "search-icon-black"></div></Link>

        </div>
      </div>
    );
  }
}

export default HeaderRegular;
