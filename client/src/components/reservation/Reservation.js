import React from 'react'
import './Reservation.scss'
import { Button, Table } from 'antd';

export default (props) => {
  const columns = [{
    title: 'Data',
    dataIndex: 'date',
    key: 'date',
  }, {
    title: 'Początek',
    dataIndex: 'startTime',
    key: 'startTime',
  }, {
    title: 'Koniec',
    dataIndex: 'endTime',
    key: 'endTime',
  }, {
    title: 'Adres Boiska',
    dataIndex: 'address',
    key: 'address',
  },{
    title: 'Akcje',
    dataIndex: 'id',
    key: 'id',
    render: id => (
      <Button type="danger" onClick={() => props.onDelete(id)}>Usuń</Button>
    ),
  }];

  return (
    <Table columns={columns} dataSource={props.data} locale = { {emptyText: 'Brak rezerwacji'}} />
  )
}