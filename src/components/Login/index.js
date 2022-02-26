import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userData = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response, data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameInput = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          className="input"
          placeholder="Username"
          onChange={this.onChangeUsername}
          id="username"
        />
      </>
    )
  }

  renderPasswordInput = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          className="input"
          placeholder="Password"
          onChange={this.onChangePassword}
          id="password"
        />
      </>
    )
  }

  renderLoginBtn = () => (
    <button className="login-btn" type="submit">
      Login
    </button>
  )

  render() {
    const {showErrMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-cont">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-img"
          />
          <div className="inputs-cont">
            {this.renderUsernameInput()}
            {this.renderPasswordInput()}
            {this.renderLoginBtn()}
            {showErrMsg && <p className="error-msg">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
