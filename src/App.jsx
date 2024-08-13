
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar';
import News from './Components/News';
import WeatherForm from './Components/WeatherForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News/>} />
          <Route exact path="/weather" element={<WeatherForm/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
