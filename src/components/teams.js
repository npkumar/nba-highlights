import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

const URL = 'http://localhost:3004/teams';

const fadeAnimation = {
  transitionName: 'fade',
  transitionAppear: true,
  transitionLeave: true,
  transitionEnter: true,
  transitionAppearTimeout: 500,
  transitionEnterTimeout: 500,
  transitionLeaveTimeout: 500
};

class Teams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      filtered: [],
      keyword: ''
    }
  }

  componentDidMount() {
    fetch(URL, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        teams: json,
        filtered: json
      });
    });
  }

  renderList = ({ filtered }) => {
    return filtered.map(item => {
      return (
        <Link to={`/team/${item.name}`} key={item.id} className="team-item">
          <img alt={item.name} src={`images/teams/${item.logo}`} />
        </Link>
      )
    })
  }

  render() {
    return (
      <div className="teams-component">
        <div className="teams-input">
          <input
            type="text"
            placeholder="Search for a team"
            />
        </div>
        <div className="teams-container">
          <CSSTransitionGroup {...fadeAnimation}>
            { this.renderList(this.state)}
          </CSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default Teams;