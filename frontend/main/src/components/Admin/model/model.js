import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, browserHistory} from 'react-router-dom';
import { Link} from 'react-router-dom';

class Model extends React.Component{
  state={
    mass: []
  }
  handleClick = (e) => {
    this.props.updateData(e.currentTarget.id);
    if(!this.props.delete)  this.but.className="ParsButton selected";
  }
  constructor(props){
    super(props);
    //console.log(props.post.hrefs);
    if(props.post.hrefs!=undefined)this.state.mass=props.post.hrefs.map((item , index)=>{
        return <div class="shop">{item.shop}</div>;
      })
    else{
      this.state.mass = <div class="shop">{this.props.post.shop}</div>;
    }
  }
  render () {
    const {post} = this.props;

      return(

<div >
    <div onClick={this.handleClick} className = "ParsButton" id = {post.ind} ref={e => this.but = e}>
          <div className = "SneakersName">{post.name_for_search}</div>
          {this.state.mass}
      </div>
</div>
         )}
                                    }

export default Model;
