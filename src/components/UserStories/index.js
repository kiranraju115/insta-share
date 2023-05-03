import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserStories extends Component {
  state = {userStories: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = ' https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      // console.log(data)
      const updatedData = data.users_stories.map(eachUser => ({
        storyUrl: eachUser.story_url,
        userId: eachUser.user_id,
        userName: eachUser.user_name,
      }))
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        userStories: updatedData,
      })
    }
  }

  renderStoryView = () => {
    const {userStories} = this.state

    return (
      <Slider {...settings}>
        {userStories.map(eachStory => {
          const {storyUrl, userId, userName} = eachStory
          return (
            <ul className="" key={userId}>
              <li className="list-item">
                <img src={storyUrl} className="user-logo" alt="user story" />
                <h1 className="username-text">{userName}</h1>
              </li>
            </ul>
          )
        })}
      </Slider>
    )
  }

  renderAllStories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderStoryView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderAllStories()}</div>
  }
}

export default UserStories
