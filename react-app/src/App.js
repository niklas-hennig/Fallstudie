import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ThemeProvider} from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import ContentWrapper from './contentWrapper';
import About from './staticPages/about';
import Impressum from './staticPages/impressum';
import Datenschutz from './staticPages/datenschutz';
import NotFound from './staticPages/notFound';

import '../src/style.css'

class App extends Component {
  constructor(props){
    super(props)
    this.theme=createMuiTheme({
      palette: {
        primary: {main: "#344955"},
        secondary: {main: "#f9aa33"},
        error: {main: "#b00020"},
        action: {main: "#FAFA6f"},
      },
      typography: {
        h5: {
          color: "#f9aa33",
          fontWeight: "bold"
        },
        subtitle1: {
          color: "#344955",
          fontWeight: "bolder"
        },
        caption: {
          color: "#344955"
        }
      }
    })
  }

  componentDidMount(){
    document.title = "Freelane - Die Projektvermittlung"
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <React.Fragment>
          <Router>
            <Switch>
              <Route exact path="/" component={ContentWrapper} />
              <Route path="/about.html" component={About} />
              <Route path="/impressum.html" component={Impressum} />
              <Route path="/datenschutz.html" component={Datenschutz} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default App;