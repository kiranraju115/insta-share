import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'

import Home from './components/Home'
import MyProfile from './components/MyProfile'
import './App.css'
// <ProtectedRoute exact path = "/profile" component = {UserProfile}/>

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/profile" component={MyProfile} />
      </Switch>
    )
  }
}

export default App
