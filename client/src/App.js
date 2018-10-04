import React, { Component } from 'react';

import './App.scss';
import { connect } from "react-redux";
import { fetchNewTime } from './redux/actionCreators';
import {Button} from "./components/button/Button";
import {Phone} from "./components/phone/Phone";
import logo from "./images/football.svg";
import history from './history';
class App extends Component {
  constructor(props) {
    super(props);
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    
    if(isAuthenticated() === true) {
      history.push('home')
      console.log('push history home')
    }
  }

  render() {

    return(
     <div>
        <div className="hero-background"></div>
        <div className="hero-container">
          <h2 className="hero-text">zarezerwuj termin i graj ze znajomymi na wybranych boiskach</h2>
          <div className="login-button-container">
            <Button text="Zaloguj" className="button primary medium" click={this.login}></Button>
          </div>
          <Phone image={logo} ></Phone>
          <img src={logo} alt="football icon"/>
        </div>
     </div>
    ) 
  }
}
{/* <div>
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Auth0 - React</a>
      </Navbar.Brand>
      <Button bsStyle="primary" className="btn-margin" onClick={this.goTo.bind(this, "home")}>
        Home
      </Button>
      {!isAuthenticated() && <Button id="qsLoginBtn" bsStyle="primary" className="btn-margin" onClick={this.login.bind(this)}>
          Log In
        </Button>}
      {isAuthenticated() && <Button id="qsLogoutBtn" bsStyle="primary" className="btn-margin" onClick={this.logout.bind(this)}>
          Log Out
        </Button>}
    </Navbar.Header>
  </Navbar>
  <div>Current Time: {this.props.currentTime}</div>
  <Button onClick={this.props.updateTime}>Update Time</Button>
</div> */}

const mapStateToProps = state => {
  return {
    currentTime: state.currentTime
  }
}

const mapDispatchToProps = dispatch => ({
  updateTime: () => dispatch(fetchNewTime())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);