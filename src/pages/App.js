import React, { Component } from 'react';
import '@assets/css/app.less';
import Home from './home/Home';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;

