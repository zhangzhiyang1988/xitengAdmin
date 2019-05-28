import React from 'react'
import { connect } from 'dva';

@connect(({ order, loading }) => ({
  store: order,
}))

export default class OrderTable extends React.Component{

  render(){

    return <div>
      111
      {JSON.stringify( this.props.store.state)}
      dongfusong
    </div>
  }
}
