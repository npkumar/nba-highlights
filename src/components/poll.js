import React, { Component } from 'react';

const URL = 'http://localhost:3004/teams';

class Poll extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pollTeams: []
    }
  }

  fetchPoll() {
    fetch(`${URL}?poll=true&_sort=count&_order=desc`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        pollTeams: json
      })
    })
  }

  componentDidMount() {
    this.fetchPoll()
  }

  addCount(count, id) {
    fetch(`${URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ count: count + 1 })
    })
    .then(() => {
      this.fetchPoll();
    })
  }

  renderPoll() {
    const positions = ['1ST', '2ND', '3RD'];
    return this.state.pollTeams.map((team, index) => {
      return (
        <div key={team.id} className="poll-item" onClick={() => this.addCount(team.count, team.id)}>
          <img alt={team.name} src={`/images/teams/${team.logo}`} />
          <h4>{positions[index]}</h4>
          <div>{team.count} Votes</div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="home-poll">
        <h3>Who will be the next champion?</h3>
        <div className="poll-container">
          {this.renderPoll()}
        </div>
      </div>
    )
  }
}

export default Poll;