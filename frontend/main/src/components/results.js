import React from 'react';

class Results extends React.Component{
  state={
    mass:""
  }
  render(){
    return(

      <div className="results">
                {this.state.mass}
      </div>
    );
  }
}

export default Results;
