import React, { Component } from 'react';
import { Card, Carousel, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


export class Services extends Component {
    static displayName = Services.name;

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
        <h1>Available Services</h1>

            <ul className="list-inline">
                <li>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/bg-crypto.jpg"} />
                        <Card.Body>
                            <Card.Title>Cryptoverse</Card.Title>
                            <Card.Text>
                                Enter the cryptoverse with these crypto related services.
                            </Card.Text>
                            <Link to="/services/crypto/home">
                                <Button variant="dark">Enter the cryptoverse</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </li>
                <li>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/bg-web.jpg"} />
                        <Card.Body>
                            <Card.Title>Web</Card.Title>
                            <Card.Text>
                                Establish your presense on the world wide web
                            </Card.Text>
                            <Link to="/services/web">
                                <Button variant="dark">Enter the web</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </li>
                <li>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/bg-automation.jpg"} />
                        <Card.Body>
                            <Card.Title>Automation</Card.Title>
                            <Card.Text>
                                Reduce common tasks so you can do the work you actually love.
                            </Card.Text>
                            <Link to="/services/automation">
                                <Button variant="dark">Automate</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </li>
            </ul>
      </div>
    );
  }
}
