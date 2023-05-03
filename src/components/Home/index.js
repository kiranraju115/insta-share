import {Component} from 'react'
import Header from '../Header'
import UserStories from '../UserStories'

import './index.css'

class Home extends Component {
  state = {}

  render() {
    return (
      <>
        <Header />
        <UserStories />
      </>
    )
  }
}
export default Home
