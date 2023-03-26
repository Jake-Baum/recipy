import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

type AppProps = {

}

type AppState = {
  recipies: any[]
}

class App extends Component<AppProps, AppState> {

  constructor(props: any) {
    super(props);

    this.state = {
      recipies: []
    };
  }

  componentDidMount() {
    axios.get('/api/recipy').then(res => {
      this.setState({ recipies: res.data });
    }).catch(err => {
      console.error(err);
    });
  }

  recipiesList = () => {
    return this.state.recipies.map((item) => (
      <li key={item.id}>
        <span>{item.id} - {item.title}</span>
      </li>
    ));
  };

  render() {
    return (
      <>
        <h1>Recipy</h1>
        <ul className="list-group list-group-flush border-top-0">
          {this.recipiesList()}
        </ul>
      </>
    );
  }
}

export default App;
