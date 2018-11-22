import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { fetchAllReservations } from '../redux/actions/reservations';
import 'antd/dist/antd.css';
import './Home.scss';
import UserProfile from "../components/user-profile/UserProfile";
import Reservation from "../components/reservation/Reservation";

import { Layout, Menu, Breadcrumb, Icon, Avatar } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Home extends Component {
  constructor(props) {
    super(props);

    const { isAuthenticated } = this.props.auth;
    
    if (isAuthenticated() === false) {
      this.props.history.push('')
    }
  }

  state = {
    collapsed: false,
    userPhoto: localStorage.getItem('picture'),
    userName: localStorage.getItem('name'),
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  login() {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout(); 
    this.props.history.push('');
  }

  getProfile = () => {
    return localStorage.getItem('picture');
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
    setTimeout(() => {
      this.props.fetchAllReservations(localStorage.getItem('id'))
    }, 1000);
    console.log('REZERWACJE',this.props.reservations)
   
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
            <Layout>
                <Sider
                  collapsible
                  collapsed={this.state.collapsed}
                  onCollapse={this.onCollapse}
                >
                  <UserProfile
                    userPhoto={localStorage.getItem('picture')}
                    userName={localStorage.getItem('name')}
                    collapsed={this.state.collapsed}
                  />
                  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                      <Icon type="pie-chart" />
                      <span>Moje rezerwacje</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Icon type="desktop" />
                      <span>Zarezerwuj boisko</span>
                    </Menu.Item>
                    <Menu.Item key="9" onClick={this.logout}>
                      <Icon type="close-circle" />
                      <span>Wyloguj</span>
                    </Menu.Item>
                  </Menu>
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', padding: 0,}} />
                <Content style={{ padding: 20, minHeight: 'calc(100vh - 64px)' }}>
                  <div style={{ padding: 24, background: '#fff', minHeight: 750 }}>
                    <Reservation 
                      date="12/11/2018"
                      startTime="10:15"
                      endTime="11:15"
                      place="Wrocław, plac Grunwaldzki 22"
                      onDelete={() => {console.log("delete reservation")}}
                    />
                  </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>
                  Ant Design ©2018 Created by Ant UED
                </Footer> */}
              </Layout>
            </Layout>
            
    );
  }
}

const mapStateToProps = state => {
  return {
    reservations: state.reservations.reservations
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllReservations: (userId) => dispatch(fetchAllReservations(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);