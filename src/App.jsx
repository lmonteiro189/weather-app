import React from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Weather />
    </div>
  );
}

export default App;
