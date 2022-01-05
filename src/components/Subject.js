import React, {Component} from 'react';

 class Subject extends Component{
    render(){
      return(
  
        <header>
          <h1  onClick={
            function(e) {
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)
          }> <a href='/'> {this.props.title}</a></h1>
          {this.props.sub}
        </header>
      )
    }
  
  }

  export default Subject