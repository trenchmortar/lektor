'use strict'

import PropTypes from 'prop-types'
import React from 'react'
import dialogSystem from '../dialogSystem'
import i18n from '../i18n'

class SlideDialog extends React.Component {
  constructor (props) {
    super(props)
    this._onKeyPress = this._onKeyPress.bind(this)
  }

  componentDidMount () {
    if (this.props.closeOnEscape) {
      window.addEventListener('keydown', this._onKeyPress)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this._onKeyPress)
  }

  _onKeyPress (event) {
    if (event.which === 27 && this.props.closeOnEscape) {
      event.preventDefault()
      dialogSystem.dismissDialog()
    }
  }

  _onCloseClick (event) {
    event.preventDefault()
    dialogSystem.dismissDialog()
  }

  render () {
    let { children, title, hasCloseButton, className } = this.props
    className = (className || '') + ' sliding-panel container'
    return (
      <div className={className}>
        <div className='col-md-6 col-md-offset-4'>
          {
            hasCloseButton &&
              <a
                href='#'
                className='close-btn'
                onClick={this._onCloseClick.bind(this)}
              >
                {i18n.trans('CLOSE')}
              </a>
          }
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    )
  }
}

SlideDialog.propTypes = {
  title: PropTypes.string,
  hasCloseButton: PropTypes.bool,
  closeOnEscape: PropTypes.bool
}

export default SlideDialog
