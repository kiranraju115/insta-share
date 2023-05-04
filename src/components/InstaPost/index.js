import {Component} from 'react'
import Cookies from 'js-cookie'
import UserPost from '../UserPost'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class InstaPost extends Component {
  state = {
    userPosts: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getInstaPosts()
  }

  getInstaPosts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.posts.map(eachItem => ({
        caption: eachItem.post_details.caption,
        imageUrl: eachItem.post_details.image_url,
        postId: eachItem.post_id,
        profilePicture: eachItem.profile_pic,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        createdAt: eachItem.created_at,
        likesCount: eachItem.likes_count,
        userComments: eachItem.comments,
      }))

      // console.log(updatedData)

      this.setState({
        userPosts: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderPostView = () => {
    const {userPosts} = this.state

    return (
      <>
        <ul className="list-item-container">
          {userPosts.map(eachPost => (
            <UserPost key={eachPost.postId} userPostDetails={eachPost} />
          ))}
        </ul>
      </>
    )
  }

  renderAllPost = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPostView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderAllPost()}</>
  }
}
export default InstaPost
