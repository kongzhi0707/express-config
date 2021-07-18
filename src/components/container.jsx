import React, { Component } from 'react'
import { Icon } from '@alife/aisc';

export default class Container extends Component {
  handleClear = () => {
    this.props.onClear()
  }
  render() {
    const { style, placeholder, hasClear, className = '', onChange, value, origin, disabled } = this.props
    return <label data-v={origin} className={`${className}${hasClear ? ' clear' : ''}${disabled ? ' disabled' : ''}`} style={{ ...style, position: 'relative' }}>
        <span placeholder={placeholder}>{value}</span>
        {
          !disabled && hasClear ? <Icon type="delete-filling" onClick={this.handleClear} className="clear-icon" /> : ''
        }
      </label>
  }
}