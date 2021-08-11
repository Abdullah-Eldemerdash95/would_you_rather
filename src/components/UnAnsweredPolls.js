import React, { Component } from "react";
import { connect } from 'react-redux'
import {Card} from 'react-bootstrap'
import { handleAddAnswer } from '../actions/polls';
import { Link } from 'react-router-dom'

class UnAnsweredPolls extends Component {
  state = {
    check: (((this.props.polls.filter((poll) => {if (!([...(Object.keys((this.props.usersArray.filter((user) => {if ( user.id === this.props.authedUser) {return user} return null}))[0].answers))]).includes(poll.id)) {return poll.id} return null}))).map((f) => {return f.id })).reduce((acc, curr)=> (acc[curr]=false, acc), {})
    ,nike: (((this.props.polls.filter((poll) => {if (!([...(Object.keys((this.props.usersArray.filter((user) => {if ( user.id === this.props.authedUser) {return user} return null}))[0].answers))]).includes(poll.id)) {return poll.id} return null}))).map((f) => {return f.id })).reduce((acc, curr)=> (acc[curr]=false, acc), {})
    ,count : ( (((this.props.polls.filter((poll) => {if (!([...(Object.keys((this.props.usersArray.filter((user) => {if ( user.id === this.props.authedUser) {return user} return null}))[0].answers))]).includes(poll.id)) {return poll.id} return null}))).map((f) => {return f.id })).reduce((acc, curr)=> (acc[curr]= 0, acc), {}))
    ,nameAdded : ((((this.props.polls.filter((poll) => {if (!([...(Object.keys((this.props.usersArray.filter((user) => {if ( user.id === this.props.authedUser) {return user} return null}))[0].answers))]).includes(poll.id)) {return poll.id} return null}))).map((f) => {return f.id })).reduce((acc, curr)=> (acc[curr]= '', acc), {}))
    ,answer: '',
    errorMsg: '',
  } // we are using in state that each state variable contain the ids of each question to control every thing here for each question
  // we filter questions and for each question we confirm that id is equal to authed user then return object keys for answered ids and see if it includes the question id that we are in or not if not
  //if not return new poll id if opposite return null then all that before is resulting map has all ids i needed to become object 
  // that has key property equal to id and value i put it or got it from my ui depend on usage
  // check to get all valuse in radios .. nike for true and false for checking radios .. nameAdded for users that answered question
 /* .reduce((acc, curr)=> (acc[curr]='', acc), {})
 Each time of the loop current value inserted into accumulator acc[curr] = '' like this. ,acc is returning the accumulator once loop end. And ,{} is defined the accumulator is a object */
 
 setQuesValue = (event) => {
   const id = event.target.name 
   const val = event.target.value 
      this.setState(prevState => ({
        check: {                   // object that we want to update
          ...prevState.check,    // keep all other key-value pairs
          [id]:  val       // update the value of specific key
      }}))
      this.setState({
        answer: val   
      })
    }

  handleSubmit2 = (e) => {
    const shifo = e.target.name;
    console.log(shifo)
 if(this.state.answer === '') {(e.preventDefault())} 
 else { 
    e.preventDefault()
    this.setState(prevState => ({
      nike: {...prevState.nike, [shifo]: true },
    count: {...prevState.count, [shifo]: +1 },
  nameAdded: {...prevState.nameAdded,[shifo]: this.props.authedUser},
  }))
  this.setState({
    answer: this.state.check[shifo]    
  })
  this.props.handleAddAnswer(shifo, this.state.answer) }
}
handleChange=(e)=> {
  e.preventDefault();
};
  
 render() {
   
        const {polls, usersArray ,authedUser} = this.props;
        // we filter our users to get one identical to autheduser
        const userChoosed = usersArray.filter((user) => {if ( user.id === authedUser) {return user} return null});
        const x = Object.keys(userChoosed[0].answers);// get his answered ques ids
        const z = polls.filter((poll) => {if (!([...x]).includes(poll.id)) {return poll} return null});
// then we get the the unanswered ques by matching all ids of ques and return un matched cause we are use the answered ids

  return (
     <div>
         <div> {/*now for each question that already not answered we map over questions to show each one */}
       {z.map((q)=> <Card className='polls_Ques' key={q.id} > 
            <Card.Body className='babe1'> {usersArray.map((user)=> {if (((q.author)) === (user.id)) 
            {return <span key={user.id}>
            <div><p>{user.name}</p>
            <Card.Img src={user.avatarURL} variant='left' alt={`Avatar of ${user.name}`} className='avatar' width='50px'/>
            </div>
            </span>} return null})}</Card.Body>
            
            <div className='babe2'>
            <span> Would You Rather</span>
           <p><input type='radio'  value='optionOne' name={`${q.id}`} onChange={this.setQuesValue} 
           checked={ ( (this.state.check[q.id])) === 'optionOne' } disabled ={this.state.nike[q.id]}/>
            <label>
              {q.optionOne.text}
              <span> Answered By {(q.optionOne.votes.length)+((((this.state.check[q.id])) === q.optionOne.text) ? ((this.state.count[q.id])): (''))}  {usersArray.map((user)=> 
            {if (([...(q.optionOne.votes)]).includes(user.id)) 
            {return <span className='AnsweredBY' key={user.id}> {user.name} { (((this.state.check[q.id])) === q.optionOne.text) ? (this.state.nameAdded[q.id]): ('')} </span>} return null})}</span>
            </label></p> 
            
           <p> <input type='radio' value='optionTwo' name={`${q.id}`} onChange={this.setQuesValue}
            checked={ ((this.state.check[q.id])) === 'optionTwo'}  disabled ={this.state.nike[q.id]}/>
            <label>
              {q.optionTwo.text}
              <span> Answered By {(q.optionTwo.votes.length)+ ( (((this.state.check[q.id])) === q.optionTwo.text) ? ((this.state.count[q.id])): (''))}   {usersArray.map((user)=> 
            {if (([...(q.optionTwo.votes)]).includes(user.id)) 
            {return <span className='AnsweredBY' key={user.id}>{user.name} { (((this.state.check[q.id])) === q.optionTwo.text) ? (this.state.nameAdded[q.id]): ('')} </span>} return null})}</span>
              </label></p>
              <button type='submit' onClick={this.handleSubmit2} name={q.id}> confirm answer</button>
              <span className='TotalAnswers'> Total answer is equal {(q.optionOne.votes.length)+(q.optionTwo.votes.length)+(this.state.count[q.id])}</span> 
              <button type='submit' onClick={this.handleChange} >
      {/*this to send us to page that contain only question */}
      <Link to={{
        pathname: `/question/:question_${q.id}`,
        state:{
          username: q.author,
          key: q.id,
          optionOne: q.optionOne,
          optionTwo: q.optionTwo
        }}}>View question </Link> </button>
            </div>
            </Card>)
      }
       </div>
       
   </div>
  )
}
}


function mapStateToProps ({...state}) {
  return {
    polls: Object.values(state.polls).sort((a,b)=> b.timestamp - a.timestamp),/* this to sort answered questions due to time */
    usersArray: Object.values(state.users),
   authedUser: state.authedUser}}

export default connect(mapStateToProps, {handleAddAnswer})(UnAnsweredPolls);
