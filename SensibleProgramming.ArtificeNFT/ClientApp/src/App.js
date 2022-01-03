import React, { Component } from 'react';
//import { Route } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import ArtistDetails from './components/artists/ArtistDetails';
import ArtistsList from './components/artists/ArtistsList';
import ArtistCreate from './components/artists/ArtistCreate';

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

                  <Route exact path='/artists' render={(props) => <ArtistsList {...props} />} />
                  <Route path='/artists/join' render={(props) => <ArtistCreate {...props} />} />
                  <Route exact path='/artist/:id' render={(props) => <ArtistDetails {...props} />} />
                 
              </Layout>
          </UserContext.Provider>
     
    );
  }
}

              /*
               


 <BrowserRouter>
                      <Switch>
                          <Route exact path="/">
                              <Home />
                          </Route>
                          <Route exact path="/artists">
                              <ArtistsList />
                          </Route>
                          <Route path="/artists/join">
                              <ArtistCreate />
                          </Route>
                          <Route path="/artist/:id">
                              <ArtistDetails />
                          </Route>

                      </Switch>
                  </BrowserRouter>
              */
