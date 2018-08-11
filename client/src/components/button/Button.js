import React from 'react';
import './Button.scss';

export const Button = (props) => {
  return (
    <button className={props.className} onClick={props.click}>
        {props.text}
    </button>
  )
}
