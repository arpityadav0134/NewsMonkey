import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 6
  const apikey = process.env.REACT_APP_NEWS_API_KEY2
  const [progress, setProgress] = useState(0)
  // state = {
  //   progress: 0
  // }
  // setProgress = (progress) => {
  //   this.setState({ progress: progress })
  // }
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar color='#f11946' progress={progress} height={4} />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey} key='general' country='in' pageSize={pageSize} category='general' />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey} key='business' country='in' pageSize={pageSize} category='business' />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key='entertainment' country='in' pageSize={pageSize} category='entertainment' />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} key='health' country='in' pageSize={pageSize} category='health' />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} key='science' country='in' pageSize={pageSize} category='science' />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} key='technology' country='in' pageSize={pageSize} category='technology' />} />
        </Routes>
      </Router>
    </div>
  )
}


export default App