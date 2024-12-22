import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Corrected the typo
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signout from './pages/Signup';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter> {/* Corrected component name */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
