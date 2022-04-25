import React, { Component } from 'react';
import { Card, Carousel, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
//import  AddOnList from "../../common/AddOnList";

export class NFTServices extends Component {
    static displayName = NFTServices.name;


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
                <h1>NFT Services</h1>


               <p>Creating the next great NFT smart contract system can seem overwhelming at times. We can help you create your collections and even help you create your own self service model.</p>
            </div>
        );
    }
}
