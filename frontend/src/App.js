import React from 'react';
import ContactApp from './components/ContactApp';

import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

class App extends React.Component {

  render() { 
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" component={ContactApp}/>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;