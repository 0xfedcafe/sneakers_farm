import React from 'react';
import PostDetail from './Budy_Support/PostDetail';



class About extends React.Component{


  render(){
        console.log(this.props.info.About.text);
    return(
<div className = "about-body">
        <div className = "about-sneakers-wrapper">
              <div className = "about-sneakers-block">
                <div><h2>About sneaker</h2></div>
                <div className = "about-sneakers-text"><pre>{this.props.info.About.text}</pre></div>
              </div>
        </div>
              <div className = "social-networks-wrapper">
                  <div className = "social-networks">
                      <div className = "logo-bottom"></div>

                      <div className = "social-networks-button">
                          <div className = "instagram">Instagram</div>
                          <div className = "twitter">Twitter</div>
                      </div>
                  </div>
              </div>


                  {/*  <div className = "Description">
                      <div className = "TitleAndButton">
                            <span className = "FloatL"><div className = "Title1">Hype index </div></span>
                                <div className = "HypeIndex" onClick={this.titleWasClicked}>{this.props.info.About.HypeIndex}<div className = "ArrowUpImg"></div></div>
                      </div>


                                <div className = "TextDescription">
                                    <div>
                                        <div> Dropped on {this.props.info.About.DroppedDate}</div>
                                        <div>{this.props.info.About.DroppedQuantity} units droped</div>
                                        <div>{this.props.info.About.SellQuantity} total selling at this moment</div>
                                    </div>
                                </div>

                              </div>
*/}

</div>
    );
  }
}

export default About;
