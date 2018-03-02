import React from 'react';
import ReactDOM from 'react-dom';
import {  HashRouter, Route } from 'react-router-dom';
import Home from './components/home.js';
import Stylelist from './components/stylelist.js';
import Bookinfo from './components/bookinfo.js';
import Reading from './components/reading.js';
import './App.css';
import { CookiesProvider } from 'react-cookie';

export default class App extends React.Component {
  render() {
    return (
      <div className="index">
        {this.props.children}
      </div>
    );
  }
};

ReactDOM.render(
  (<HashRouter>
    <CookiesProvider>
      <App>        
          <Route exact path="/" component={Home} />
          <Route path="/stylelist/:type" component={Stylelist} />
          <Route path="/styletobookinfo/:typeid/:bookid" component={Bookinfo} />
          <Route path="/bookinfo/:bookid" component={Bookinfo} />
          <Route path="/reading/:bookid" component={Reading} />
      </App>
    </CookiesProvider>
  </HashRouter>),
  document.getElementById('root')
);