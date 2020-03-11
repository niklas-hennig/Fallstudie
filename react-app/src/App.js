import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  componentDidMount(){
    console.log("cpdm");
    console.log(axios.get('http://localhost:3001/api/getData')
    .then((data) => console.log(data.data)));
  }


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    console.log(axios.get('http://localhost:3001/api/getData'));
    return (
      <div>
        <p>Console Output from Back-end Api</p>            
      </div>
    );
  }
}

export default App;