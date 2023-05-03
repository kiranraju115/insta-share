import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import './index.css'

class Header extends Component {
  state = {}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderSearchInput = () => {
    console.log('kdj')

    return (
      <div className="search-input-container">
        <input type="search" className="input" placeholder="Search Caption" />
        <button type="button" data-testid="searchIcon">
          <FaSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <nav className="nav-bar-container">
        <div className="nav-bar-large-container">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dkznwatke/image/upload/v1683093745/Group_c6sohq.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="app-name">Insta Share</h1>
          </div>
          <ul className="nav-menu">
            <li className="list-item">{this.renderSearchInput()}</li>

            <li className="list-item">
              <Link to="/">
                <p className="">Home</p>
              </Link>
            </li>

            <li className="list-item">
              <Link to="/profile">
                <p className="">Profile</p>
              </Link>
            </li>

            <li className="list-item">
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
