import React, { Component } from "react";
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import {Link} from 'react-router-dom'
import { Fragment } from "react";


class Login extends Component {
  state= {
    selectDefault: 'noChoice',
    userID: ''
  }
     handleSubmit= (e) => {// when we select user we send value to state 
        e.preventDefault();  
        this.setState({
          userID: e.target.value
        })
        
    }

    resetThings = (e) => {
      if (this.state.userID === '') {
// this cause if he clicked on login when default no user is choosen to stop working not going to give error
        e.preventDefault()
      } else { 
// after we choosing user we send it as authedUser and then we go to it through link 
      this.props.setAuthedUser(this.state.userID)
      this.setState({
        userID: ''
      })}
    }

 render() {
     const { usersArray } = this.props;
     const usersTobeLogged = usersArray.map((user)=> {return <option key={user.id} value={user.id} >{user.name}</option>})
  return (
  <Fragment>
    <div className="Login">
      <select onChange={this.handleSubmit}  value ={
        (this.state.userID !== '') ? (this.state.userID) : (this.state.selectDefault)} >
        <option value={'noChoice'} disabled> no User </option>
        {usersTobeLogged}
      </select>
    </div>
    <Link to={`/Home/:${this.state.userID}`} className='Login_Link'>
      <button type='submit' className='Login_Button' onClick={this.resetThings}>login in </button>
    </Link>
    </Fragment>
  );
}
}

function mapStateToProps ({...state} ) {
  return {
    usersArray: Object.values(state.users) 
    // i tried keys values and entries and console log each one to know that is the best choice
}}


export default connect(mapStateToProps,{setAuthedUser})(Login);