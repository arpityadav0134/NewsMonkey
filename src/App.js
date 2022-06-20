import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 15
  apikey = process.env.REACT_APP_NEWS_API_KEY
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color='#f11946' progress={this.state.progress} height={5} />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key='general' country='in' pageSize={this.pageSize} category='general' />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key='business' country='in' pageSize={this.pageSize} category='business' />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key='entertainment' country='in' pageSize={this.pageSize} category='entertainment' />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key='health' country='in' pageSize={this.pageSize} category='health' />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key='science' country='in' pageSize={this.pageSize} category='science' />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key='technology' country='in' pageSize={this.pageSize} category='technology' />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
