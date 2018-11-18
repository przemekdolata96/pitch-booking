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

  getProfile = () => {
    return localStorage.getItem('user_id');
  }

  getProfiles = () => {
   /*  axios.get('http://localhost:3001/api/users')
      .then(response => {
        return response.data
      })
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      }) */
    console.log(new Date().getTime())
  }

  componentDidMount() {

    //console.log(this.props.auth.getProfile())

  /*   axios.post('http://localhost:3001/api/users/create',{
      user_id: localStorage.getItem('user_id'),
      name: localStorage.getItem('name'),
    }); */

    
   /*  axios.get('https://localhost:3000/callback#id_token=' + this.props.auth.getAccessToken())
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });  */

    //console.log(this.props.auth.userInfo())
    //this.props.auth.getAccessToken()

    /* axios.get(`http://localhost:3001/api/public`)
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
      }); */
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
                <button onClick={this.getProfiles}>Get profile</button>
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