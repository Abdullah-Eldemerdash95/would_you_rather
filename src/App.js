import React, { Component } from "react";
import { handleInitialData } from './actions/shared'
import { connect } from 'react-redux'
import Home from "./components/Home";
import Poll from "./components/Poll";
import PollCreated from "./components/PollCreated";
import Page404 from "./components/Page404";
import Login from "./components/Login";
import LeaderBoard from "./components/LeaderBoard";
import { BrowserRouter as Router, Route,Switch ,Redirect} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'



class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }
 render() {
   console.log(this.props.authedUser)
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route exact path="/" name="Login Page" render={(props) => <Login {...props} />}/>
       <PrivateRoute exact path={`/Home/:${this.props.authedUser}`}  component={Home} />
       <PrivateRoute exact path={`/newpoll/:${this.props.authedUser}`}  component={Poll} />
       <PrivateRoute exact path={`/createdpoll/:${this.props.authedUser}`} component={PollCreated}  />
       <PrivateRoute exact path={`/leaderboard/:${this.props.authedUser}`} component={LeaderBoard}  />
       <PrivateRoute component={Page404} /><Redirect to="/404" />
       </Switch>
    </div>
    </Router>
  );
}
}
function mapStateToProps (store) {
  return {
    authedUser: store.authedUser
  }
}


export default connect(mapStateToProps,{handleInitialData})(App);


/*
<Route path='/' exact component={Login} />
       <Route path={`/Home/:${this.props.authedUser}`}  component={Home} />
       <Route path={`/newpoll/:${this.props.authedUser}`} exact component={Poll} />
       <Route path={`/createdpoll/:${this.props.authedUser}`} exact component={PollCreated} />
       <Route path={`/leaderboard/:${this.props.authedUser}`} exact component={LeaderBoard} />
       <Route component={Page404} />
       <Route exact path="/" render={(props) => <Login {...props} />}
          />
          <PrivateRoute path="/"  component={Login} />
           */