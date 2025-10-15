import React, { Component } from 'react'
import loading from '../Ajax-loader.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div >
        <img className="rounded mx-auto d-block" src={loading} alt='Loading' />
      </div>
    )
  }
}

