import React, { Component } from 'react';

class Subscriptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    }
  }

  onChangeInput = event => {
    this.setState({
      email: event.target.value
    });
  }

  saveSubscription = email => {
    const URL = 'http://localhost:3004/subcriptions';

    fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    })
    .then(res => res.json())
    .then(() => {
      this.setState({
        email: ''
      })
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    let email = this.state.email;

    // validate email
    const regex = /\S+@\S+\.\S+/;

    if (regex.test(email)) {
      this.saveSubscription(email);
    } else {

    }
  }

  render() {
    return (
        <div className="subscribe-panel">
          <h3>Subscribe to us</h3>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="youremail@email.com"
                value={this.state.email}
                onChange={this.onChangeInput}
                />
            </form>
            <small>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout
            </small>
          </div>
        </div>
    );
  }
}

export default Subscriptions;
