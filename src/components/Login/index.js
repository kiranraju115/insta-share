import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="username" className="label">
          UserName
        </label>
        <br />
        <input
          id="username"
          type="text"
          className="input"
          placeholder="Username"
          onChange={this.onChangeUsername}
          value={username}
        />
        <br />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label htmlFor="password" className="label">
          Password
        </label>
        <br />
        <input
          id="password"
          type="password"
          className="input"
          placeholder="Password"
          onChange={this.onChangePassword}
          value={password}
        />
        <br />
      </>
    )
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    }
    this.onSubmitFailure(data.error_msg)
  }

  render() {
    const {showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-app-container">
        <div className="image-container">
          <img
            src="https://res.cloudinary.com/dkznwatke/image/upload/v1683093385/Layer_2_lehfkr.png"
            alt=""
            className=""
          />
        </div>
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="login-sub-container">
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/dkznwatke/image/upload/v1683093745/Group_c6sohq.png"
                alt=""
                className="logo"
              />
              <h1 className="">Insta Share</h1>
            </div>
            <div className="input-container">{this.renderUsername()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            {showError && <p className="">*{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}
export default Login
