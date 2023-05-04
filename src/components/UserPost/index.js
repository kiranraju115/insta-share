import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import './index.css'

class UserPost extends Component {
  state = {isLiked: false, commentShow: false, commentList: []}

  render() {
    const {userPostDetails} = this.props
    const {isLiked, commentShow, commentList} = this.state
    const {
      profilePicture,
      userId,
      userName,
      createdAt,
      likesCount,
      userComments,

      imageUrl,
      caption,
    } = userPostDetails
    return (
      <li className="user-post-container">
        <div className="user-Post-content">
          <div className="user-profile-container">
            <img
              src={profilePicture}
              alt="post author profile"
              className="profile-picture"
            />
            <Link to={`/users/${userId}`} className="nav-link">
              {' '}
              <h1 className="user-name">{userName}</h1>
            </Link>
          </div>
          <img src={imageUrl} alt="post" className="user-post-image" />
          <div className="post-detail-and-share-detail-container">
            <div className="reaction-container">
              {isLiked ? (
                <button type="button" className="icons">
                  <FcLike size={25} />
                </button>
              ) : (
                <button type="button" className="icons">
                  <BsHeart size={25} />
                </button>
              )}
              <button type="button" className="icons">
                {' '}
                <FaRegComment size={25} />
                <BiShareAlt size={25} className="share-icon" />
              </button>
            </div>
            <p className="post-description">
              {isLiked ? likesCount + 1 : likesCount} Likes
            </p>
            <p className="post-description">{caption}</p>
            {commentShow && (
              <form className="form-item-container" onSubmit="">
                <textarea placeholder="your Comment" rows="1" />
                <button type="submit" className="">
                  Comment
                </button>
              </form>
            )}
            <div className="post-details">
              <ul className="comment-item">
                {commentList.map(eachComment => (
                  <li className="" key={eachComment.id}>
                    <p>{eachComment.comment}</p>
                  </li>
                ))}
              </ul>
              <ul className="comment-item">
                {userComments.map(eachComment => (
                  <li className="" key={eachComment.id}>
                    <p>{eachComment.comment}</p>
                  </li>
                ))}
              </ul>
              <p>{createdAt}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
export default UserPost
