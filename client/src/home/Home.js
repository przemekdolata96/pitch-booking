import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { fetchAllReservations, deleteReservation } from '../redux/actions/reservations';
import 'antd/dist/antd.css';
import './Home.scss';
import UserProfile from "../components/user-profile/UserProfile";
import Reservation from "../components/reservation/Reservation";
import { Layout, Menu, Icon, Tabs, Card, AutoComplete, Button, TimePicker, DatePicker, message} from 'antd';
import moment from 'moment';
import Calendar from "../components/calendar/Calendar";


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

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
    cityInput: 'Wrocław',
    streetInput: '',
    pitches: [],
    menuOption: 1,
    selectedPitchID: null,
    selectedTabKey: '1',
    events: [],
    selectedDate: moment().format('YYYY-MM-DD'),
    reservationStartTime:null,
    reservationEndTime:null,
    reservationStartMoment:null,
    reservationEndMoment:null,
    reservationDisabled: true,
    message: null,
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
    this.fetchPitches();
  }

  fetchPitches = () => {
    axios.get(`http://localhost:3001/api/pitches/?city=${this.state.cityInput}&address=${this.state.streetInput}`)
    .then(response => {
      this.setState({
        pitches: response.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  fetchReservations = () => {
    const userID = localStorage.getItem('id');
    axios.get(`http://localhost:3001/api/reservations/${this.state.selectedDate}/${this.state.selectedPitchID}`)
    .then(response => {
      const reservations = response.data.map(reservation => {
        let color = reservation.userId === userID ? 'blue' : 'red'
        return {
          title: 'Rezerwacja',
          start: `${reservation.date}T${reservation.start_time}`,
          end: `${reservation.date}T${reservation.end_time}`,
          color: color
        }
      })
      this.setState({
        events: reservations
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  inputCity = (cityInput) => {
    this.setState({
      cityInput: cityInput
    },this.fetchPitches)
  }

  inputStreet = (streetInput) => {
    this.setState({
      streetInput: streetInput
    },this.fetchPitches)
  }

  menuOptionChange = (option) => {
    this.setState({
      menuOption: option
    })
  }

  pitchChooseHandler = (pitchID) => {
    this.setState({
      selectedPitchID: pitchID,
      selectedTabKey: '2',
    }, () => {
      this.fetchReservations()
      this.validateReservation()
    })
  }

  createReservation = () => {
    axios.post('http://localhost:3001/api/reservation',{
      date: this.state.selectedDate,
      startTime: this.state.reservationStartTime,
      endTime: this.state.reservationEndTime,
      pitchId: this.state.selectedPitchID,
      userId: localStorage.getItem('id')
    })
    .then(response => {
      this.fetchReservations();
      this.setState({
        reservationDisabled : true
      },() => {
          const success = () => {
            message.success('Rezerwacja została dodana', 10);
          };
          success();
          this.props.fetchAllReservations(localStorage.getItem('id'));
        setTimeout(() => {
          this.setState({
            reservationDisabled: false
          },this.validateReservation)
        }, 1000);
      })
    })
    .catch(err => {
      const error = () => {
        message.error('Nie dodano rezerwacji, sprawdź czy termin nie jest już zarezerwowany', 10);
      };
      error()
      console.error(err);
    })
  }

  validateReservation= () => {
    if(this.state.reservationStartMoment && this.state.reservationEndMoment && this.state.selectedPitchID) {
      let duration = moment.duration(this.state.reservationEndMoment.diff(this.state.reservationStartMoment ));
      let minutes = duration.asMinutes();
      if (minutes < 15 || minutes > 120) {
        this.setState({
          message: 'Czas jest niepoprawny (Minimalny czas rezerwacji to 30min a maksymalny 2h)',
          reservationDisabled: true
        })
      } else {
        this.setState({
          message: null,
          reservationDisabled:false
        })
      }
    }
  }

  dateChangeHandler = (date) => {
    if(!date || date == 'Invalid date') {
      this.setState({
        selectedDate: moment().format('YYYY-MM-DD')
      },this.fetchReservations)
    } else {
      this.setState({
        selectedDate: moment(date).format('YYYY-MM-DD')
      },this.fetchReservations)
    }
  }

  tabChangeHandler = (tabKey) => {
    this.setState({
      selectedTabKey: tabKey
    })
  }

  render() {
    //const { isAuthenticated } = this.props.auth;

    
    const reservations = this.props.reservations.map(reservation => {
      return {
        date: reservation.date,
        startTime: reservation.start_time,
        endTime: reservation.end_time,
        address: `${reservation.pitch.city}, ${reservation.pitch.address}`,
        id: reservation.id
      }
    }
    )

    const dateFormat = 'YYYY/MM/DD';

    let pitches;

    if(this.state.pitches.length > 0) {
      pitches = this.state.pitches.map(pitch => (
        <Card title={pitch.name} bordered={true} style={{ width: 300, marginRight: 10, marginBottom: 10, borderColor: '#CCC' }}>
          <Button type="primary" onClick={() => this.pitchChooseHandler(pitch.id)}>Wybierz</Button>
          <p>{pitch.city}</p>
          <p>{pitch.address}</p>
        </Card>
      ))
    } else {
      pitches = "Nie znaleziono boisk"
    }

    let content;

    switch (this.state.menuOption) {
      case 1:
        content = 
        <Reservation
          data = {reservations}
          onDelete={(id) => this.props.removeReservation(id)}
        />
          
        break;
      case 2:
          content = 
            <Tabs defaultActiveKey="1" onChange={key => this.tabChangeHandler(key)} activeKey={this.state.selectedTabKey}>
              <TabPane tab="Wybór boiska" key="1">
                <div style={{ /* background: '#ECECEC' */ padding: '30px' }}>
                  <AutoComplete
                    style={{ width: 200, marginBottom: 10, marginRight: 10 }}
                    dataSource={dataSource}
                    placeholder="Miasto"
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    onSearch={inputValue => this.inputCity(inputValue)}
                    value= {this.state.cityInput}
                  />
                  <AutoComplete
                    style={{ width: 200, marginBottom: 10 }}
                    dataSource={dataSource}
                    placeholder="Ulica"
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    onSearch={inputValue => { this.inputStreet(inputValue) }}
                    value={this.state.streetInput}
                  />
                  <div className="cards-container">
                    {pitches}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Rezerwacja" key="2">
                <TimePicker 
                  defaultOpenValue={moment('00:00', 'HH:mm')}
                  defaultValue={null}
                  placeholder="Wybierz czas"
                  allowEmpty={false}
                  format='HH:mm'
                  minuteStep={15}
                  onChange={(value, timestring) => {
                  this.setState({ reservationStartTime: timestring, reservationStartMoment: value}, this.validateReservation)
                  }}
                  style={{marginBottom: 10, marginRight: 10 }}
                />
                <TimePicker 
                  defaultOpenValue={moment('00:00', 'HH:mm')}
                  defaultValue={null}
                  placeholder="Wybierz czas"
                  allowEmpty={false}
                  format='HH:mm'
                  minuteStep={15}
                  onChange={(value, timestring) => {
                  console.log("EndTime", value)
                  this.setState({ reservationEndTime: timestring, reservationEndMoment: value}, this.validateReservation)
                  }}
                  style={{marginBottom: 10, marginRight: 10 }}
                />
                <DatePicker 
                  defaultValue={moment(new Date(), dateFormat)}
                  format={dateFormat}
                  onChange={this.dateChangeHandler}
                  allowClear={false}
                  style={{marginBottom: 10, marginRight: 10 }}
                />
                <Button 
                  type="primary"
                  onClick={this.createReservation}
                  disabled={this.state.reservationDisabled}
                  style={{ marginBottom: 10, marginRight: 10 }}
                >Zarezerwuj</Button>
                { this.state.message &&
                  <span className="info">{this.state.message}</span>
                }
                { this.state.selectedPitchID ? 
                  <Calendar 
                    events={this.state.events}
                    date={this.state.selectedDate}
                  >
                  </Calendar>
                  :
                  <div><span className="info">Nie wybrano boiska</span></div>
                }
              </TabPane>
            </Tabs>
        break;
    
      default:
        break;
    }
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
                    <Menu.Item key="1" onClick={() => this.menuOptionChange(1)}>
                      <Icon type="pie-chart" />
                      <span>Moje rezerwacje</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => this.menuOptionChange(2)}>
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
                    {content}
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