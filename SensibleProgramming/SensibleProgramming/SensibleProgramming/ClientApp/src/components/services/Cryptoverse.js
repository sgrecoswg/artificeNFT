import React, { Component } from 'react';

export class Cryptoverse extends Component {
    static displayName = Cryptoverse.name;

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
            <h1>Cryptoverse services</h1>

        <p>Thinking about exploring all teh wonders of the cryptoverse? We can help! From NFTs to creating your own crypto currency.</p>

        
      </div>
    );
  }
}
