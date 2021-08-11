import React, { Component } from "react";
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

class Navigation extends Component {
  
 render() { const {authedUser, usersArray} = this.props
 const userChoosed = (usersArray.filter((user) => {if ( user.id === authedUser) {return user} return null}))[0]

 return (
    <nav bg="light" expand="lg"  className=" navbar-expand-lg navbar-light bg-light container">
     <div className='float_left'><NavLink to={`/Home/:${this.props.authedUser}`}>Home</NavLink>
      <NavLink to={`/newpoll/:${this.props.authedUser}`}>new poll </NavLink>
      <NavLink to={`/leaderboard/:${this.props.authedUser}`}>leaderBoard</NavLink></div>
      <div className='float_right'> 
      <span>{this.props.authedUser} </span>
      <img src={userChoosed.avatarURL} variant='left' alt={`Avatar of ${userChoosed.name}`} className='avatar' width='30px' />
      <NavLink to='/' exact>logout</NavLink></div>
    </nav >
  );
}
}
function mapStateToProps ({...state}) {
  return {
    state,
    usersArray: Object.values(state.users),
   authedUser: state.authedUser}}


export default connect(mapStateToProps,)(Navigation);