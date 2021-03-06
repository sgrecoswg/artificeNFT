import React, { Component, useState } from 'react';
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
import ArtistsEdit from './components/artists/ArtistsEdit';

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
         <UserContext.Provider value={this.state.context || {}}>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route exact path='/artists' render={(props) => <ArtistsList {...props} />} />
                <Route path='/artists/create' render={(props) => <ArtistCreate {...props} />} />
                <Route exact path='/artist/:id' render={(props) => <ArtistDetails {...props} />} />
                <Route exact path='/artist/edit/:id' render={(props) => <ArtistsEdit {...props} />} />               
            </Layout>
         </UserContext.Provider>     
    );
  }
}