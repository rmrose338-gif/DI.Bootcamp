import React, { Component } from 'react';

const h = React.createElement;

export default class Modal extends Component {
  render() {
    return h(
      'div',
      { className: 'modal-background', role: 'presentation' },
      h(
        'section',
        {
          className: 'modal-body',
          role: 'dialog',
          'aria-modal': 'true',
          'aria-labelledby': 'error-title',
        },
        h('div', { className: 'modal-mark', 'aria-hidden': 'true' }, '!'),
        h('p', { className: 'modal-eyebrow' }, 'ERROR BOUNDARY CAUGHT THIS'),
        h('h2', { id: 'error-title' }, 'Something went wrong.'),
        h('p', { className: 'error-message' }, this.props.message),
        this.props.errorInfo?.componentStack && h(
          'details',
          { className: 'error-details' },
          h('summary', null, 'Error details'),
          h('pre', null, this.props.errorInfo.componentStack)
        ),
        h('button', { className: 'close-button', type: 'button', onClick: this.props.onClose }, 'Close')
      )
    );
  }
}