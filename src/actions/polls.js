import {_saveQuestion, _saveQuestionAnswer} from '../utils/_DATA'
export const GET_POLLS = 'GET_POLLS'
export const ADD_POLL = 'ADD_POLL'
export const ADD_ANSWER = 'ADD_ANSWER'

export function getPolls (polls) {
    return {
        type: GET_POLLS,
        polls
    }
}

export function AddPoll ( poll ) {
    return {
        type: ADD_POLL,
        poll
    }
}

function addAnswer({ qid, answer, authedUser }) {
	return {
		type: ADD_ANSWER,
		answerInfo: { qid, answer, authedUser}};
	}


export function handleAddPoll(optionOne, optionTwo, author) {
	return (dispatch) => {
		return _saveQuestion({
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author,
		})
			.then((question) => dispatch(AddPoll(question)))
	};
}

export function handleAddAnswer(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();
		return _saveQuestionAnswer({
			authedUser,
			qid: qid,
			answer: answer,
		})
			.then(() => dispatch(addAnswer({qid, answer, authedUser})))
	}; 
}

