import React, { Component } from 'react'

const NUMBER_REG = /^([0-9]{1,}[.]?[0-9]*)$/

class ContentEditable extends Component {
  constructor(props) {
    super()

    this.state = {
      value: ""
    }
  }

  componentDidMount() {
    this.isBlur = true;
  }

  shouldComponentUpdate(nextProps) {
    if (this.willUpdate || nextProps.content !== this.props.content) {
      this.didUpdate = true
      return true
    }
    return false
  }

  componentDidUpdate() {
    if (this.didUpdate) {
      if (!this.isBlur && this.element) {
        setTimeout(() => {
          this.setFocus()
          this.setCaret()
        })
      }
      this.didUpdate = false
    }
  }

  setFocus = () => {
    this.element.textContent = this.props.content
    this.element.focus()
  }

  setCaret = () => {
    if (this.element) {
      var range = document.createRange()
      var sel = window.getSelection()
      var value = this.element.textContent
      if (value === "") {
        range.setStart(this.element, 0)
      } else {
        range.setStart(this.element.firstChild, this.cursorOffset)
      }
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }

  onChange = type => ev => {
    const { onChange = e => e } = this.props
    this.isBlur = false
    this.willUpdate = true
    const rawValue = this.element.innerText
    this.cursorOffset = document.getSelection().anchorOffset
    if (rawValue === "") {
      onChange(ev, rawValue)
      return
    }
    switch (type) {
      case 'number':
        if (NUMBER_REG.test(rawValue)) {
          onChange(ev, rawValue)
          return
        }
        this.cursorOffset -= (rawValue.length - this.props.content.length)
        onChange(ev, this.props.content)
        return
      default:
        if (this.state.value !== rawValue) {
          onChange(ev, rawValue)
        }
    }
  }

  onPaste = ev => {
    const value = this.element.innerText
    this.cursorOffset = document.getSelection().anchorOffset + (value.length - this.state.value.length)
    this.props.onPaste(ev)
  }

  onBlur = ev => {
    const { content } = this.props
    this.isBlur = true
    this.cursorOffset = content && content.length
    if (this.props.onBlur) {
      this.props.onBlur(ev, this.element.innerText)
    }
  }

  onFocus = ev => {
    this.isBlur = false
  }

  render() {
    const { content, className, style, type, placeholder } = this.props;
    return (
      <div
        ref={ref => this.element = ref}
        className={className}
        style={{ whiteSpace: 'pre-wrap', style, borderRadius: 2 }}
        contentEditable={true}
        onBlur={this.onBlur}
        onInput={this.onChange(type)}
        onPaste={this.onPaste}
        onFocus={this.onFocus}
        placeholder={placeholder}
      >{content}</div>
    )
  }
}

export default ContentEditable;