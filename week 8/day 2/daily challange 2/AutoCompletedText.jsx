import React from 'react';
import { countries } from './countries.js';

class AutoCompletedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: '',
    };
  }

  onTextChanged = (event) => {
    const value = event.target.value;

    let suggestions = [];
    if (value.length > 0) {
      suggestions = countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      );
    }

    this.setState({ suggestions, text: value });
  };

  suggestionSelected = (country) => {
    this.setState({
      text: country,
      suggestions: [],
    });
  };

  renderSuggestions() {
    const { suggestions } = this.state;

    if (!suggestions.length) return null;

    return (
      <ul className="suggestions">
        {suggestions.map((country, index) => (
          <li
            key={index}
            className="suggestion-item"
            onClick={() => this.suggestionSelected(country)}
          >
            {country}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { text } = this.state;

    return (
      <div className="search-box">
        <input
          type="text"
          value={text}
          onChange={this.onTextChanged}
          className="search-input"
          placeholder="Type a country name..."
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default AutoCompletedText;
