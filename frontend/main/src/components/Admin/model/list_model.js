import React from 'react';
import { Router, Route, IndexRoute, BrowserRouter, browserHistory} from 'react-router-dom';
import { Link} from 'react-router-dom';

class Model extends React.Component{
  state={
    mass: []
  }
  handleClick = (e) => {
    this.props.updateData(e.currentTarget.id);
      this.but.className="ParsButton selected";
  }
  render () {
    const {post} = this.props;
      return(
    <>
        <div>{post.name_for_search}</div>
        <div>{post.name.set}</div>
        <div>Yeezy</div>
        <div></div>
        <div>{post.release}</div>
        <div><img src={post.img !=undefined ? post.img.href[0] : ""}></img></div>
        <div></div>
        <div>{post.hrefs.length}</div>
    </>
         )}
                                    }

export default Model;
