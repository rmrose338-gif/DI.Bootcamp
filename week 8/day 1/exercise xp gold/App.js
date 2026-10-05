import React from 'react';
import ErrorBoundary from './ErrorBoundary.js';

const h = React.createElement;

export default class App extends React.Component {
  state = { errorInfo: null };

  handleCaughtError = (errorInfo) => {
    this.setState({ errorInfo });
  };

  render() {
    return h(
      ErrorBoundary,
      { onCatch: this.handleCaughtError },
      (occurError) => h(
        'main',
        { className: 'page-shell' },
        h('header', { className: 'topbar' },
          h('span', { className: 'brand-mark', 'aria-hidden': 'true' }, 'E'),
          h('span', { className: 'brand-name' }, 'ERROR / HANDLING'),
          h('span', { className: 'topbar-index' }, 'REACT LAB 01')
        ),
        h('section', { className: 'hero' },
          h('p', { className: 'eyebrow' }, 'A CONTROLLED FAILURE'),
          h('h1', null, 'Errors happen.', h('br'), h('em', null, 'Handle them well.')),
          h('p', { className: 'hero-copy' }, 'Trigger a simulated application error and see how an Error Boundary can present it without losing the whole page.'),
          h('button', { className: 'trigger-button', type: 'button', onClick: occurError },
            h('span', null, 'Trigger error'),
            h('span', { className: 'button-arrow', 'aria-hidden': 'true' }, '↗')
          )
        ),
        h('footer', { className: 'page-footer' },
          h('span', null, 'ERROR BOUNDARY DEMO'),
          h('span', null, 'RENDER SAFELY · RECOVER CLEARLY')
        )
      )
    );
  }
}