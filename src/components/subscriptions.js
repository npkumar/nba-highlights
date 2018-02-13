import React, { Component } from 'react';

class Subscriptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: false,
      success: false
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
        email: '',
        success: true
      })
    })
  }

  clearMessages = () => {
    setTimeout(function() {
      this.setState({
        error: false,
        success: false
      });
    }.bind(this), 3000); // funky, just use an arrow func!
  }

  handleSubmit = event => {
    event.preventDefault();
    let email = this.state.email;

    // validate email
    const regex = /\S+@\S+\.\S+/;

    if (regex.test(email)) {
      this.saveSubscription(email);
    } else {
      this.setState({
        error: true
      });
    }

    // clear messages
    this.clearMessages();
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
                <div className={this.state.error ? "error show": "error"}>Check your email</div>
                <div className={this.state.success ? "success show": "success"}>Subscribed!</div>
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
