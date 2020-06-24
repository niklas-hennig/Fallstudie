import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContentWrapper from './contentWrapper';
import About from './staticPages/about';
import Impressum from './staticPages/impressum';
import Datenschutz from './staticPages/datenschutz';
import NotFound from './staticPages/notFound';

class App extends Component {
  componentDidMount(){
    document.title = "Freelane - Die Projektvermittlung"
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={ContentWrapper} />
            <Route path="/about" component={About} />
            <Route path="/impressum" component={Impressum} />
            <Route path="/datenschutz" component={Datenschutz} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;