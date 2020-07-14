import React from 'react';

import { Router, Route, IndexRoute, BrowserRouter, browserHistory} from 'react-router-dom';
import { Link} from 'react-router-dom';
import * as st from "../tools/strings.js"
import amplitude from "amplitude-js";
import {
  AmplitudeProvider,
  Amplitude,
  LogOnMount
} from "@amplitude/react-amplitude";


class Size extends React.Component{


  state = {
      name: ''
    }

  handleClick = (e) => {
    this.props.updateData(e.currentTarget.id);
    amplitude.getInstance().init('aab2a81025fd1de4781fa2341c6e50c7');
    amplitude.getInstance().logEvent('Size Click',{ 'Size': this.props.size.size});
  }


  render(){

    return(
      <div className = "your-size-block">
          <div className = "size-header">

            <div className = "size-titles">
              <div><h2>Select size</h2></div>
              <div><h3>US mens sizes</h3></div>
            </div>

            <Link to = {"/Sneakers/"+st.toLink(st.toArr(this.props.info.data.name_for_search))}>
              <div className = "size-back-button">
                <div class="back-button"></div>
              </div>
            </Link>

          </div>
            <div className="sneaker-size">

              {this.props.info.AllSize.map((post , index )=>{


                if (this.props.size.size === post.size) {

                          return(
                    <div post = {post} key = {`post-list-key ${index}`}>
                          <Link to = {"/Sneakers/"+st.toLink(st.toArr(this.props.info.data.name_for_search))}>
                            <div className = "size-button SizeButtonChoose" id = {post.size} onClick = {this.handleClick}>{post.size}</div>
                          </Link>
                    </div>

                             )

                }else{
                    return(
                        <div post = {post} key = {`post-list-key ${index}`}>
                              <Link to = {"/Sneakers/"+st.toLink(st.toArr(this.props.info.data.name_for_search))}>
                                <div className = "size-button" id = {post.size} onClick = {this.handleClick}>{post.size}</div>
                              </Link>
                        </div>
                       )
                     }
              })}

            </div>
      </div>
    );
  }
}

export default Size;
