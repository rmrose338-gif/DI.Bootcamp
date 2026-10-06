import React from 'react';

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      loaded: false,
    };
  }

  componentDidMount() {
    fetch('/api/customers')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ customers: data, loaded: true });
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }

  render() {
    const { customers, loaded } = this.state;

    if (!loaded) {
      return <div className="loading">Loading...</div>;
    }

    return (
      <ul className="customer-list">
        {customers.map((customer) => (
          <li key={customer.id} className="customer-item">
            <h3>
              {customer.firstName} {customer.lastName}
            </h3>
          </li>
        ))}
      </ul>
    );
  }
}

export default Customers;
