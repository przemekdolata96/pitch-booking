import React from 'react'
import {  Avatar } from 'antd';
import "./UserProfile.scss";

export default (props) => {
  return (
    <div className="user-profile">
      <Avatar src={props.userPhoto} />
      <span className={"user-name " + (props.collapsed ? 'hidden' : '')} >{props.userName}</span>
    </div>
  )
}
