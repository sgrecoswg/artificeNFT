import React, { Component } from 'react';

export class About extends Component {
    static displayName = About.name;

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
        <h1>About Us</h1>

        <p>Building solutions for your business needs is our passion. We can help you discover your companies true potential.</p>
        <p>Building form scratch is our specialty, turning your idea into reality in a step by step approach allows us to scale our prices to only get what you need.</p>
      </div>
    );
  }
}
