import {Component} from 'react'
import {Loader} from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class MyProfile extends Component {
  state = {
    myProfile: {},
    postDetails: [],
    storyDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getUpdatedData = eachItem => ({
    followerCount: eachItem.followers_count,
    followingCount: eachItem.following_count,
    id: eachItem.id,
    postCount: eachItem.posts_count,
    profilePicture: eachItem.profile_pic,
    userBio: eachItem.user_bio,
    userId: eachItem.user_id,
    userName: eachItem.user_name,
  })

  getUpdatedPostAndStory = data => ({
    id: data.id,
    image: data.image,
  })

  getMyProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProcess})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/my-profile`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.getUpdatedData(fetchedData.profile)
      const updatedPost = fetchedData.profile.posts.map(eachData =>
        this.getUpdatedPostAndStory(eachData),
      )

      const updatedStories = fetchedData.profile.stories.map(eachData =>
        this.getUpdatedPostAndStory(eachData),
      )
      console.log(updatedData)
      console.log(updatedPost)
      console.log(updatedStories)

      this.setState({
        myProfile: updatedData,
        postDetails: updatedPost,
        storyDetails: updatedStories,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderMyProfileView = () => {
    const {myProfile, postDetails, storyDetails} = this.state
    const {
      followerCount,
      followingCount,

      postCount,
      profilePicture,
      userBio,
      userName,
      userId,
    } = myProfile
    return (
      <div className="user-Details-Container">
        <div className="user-Details-content">
          <div className="profile-container">
            <img
              className="profile-img"
              src={profilePicture}
              alt="my profile"
            />
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dahw90b2z/image/upload/v1649208425/Icon_1_qfbohw.png"
        alt="failure view"
      />
      <p className="no-found-heading">Something went wrong. Please try again</p>
      <button
        type="button"
        className="home-page-btn"
        onClick={this.onClickRetry}
      >
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderMyProfileDetailView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMyProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderMyProfileDetailView()}</div>
      </>
    )
  }
}

export default MyProfile
