import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App';
import Login from './Login';

const routing = (
  <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/App/:id" element={<App/>} />
      </Routes>
  </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));