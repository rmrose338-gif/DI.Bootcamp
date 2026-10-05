import React, { Component } from 'react';
import Modal from './Modal.js';

const h = React.createElement;

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
    this.props.onCatch?.(errorInfo);
  }

  occurError = () => {
    const error = new Error('The requested action could not be completed.');
    const errorInfo = { componentStack: 'Simulated error triggered by the button.' };
    this.setState({ hasError: true, error, errorInfo });
    this.props.onCatch?.(errorInfo);
  };

  closeModal = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    this.props.onCatch?.(null);
  };

  render() {
    if (this.state.hasError) {
      return h(Modal, {
        message: this.state.error?.message || 'Something went wrong.',
        errorInfo: this.state.errorInfo,
        onClose: this.closeModal,
      });
    }

    if (typeof this.props.children === 'function') {
      return this.props.children(this.occurError);
    }

    return this.props.children;
  }
}