import React, { Component, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const createRecipyClicked = () => {
  alert('Button clicked!')
}

function App() {

  const [recipies, setRecipies] = useState([]);

  useEffect(() => {   
    let mounted = true;

    axios.get('/api/recipy').then(res => {
      if (mounted) {
        setRecipies(res.data);
      }
    }).catch(err => {
      console.error(err);
    }); 

    return () => {mounted = false;};
  }, []);

  return (
    <>
      <h1>Recipy</h1>
      <ul>
        {
          recipies.map((item: any) => (
            <li key={item.id}>
              <span>{item.id} - {item.title}</span>
            </li>
          ))
        }
      </ul>
      <button onClick={createRecipyClicked}>Create Recipy</button>
    </>
  );

}

export default App;
