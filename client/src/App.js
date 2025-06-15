import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Home from './pages/home';
import Browse from './pages/browse';
import NoPage from './pages/nopage';
import Admin from './pages/admin';
import Movie from './pages/movie';
import Watch from './pages/watch';
import Room from './pages/room';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
        <Route index element={<Login />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="browse" element={<Browse />}></Route>
        <Route path="*" element={<NoPage />} />
        <Route path='admin' element={<Admin/>}></Route>
        <Route path='movie/:moviename' element={<Movie/>}></Route>
        <Route path='watch/:moviename' element={<Watch/>}></Route>
        <Route path='room/:roomid' element={<Room/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}