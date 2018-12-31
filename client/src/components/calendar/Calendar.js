import React, { Component } from 'react';
import moment from "moment"
import $ from "jquery";
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/locale/pl';

export class Calendar extends Component {

  render() {
    return <div ref="calendar"></div>;
  }
  componentDidMount() {
    const { calendar } = this.refs;

    $(calendar).fullCalendar({
      header: {
        left: 'prev,next,today',
        center: 'title',
        right: ''
      },
      lang: 'pl',
      editable: false,
      droppable: false, // this allows things to be dropped onto the calendar
      defaultView: 'agendaDay',
      events:this.props.events,
      defaultDate: this.props.date
    })
  }

  componentDidUpdate() {
    console.log(this.props.events)
    const { calendar } = this.refs;
    if(this.props.date != 'Invalid date') {
      $(calendar).fullCalendar('gotoDate', new Date(this.props.date))
      $(calendar).fullCalendar('removeEvents')
      $(calendar).fullCalendar('addEventSource',this.props.events)
      //$(calendar).fullCalendar('rerenderEvents')
    }
  }
}

export default Calendar
