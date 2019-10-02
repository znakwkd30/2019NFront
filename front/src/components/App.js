import React from 'react';
import {
  Route, BrowserRouter as Router
} from 'react-router-dom';
import Main from './Main/Main';
import Account from './Account/Account';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Main}/>
      <Route path="/signin" component={Account}/>
    </Router>
  );
}

export default App;
