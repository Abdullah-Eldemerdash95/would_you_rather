import React, { Component } from "react";
import { connect } from 'react-redux';
import AnsweredPolls from './AnsweredPolls'
import UnAnsweredPolls from './UnAnsweredPolls'
import Navigation from './Nav'

class Home extends Component {
  state={
    displayStatus: 'hide',
    active: 'active',
    active2: 'shendy'
  }
  handleChange=()=> {
    this.setState(prevState => ({ // this the toggle function to switch Answered and unAnswered ques 
      displayStatus: prevState.displayStatus === 'hide' ? 'show' : 'hide',
      //this the toggle function to switch background colors
      active: prevState.displayStatus === 'hide' ? 'shendy' : 'active',
      active2: prevState.displayStatus === 'hide' ? 'active' : 'shendy'
    }))
      }

 render() {
  return (
    <div className="Home">
      <Navigation/>
     { (this.state.displayStatus !== 'show') ? 
    (<div className='Un_Answered_Polls' > {/* this to show the the details of un Answered questions*/}
<span onClick={this.handleChange} className={`Polls_span ${this.state.active}`} > Un Answered Polls</span>
<span className='Polls_span' onClick={this.handleChange}> Answered Polls</span>
    <UnAnsweredPolls/></div>) :
    (<div className='Answered_Polls'>{/* this to show the the details of Answered questions*/}
  <span onClick={this.handleChange} className={`Polls_span ${this.state.active2}`}> Answered Polls</span>
  <span className='Polls_span' onClick={this.handleChange}> Un Answered Polls</span>
    <AnsweredPolls/> </div>) }
    </div>
  );
}
}
function mapStateToProps (store) {
  return {
    store
  }
}

export default connect(mapStateToProps,)(Home);