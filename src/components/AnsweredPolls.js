import React, { Component } from "react";
import { connect } from 'react-redux'
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
class AnsweredPolls extends Component {
  state = {
    radioValue: '',
 
  } 
 /* .reduce((acc, curr)=> (acc[curr]='', acc), {})
 Each time of the loop current value inserted into accumulator acc[curr] = '' like this. ,acc is returning the accumulator once loop end. And ,{} is defined the accumulator is a object */
 

  
  setRadioValue = (event) => {
    this.setState({
      radioValue: event.target.value
    });
  }


  
  
 render() {
    const {polls, usersArray ,authedUser} = this.props;
    const userChoosed = usersArray.filter( // we filter our users to get one identical to autheduser
      (user) => {if ( user.id === authedUser) {return user} return null});
    const x = Object.keys(userChoosed[0].answers);// get his answered ques ids
    const y = polls.filter((poll) => {if (([...x]).includes(poll.id)) {return poll} return null});
      // then we get the the answered ques by matching all ids of ques and return matched
      console.log(polls)

  return (
     <div>
       <div> {/*now for each question that already answered we map over questions to show each one */}
       {y.map((q)=> <Card className='polls_Answered' key={q.id} > 
              <Card.Body className='babe1'> {usersArray.map((user)=> {if (((q.author)) === (user.id)) 
              {return <span key={user.id}>
              <div><p>{user.name}</p>
              <Card.Img src={user.avatarURL} variant='left' alt={`Avatar of ${user.name}`} className='avatar' width='50px'/></div>
              </span>} return null})}</Card.Body>
              
              <div className='babe2'>
              <span> Would You Rather</span>
              <p><input type='radio'  value={q.optionOne.text} className={`answer + ${q.id}`} onChange={this.setRadioValue}
               checked={q.optionOne.votes.includes(authedUser)} />
              <label>
                {q.optionOne.text}
                <span> {usersArray.map((user)=> 
                {if (([...(q.optionOne.votes)]).includes(user.id)) 
                {return <span className='AnsweredBY' key={user.id}>{user.name} </span>} return null})}</span>
              </label> </p>
              
              <p><input type='radio' value={q.optionTwo.text} className={`answer + ${q.id}`} onChange={this.setRadioValue}
              checked={q.optionTwo.votes.includes(authedUser)}  />
              <label>
                {q.optionTwo.text}
                <span> {usersArray.map((user)=> 
                {if (([...(q.optionTwo.votes)]).includes(user.id)) 
                {return <span className='AnsweredBY' key={user.id}>{user.name} </span>} return null})}</span>
              </label></p>
              <span className='TotalAnswers'> Total answer is equal{(q.optionOne.votes.length)+(q.optionTwo.votes.length)}</span> 
              <button type='submit' onClick={this.handleChange} >
      {/*this to send us to page that contain only question */}
      <Link to={{
        pathname: `/question/:question_${q.id}`,
        state:{
          username: q.author,
          key: q.id,
          optionOne: q.optionOne,
          optionTwo: q.optionTwo,
          chosenVal: this.state.radioValue

        }}}>View question </Link> </button>
              </div>

            </Card>)
      }
           
       </div>
   </div>
  );}}

function mapStateToProps ({...state}) {
  return {
    polls: Object.values(state.polls).sort((a,b)=> b.timestamp - a.timestamp),
    usersArray: Object.values(state.users),
   authedUser: state.authedUser}}

export default connect(mapStateToProps,)(AnsweredPolls);
