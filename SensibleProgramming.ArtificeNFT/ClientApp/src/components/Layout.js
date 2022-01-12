import React, { Component, useContext } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

    constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {         
            loading: false
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

  render () {
    return (
      <div>            
        <NavMenu />
        <Container>
            {this.props.children}
        </Container>           
      </div>
    );
  }
}
