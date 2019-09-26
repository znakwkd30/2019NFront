import React from 'react';
import {
  Route, BrowserRouter as Router
} from 'react-router-dom';
import Main from './Main/Main';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Main}/>
    </Router>
  );
}

export default App;
