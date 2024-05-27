import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FixedRange from './components/FixedRange/FixedRange';
import MinMaxRange from './components/MinMaxRange/MinMaxRange';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/exercise1" element={<MinMaxRange />} />
        <Route path="/exercise2" element={<FixedRange />} />
      </Routes>
    </Router>
  );
}

export default App;
