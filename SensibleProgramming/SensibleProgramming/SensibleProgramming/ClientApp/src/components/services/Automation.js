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
        <h1>automation services</h1>

        <p>Still thinking about it.</p>

        
      </div>
    );
  }
}
