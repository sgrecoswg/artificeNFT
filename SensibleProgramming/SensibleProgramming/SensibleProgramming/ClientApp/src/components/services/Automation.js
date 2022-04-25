import React, { Component } from 'react';

export class Automation extends Component {
    static displayName = Automation.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <h1>Automation services</h1>

        <p>Work smarter, not harder. Can automating common tasks help you get back to doing he things you love? Call us and we can see what would work best for you.</p>

        
      </div>
    );
  }
}
