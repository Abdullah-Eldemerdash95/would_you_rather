import Navigation from './Nav'
import React, { Component } from "react";
import { connect } from 'react-redux'
import {Card} from 'react-bootstrap'

class LeaderBoard extends Component {
  
  
 render() {
     const {polls, usersArray ,authedUser} = this.props
     console.log(polls, authedUser, usersArray)

  return (
     <div>
 <Navigation/>
 <div className='Leaderboard'>
       {usersArray.map((user)=> <Card  key={user.id} > 
            <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Img src={user.avatarURL} variant='left' alt={`Avatar of ${user.name}`} className='avatar' width='50px'/>
            </Card.Body>
            
            <Card.Text >
            <span> Number of Answers is equal {Object.keys(user.answers).length}</span><br/>
            <span> Number of Questions made is equal {(user.questions).length}</span><br/>
            <span> Number of Un Answered Questions is equal {(polls.length)-(Object.keys(user.answers).length)}</span><br/>
            <span> Total Number of interaction is equal {((user.questions).length) + (Object.keys(user.answers).length)}</span>
            </Card.Text> 
            </Card>)}
       </div>      
   </div>
  );}}

function mapStateToProps ({...state}) {
  return {
    polls: Object.values(state.polls),
    usersArray: Object.values(state.users),
   authedUser: state.authedUser}}

export default connect(mapStateToProps,)(LeaderBoard);