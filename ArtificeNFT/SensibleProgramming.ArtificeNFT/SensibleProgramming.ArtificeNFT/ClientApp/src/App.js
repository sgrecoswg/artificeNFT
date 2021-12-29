import React, { Component } from 'react';
import { Route } from 'react-router';
import { UserContext } from './UserContext';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import  ArtistHomePage  from './components/artists/ArtistHomePage';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: false
        };
    }

  render () {
      return (
          <UserContext.Provider value={this.state.user || {}}>
              <Layout>
                  <Route exact path='/' component={Home} />
                  <Route path='/counter' component={Counter} />
                  <Route path='/fetch-data' component={FetchData} />                 
                  <Route path='/artist/:id' render={(props) => <ArtistHomePage {...props}/>} />
              </Layout>
          </UserContext.Provider>
     
    );
  }
}
