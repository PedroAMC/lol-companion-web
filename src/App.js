import './App.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { useEffect} from 'react';
import {searchSummoner} from "./requests.js"
import Profile from './Profile';
import {BrowserRouter as Router, Route, Routes, Link, Redirect} from "react-router-dom"
import Home from './Home';
import Match from './Match';



// to update gh-pages ---> npm run deploy


function App() {
  
  return (
   <div className='app'>
    <Router basename="/lol-companion-web/">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/match/:name/:region" element={<Match/>}/>
        <Route path="/profile/:name/:region" element={<Profile/>}/>
      </Routes>
    </Router>
    

   </div>
  
  );
}

export default App;
