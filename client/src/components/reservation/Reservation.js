import React from 'react'
import './Reservation.scss'
import { Icon, Tag, Button} from 'antd';

export default (props) => {
  return (
    <div className="reservation-container">
      <Tag style={{marginRight:50}}>{props.date}</Tag>
      <div className="time">
        <Tag color="green">{props.startTime}</Tag>
        <div>
          <Icon type="minus"/>
        </div>
        <Tag color="green">{props.endTime}</Tag>
      </div>
      <span className="place">{props.place}</span>
      {/* <Icon type="delete" onClick={props.onDelete} /> */}
      <Button type="danger" onClick={props.onDelete}>Usuń</Button>
    </div>
  )
}
