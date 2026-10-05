import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('A child component crashed:', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="crash-state" role="alert">
          <strong>Something went wrong.</strong>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}