import React, { Component } from 'react'
import MessageList from './components/MessageList'
import Tabs from './components/Tabs'

import './App.css';

const stylesheetPath = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <link rel="stylesheet" href={stylesheetPath} integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
        </header>
        <Tabs />
      </div>
    )
  }
}

export default App;
