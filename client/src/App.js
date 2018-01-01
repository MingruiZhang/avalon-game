import React, { Component } from 'react';
import io from 'socket.io-client';

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

const socket = process.env.NODE_ENV && process.env.NODE_ENV === 'development' ? io('http://localhost:3001') : io();

class App extends Component {
  state = { timestamp: 'no timestamp yet' };

  constructor(props) {
    super(props);
    this.subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
  }

  subscribeToTimer = cb => {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
  };

  render() {
    return (
      <div>
        <div>Current env is {process.env.NODE_ENV} </div>
        <div className="App">
          <p className="App-intro">This is the timer value: {this.state.timestamp}</p>
        </div>
      </div>
    );
  }
}

export default App;
