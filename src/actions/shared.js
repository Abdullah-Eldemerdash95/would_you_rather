import { getInitialData } from "../utils/usedData";
import { getUsers } from "./users";
import { getPolls } from "./polls";



export function handleInitialData () {
    return (dispatch) => {
        return  getInitialData()
        .then(({ users, questions}) => {
          dispatch(getUsers(users))
          dispatch(getPolls(questions))
        })
    }
}


