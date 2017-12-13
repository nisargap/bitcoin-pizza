// Author: Nisarga Patel
import React, { Component } from 'react';
import btclogo from "./btclogo.png";
import pizza from "./pizza.png";
import heart from "./heart.png";
import './App.css';

// Print a number with commas function taken from stackoverflow
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amtBTC: 0,
      amtPizzas: 0,
      showResult: false
    }
  }
  changeAmt = (evt) => {
    this.setState({
      showResult: false,
      amtBTC: evt.target.value
    })
  }
  convertPizza = async (evt) => {
    evt.preventDefault();
    let response = await fetch(
      'https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=USD'
    );
    let responseJson = await response.json();
    let bitcoinData = responseJson[0];
    let amtPizzas = (this.state.amtBTC * bitcoinData.price_usd) / 13.21;
    amtPizzas = Math.floor(amtPizzas);
    this.setState({
      amtPizzas: amtPizzas,
      showResult: true
    })
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1 className="App-header">
          <img src={btclogo} className="header-image" alt="btclogo" /> to <img src={pizza} className="header-image" alt="pizza" /> Converter</h1>
        </header>
        <section>
          <div className="container">
            <h1>Enter the amount of Bitcoin you'd like to convert</h1>
            <form onSubmit={this.convertPizza}>
            <input type="number" onChange={this.changeAmt} className="input-style" placeholder="Amount" />
            <br />
            <button type="submit" onClick={this.convertPizza} className="btn red">Convert Bitcoin to Pizza</button>
            </form>
            {this.state.showResult ? (
             <h1>{this.state.amtBTC} <img src={btclogo} className="header-image" /> is equal to <span style={{ color: "red" }}>{numberWithCommas(this.state.amtPizzas)}</span> <img src={pizza} className="header-image" />  priced at an average <span style={{ color: "green" }}>$13.21</span> per pie </h1>
            ) : ""}
          </div>
          <h3>Send some <img src={heart} style={{ width: "1.1em" }} alt="heart" /> to 1Fn5mSE6dgaxdTFuqw39opYyy5q654zY1z</h3>
        </section>

      </div>
    );
  }
}

export default App;
