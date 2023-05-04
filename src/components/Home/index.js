import {Component} from 'react'
import Header from '../Header'
import UserStories from '../UserStories'
import InstaPost from '../InstaPost'

import './index.css'

class Home extends Component {
  state = {}

  render() {
    return (
      <>
        <Header />
        <UserStories />
        <InstaPost />
      </>
    )
  }
}
export default Home
