import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { subscribeToTimer } from './api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: 'no timestamp yet'
    };
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">This is the timer value: {this.state.timestamp}</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
