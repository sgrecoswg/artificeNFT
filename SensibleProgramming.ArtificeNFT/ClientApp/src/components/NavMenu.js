import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import ConnectToWalletButton from './common/ConnectToWalletButton';


export class NavMenu extends Component {
  static displayName = NavMenu.name;
   

  constructor (props) {
    super(props);
    this.state = {
        collapsed: true
    };
  }

  

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Artifice NFT</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/artists">Artists</NavLink>
                </NavItem>
                <NavItem>
                   <ConnectToWalletButton />
                </NavItem>               
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
