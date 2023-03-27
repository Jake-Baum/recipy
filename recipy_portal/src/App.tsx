import React, { Component, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import RecipiesList from './components/RecipiesList';
import RecipyForm from './components/forms/RecipyForm';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RecipiesList />} />
        <Route path="/recipy/create" element={<RecipyForm />} />
      </Routes>
    </>
  );
}

export default App;
