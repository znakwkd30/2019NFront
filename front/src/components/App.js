import React from 'react';
import {
  Route, BrowserRouter as Router
} from 'react-router-dom';
import Main from './Main/Main';
import Account from './Account/Account';
import Login from './Login/Login';
import Chat from './Socket/SocketFront';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Main}/>
      <Route path="/register" component={Account}/>
      <Route path="/login" component={Login}/>
      <Route path="/chat" component={Chat}/>
    </Router>
  );
}

export default App;
