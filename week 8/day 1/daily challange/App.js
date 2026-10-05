import React from 'react';
import FormComponent from './FormComponent.jsx';

const initialFormData = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  destination: '',
  lactoseFree: '',
  nutsFree: '',
  vegan: '',
};

export default class App extends React.Component {
  state = { formData: initialFormData };

  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox'
      ? (target.checked ? target.value : '')
      : target.value;

    this.setState(({ formData }) => ({
      formData: { ...formData, [target.name]: value },
    }));
  };

  render() {
    return React.createElement(FormComponent, {
      formData: this.state.formData,
      handleChange: this.handleChange,
    });
  }
}