import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props) {
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

  renderItems = () => {
    console.log('RENDER:', this.recipies);
    return this.state.recipies.map((item) => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className={`recipy-title mr-2`}>
          {item.title}
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Recipy</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;