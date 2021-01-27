import React, { Component } from 'react';
const currencyNames = require('../currencyNames.json')
  
class CurrencyExchange extends Component {
    constructor() {
      super();
      this.state = {
        isLoaded: false,
        rates: [],
        data: [],
        amountToConvert: "",
        baseCurrency: 1,
        finalCurrency: 1,
        data2: "",
        currencyNames
      };
    }
 
   componentDidMount () {
        fetch(`https://api.exchangeratesapi.io/latest?`)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                this.setState({
                        data: result,
                        currencies: Object.keys(result['rates']).sort(),
                        rates: Object.values(result.rates),
                        isLoaded: true
                })
            })
    }

    handleSelectBaseCurrency = (e) => {
        this.setState({ 
            baseCurrency: e.target.value}
        )}

    handleSelectFinalCurrency = (e) => {
        this.setState({
            finalCurrency: e.target.value,
        }
        );
    }  
   
    getAmount = (event) => {
        this.setState({
            [event.target.name]: event.target.value,

        },() => {
            if (event.target.name === "amountToConvert") {
                this.convertAmount('amountToConvert')
            } else if (event.target.name === "amountInverseToConvert") {
                this.convertAmount('amountInverseToConvert')
            }
        })
    }

    convertAmount =(para) => {
        console.log(this.state.finalCurrency)

        if (para === "amountToConvert") {
            this.setState({ amountInverseToConvert: (((1 / this.state.baseCurrency) * this.state.finalCurrency) * this.state.amountToConvert).toFixed(4) });
        } else if (para === "amountInverseToConvert") {
            this.setState({ amountToConvert: (((1 / this.state.finalCurrency) * this.state.baseCurrency) * this.state.amountInverseToConvert).toFixed(4) });
        }
    }
         
  
    render() {
        return(
            <div className="forex-wrap">
                <h2 className="forex-title">Currency Converter</h2>
                <p className="forex-byline">Use the tool below to convert any currency fast.</p>
                    <section id="exchange-section">
                        {this.state.isLoaded ? 
                            <section id="converter">
                                <div className="convert">
                                    <h2 className="convert_h2">Convert from:</h2>
                                    <select value={this.state.baseCurrency} onChange={this.handleSelectBaseCurrency} className="convert-drop_menu">
                                        <option key="EURO" value="1" className="option">EUR : Euro</option>

                                        {Object.keys(this.state.data.rates).map((currency, key)=>
                                            <option key={key} value={this.state.data.rates[currency]}> 
                                            {currency} : {this.state.currencyNames.map(element => {
                                                // console.log(element.symbol === currency)
                                                if (element.symbol === currency) {
                                                    return element.currency_name
                                                } 
                                            })
                                        }
                                        </option>  )};
                                    </select> 
                                    <div className="convert-amount">
                                        <h2 className="amount_h2">Amount:</h2>
                                        <input type="number" name="amountToConvert" value={this.state.amountToConvert} onChange={this.getAmount} className="input-amount">
                                        </input>  
                                    </div> 
                                </div>    
                                <div className="arrows">
                                    <img src="./arrows-blue-versetzt.png" alt="" className="convert_arrows"/>
                                </div>
                                
                                <div className="convert">
                                    <h2 className="convert_h2">Convert to:</h2>
                                
                                    <select  value={this.state.finalCurrency} onChange={this.handleSelectFinalCurrency} className="convert-drop_menu">
                                        <option key="EUR" value="1" className="option">EUR : Euro</option >
                                        {Object.keys(this.state.data.rates).map((currency, key)=>
                                            <option key={key} value={this.state.data.rates[currency]}> 
                                                {currency} : {this.state.currencyNames.map(element => {
                                                    // console.log(element.symbol === currency)
                                                    if (element.symbol === currency) {
                                                        return element.currency_name
                                                    } 
                                                })
                                                }
                                        </option>  )};
                                    </select>
                                    <div className="convert-amount">
                                        <h2 className="amount_h2">Amount:</h2>
                                        <input type="number" name="amountInverseToConvert" value={this.state.amountInverseToConvert} onChange={this.getAmount} className="input-amount"/> 
                                    </div>
                                </div> 
                        
                            </section>
                        : "Loading"}
                    </section>
            </div>  
        );
    }
}
  
export default CurrencyExchange;