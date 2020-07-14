import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, browserHistory} from 'react-router-dom';
import { Link} from 'react-router-dom';

class Toggle extends React.Component {



  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    const {post} = this.props;

      return (
        <div onClick={this.handleClick} >
          {this.state.isToggleOn ? 'Buy' : 'Sell'}
        </div>
      );
  }
}

export default Toggle;
