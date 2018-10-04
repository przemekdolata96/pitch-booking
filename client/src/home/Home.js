import React, { Component } from 'react';
import axios from 'axios';
class Home extends Component {
  constructor(props) {
    super(props);

    const { isAuthenticated } = this.props.auth;
    
    if (isAuthenticated() === false) {
      this.props.history.push('')
    }
  }

  login() {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout(); 
    this.props.history.push('');
  }

  componentDidMount() {

    axios.get(`http://localhost:3001/api/public`)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.log(error);
      }); 

    const { getAccessToken } = this.props.auth;
    const API_URL = "http://localhost:3001/api";;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
    axios.get(`${API_URL}/private`, { headers })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <div>
                <h4>
                  You are logged in!
                </h4>
                <button onClick={this.logout}>Wyloguj</button>
              </div>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;