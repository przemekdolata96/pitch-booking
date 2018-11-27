import React from 'react'
import './Reservation.scss'
import { Icon, Tag, Button} from 'antd';

export default (props) => {
  return (
    <div className="reservation-container">
      <div className="data">
        <Tag style={{marginRight:0}}>{props.date}</Tag>
      </div>
      <div className="time">
        <Tag style={{marginRight:0}} color="green">{props.startTime}</Tag>
        <span>-</span>
        <Tag style={{marginRight:0}} color="green">{props.endTime}</Tag>
      </div>
      <span className="place">{props.place}</span>
      <Button type="danger" onClick={props.onDelete}>Usuń</Button>
    </div>
  )
}
