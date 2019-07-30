import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sites from './Sites'

class App extends React.Component{

  state = {
    sites: []
  }


  componentDidMount() {
    fetch('https://api.mercadolibre.com/sites')
        .then(res => res.json())
        .then((data) => {
          this.setState({
            sites:data
          })
        })
        .catch(console.log("error"))
  }

  render() {
    return (
        <Sites sites={this.state.sites}></Sites>
    );
  }
}

export default App;
