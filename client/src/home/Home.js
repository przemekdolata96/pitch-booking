import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { fetchAllReservations, deleteReservation } from '../redux/actions/reservations';
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
    this.setState({ collapsed });
  }

  logout = () => {
    this.props.auth.logout(); 
    this.props.history.push('');
  }

  componentDidMount() {
    this.props.fetchAllReservations(localStorage.getItem('id'))

  }

  render() {
    //const { isAuthenticated } = this.props.auth;
    const reservations = this.props.reservations.map(reservation =>
      (
        <Reservation
          key={reservation.id}
          date={reservation.date}
          startTime={reservation.start_time}
          endTime={reservation.end_time}
          place={`${reservation.pitch.city}, ${reservation.pitch.address}`}
          onDelete={() => this.props.removeReservation(reservation.id)}
        />
      )
    )
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
                    {reservations}
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
  fetchAllReservations: (userId) => dispatch(fetchAllReservations(userId)),
  removeReservation: (reservationId) => dispatch(deleteReservation(reservationId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);