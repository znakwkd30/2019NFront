import React from 'react';
import {
  Route, BrowserRouter as Router, Switch
} from 'react-router-dom';
import Main from './Main/Main';
import Account from './Account/Account';
import Login from './Login/Login';
import Chat from './Socket/SocketFront';
import Profile from './Profile/Profile';
import Search from './Search/Search';
import Product from './Product/Product'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Main}/>
      <Route path="/register" component={Account}/>
      <Route path="/login" component={Login}/>
      <Route path="/chat" component={Chat}/>
      <Route path="/profile" component={Profile}/>
      <Switch>
        <Route path="/search/:name" component={Search}/>
        <Route path="/hashtag/:hashtag" component={Search}/>
      </Switch>
      <Route path="/product" component={Product}/>
    </Router>
  );
}

export default App;
