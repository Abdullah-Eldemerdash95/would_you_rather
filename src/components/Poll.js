import React, { Component } from "react";
import { connect } from 'react-redux'
import {Card} from 'react-bootstrap'
import Navigation from './Nav'
import { handleAddPoll } from '../actions/polls';
import { NavLink } from 'react-router-dom'

class PollCreation extends Component {
  state = {
    radioValue: '',
    optionOne: '',
    optionTwo: '',
  } 
  
 
 setQuesValue = (e) => {
  e.preventDefault();
  const dynamicValue = e.target.name
  this.setState({
    [dynamicValue]: e.target.value
  })
    }
  
    handleChange=(e)=> {
          const { optionOne, optionTwo } = this.state;
          e.preventDefault();
          this.props.handleAddPoll(optionOne, optionTwo, this.props.authedUser);
        };


 render() {
  const {usersArray ,authedUser} = this.props
   const userChoosed = usersArray.filter((user) => {if ( user.id === authedUser) {return user} return null})
const newQues = userChoosed[0];
  return (
   <div className='poll'>
     <Navigation/>
    
    <div className='pollInProgress'><Card> 
    <Card.Body>
    <Card.Title>{newQues.name}</Card.Title>
    <Card.Img src={newQues.avatarURL} variant='left' alt={`Avatar of ${newQues.name}`} className='avatar' width='50px'/>
   </Card.Body>
    
    <Card.Text >
    <span> Would You Rather</span>
    <input type='text'  value={this.state.optionOne} name={'optionOne'} onChange={this.setQuesValue}/>
    <input type='text'  value={this.state.optionTwo} name={'optionTwo'} onChange={this.setQuesValue}/>
    <button type='submit' onClick={this.handleChange} >
      {/*this to send us to page that contain only question */}
      <NavLink to={`/createdPoll/:${this.props.authedUser}`}>add new question </NavLink> </button>
    </Card.Text>
    
    </Card></div>
    </div>
  );
}
}
function mapStateToProps ({...state}) {
  return {
    usersArray: Object.values(state.users),
   authedUser: state.authedUser
  }
}


export default connect(mapStateToProps,{handleAddPoll})(PollCreation);