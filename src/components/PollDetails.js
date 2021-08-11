import React, { Component } from "react";
import { connect } from 'react-redux'
import {Card} from 'react-bootstrap'
import { handleAddAnswer } from '../actions/polls';
import Navigation from './Nav'
import { NavLink } from 'react-router-dom'


class PollDetails extends Component {
  state = {
    radioVal: '',
    done: false,
    id: '',
    count1: 0,
    count2: 0,
    userAnswered1: '',
    userAnswered2: '',
    displayStatus: ''
  } 
  
 setQuesValue = (e) => {
 
  this.setState({
    radioVal: e.target.value,
    id: e.target.name
  })
    }

    handleSubmit = (e) => {
      if(this.state.radioVal === '') {(e.preventDefault())}
      else { 
      e.preventDefault();
     this.setState({
       done: true
     })
this.props.handleAddAnswer(this.state.id, this.state.radioVal) 
if (this.state.radioVal === 'optionOne')  {
  this.setState({ count1: this.state.count1 +1,
    userAnswered1: this.props.authedUser})
  } else if (this.state.radioVal === 'optionTwo') {
    this.setState({ count2: this.state.count1 +1,
      userAnswered2: this.props.authedUser})
  } 
this.setState({
  displayStatus: 'none'
})
  }}



 render() { 
   // we got last poll added in series in data cause we are answering or showing the added now question
  const {usersArray ,authedUser, polls, location} = this.props
   const userChoosed = usersArray.filter((user) => {if ( user.id === location.state.username) {return user} return null})
   const newQues = userChoosed[0];
   const key = location.state.key;
   const optionOne = location.state.optionOne.text;
   const optionTwo = location.state.optionTwo.text;
   const usersAnsweredOne = location.state.optionOne.votes;
   const usersAnsweredTwo = location.state.optionTwo.votes;
   const passedAnswer = location.state.chosenVal;
console.log(typeof(this.state.count1), typeof(usersAnsweredOne.length))
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
            <input type='radio'  value='optionOne'  name={key} onChange={this.setQuesValue}
            checked={(usersAnsweredOne.includes(authedUser)) ? (usersAnsweredOne.includes(authedUser)) : ((this.state.radioVal === '') ? (false) : (this.state.radioVal === 'optionOne' )) }
            disabled={((usersAnsweredOne.includes(authedUser)) || (usersAnsweredTwo.includes(authedUser))) ? (true) : (this.state.done)}/>
            <label> 
              {optionOne} Answered by {parseInt(usersAnsweredOne.length) + (this.state.count1)}  {usersAnsweredOne.join(' ') + " " + (this.state.userAnswered1)} 
            </label>
            </span>
            <span>
            <input type='radio' value='optionTwo'  name={key} onChange={this.setQuesValue}
            checked={ (usersAnsweredTwo.includes(authedUser)) ? (usersAnsweredTwo.includes(authedUser)) : ((this.state.radioVal === '') ? (false) : (this.state.radioVal === 'optionTwo')) } 
            disabled={((usersAnsweredOne.includes(authedUser)) || (usersAnsweredTwo.includes(authedUser))) ? (true) : (this.state.done)}/>
            <label> 
              {optionTwo} Answered by {parseInt(usersAnsweredTwo.length) + (this.state.count2)} {(usersAnsweredTwo.join(' ')) + " " + (this.state.userAnswered2)} 
              </label>
            </span>{((usersAnsweredOne.includes(authedUser)) || (usersAnsweredTwo.includes(authedUser))) ? ('')
            : (<button type='submit' onClick={this.handleSubmit} style={{display: this.state.displayStatus}} >
            {/*this to send us to Home page */}
            confirm answer
            </button>)}
            
            </Card.Text>
            </Card>
       </div>
  
   </div>
  );
}
}
function mapStateToProps ({...state}, ) {
  return {
  usersArray: Object.values(state.users),
   authedUser: state.authedUser,
   polls: Object.values(state.polls),
  }
}


export default connect(mapStateToProps,{handleAddAnswer})(PollDetails);