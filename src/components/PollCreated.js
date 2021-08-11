import React, { Component } from "react";
import { connect } from 'react-redux'
import {Card} from 'react-bootstrap'
import { handleAddAnswer } from '../actions/polls';
import Navigation from './Nav'
import { NavLink } from 'react-router-dom'

class PollCreated extends Component {
  state = {
    radioVal: '',
    done: false,
    id: ''
  } 
  
 setQuesValue = (e) => {
 
  this.setState({
    radioVal: e.target.value,
    id: e.target.name
  })
    }
    handleSubmit = (e) => {
      e.preventDefault();
     this.setState({
       done: true
     })
this.props.handleAddAnswer(this.state.id, this.state.radioVal)
     
  }
  

 render() { 
   // we got last poll added in series in data cause we are answering or showing the added now question
  const {usersArray ,authedUser, polls, location} = this.props
   const userChoosed = usersArray.filter((user) => {if ( user.id === authedUser) {return user} return null})

   const newQues = userChoosed[0];
const keyCreated = polls[polls.length-1].id;
const optionOne = location.state.optionOne;
const optionTwo = location.state.optionTwo;

  return (
   <div>
     <Navigation/>
      <div className='poll-created'>
      <Card  > 
            <Card.Body>
            <Card.Title>{newQues.name}</Card.Title>
            <Card.Img src={newQues.avatarURL} variant='left' alt={`Avatar of ${newQues.name}`} className='avatar' width='50px'/>
           </Card.Body>
            
            <Card.Text >
            <span> Would You Rather</span>
            <span>
            <input type='radio'  value='optionOne'  name={keyCreated} onChange={this.setQuesValue}
            checked={(this.state.radioVal === '') ? (false) : (this.state.radioVal === 'optionOne' ) } disabled={this.state.done}/>
            <label> {optionOne}</label>
            </span>
            <span>
            <input type='radio' value='optionTwo'  name={keyCreated} onChange={this.setQuesValue}
            checked={(this.state.radioVal === '') ? (false) : (this.state.radioVal === 'optionTwo') } disabled={this.state.done}/>
            <label> {optionTwo}</label></span>
            <button type='submit' onClick={this.handleSubmit} >
              {/*this to send us to Home page */}
              <NavLink to={`/Home/:${this.props.authedUser}`}>confirm answer</NavLink>
              </button>
            </Card.Text>
            </Card>
       </div>
  
   </div>
  );
}
}
function mapStateToProps ({...state},) {
  return {
  usersArray: Object.values(state.users),
   authedUser: state.authedUser,
   polls: Object.values(state.polls),
  }
}


export default connect(mapStateToProps,{handleAddAnswer})(PollCreated);