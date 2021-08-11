import { GET_USERS } from '../actions/users'
import { ADD_POLL, ADD_ANSWER }  from '../actions/polls'

export default function users (state = {}, action) {
    switch(action.type) {
      case GET_USERS :
        return {
          ...state,
          ...action.users
        }
        case ADD_POLL:
          console.log(action.poll)
    return {
      ...state,
      [action.poll.author]: {...state[action.poll.author],
        questions: state[action.poll.author].questions.concat([action.poll.id])}
    }
    case ADD_ANSWER:
    const { qid, answer, authedUser } = action.answerInfo;
    return {
      ...state,
      [authedUser]: {...state[authedUser],
        answers: {...state[authedUser].answers,
          [qid]: answer}}
    }
      default :
        return state
    }
  }
  

  
