import React, { Component } from 'react';
import { Card, Carousel, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
//import  AddOnList from "../../common/AddOnList";

export class CryptoverseServices extends Component {
    static displayName = CryptoverseServices.name;


  constructor(props) {
    super(props);
    //this.state = { currentaddons: [] };
    }

    //setAddOns(x) {
    //    console.log(x);
    //    this.setState({
    //        currentaddons: x
    //    });
    //}
    /*
     *  <AddOnList
                label="addme"
                update={e => this.setAddOns(e)}
                value={this.state.currentaddons}
                readonly={false}
            ></AddOnList>*/


  render() {
    return (
      <div>
            <h1>Available Services</h1>
          

            <ul className="list-inline">
                <li>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/bg-crypto.jpg"} />
                        <Card.Body>
                            <Card.Title>NFT</Card.Title>
                            <Card.Text>
                                Create the next great NFT.
                            </Card.Text>
                            <Link to="/services/crypto/nft">
                                <Button variant="dark">Start creating</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </li>
                <li>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/bg-web.jpg"} />
                        <Card.Body>
                            <Card.Title>Smart contracts</Card.Title>
                            <Card.Text> 
                                Start taking advantage of decentralized, trustless contracts.
                            </Card.Text>
                            <Link to="/services/web">
                                <Button variant="dark">contact us</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </li>                
            </ul>
      </div>
    );
  }
}
