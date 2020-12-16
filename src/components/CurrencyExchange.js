import React, { Component } from 'react';
  
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
       
        // convertedAmount: "",
        // currencies: [],
        // base: "",
        // rates: "",

      };
    }
 
   componentDidMount () {
        fetch(`https://api.exchangeratesapi.io/latest?`)

            .then(res => res.json())
            .then(result => {
                console.log(result);
                this.setState(
                    {
                        data: result,
                        currencies: Object.keys(result['rates']).sort(),
                        rates: Object.values(result.rates),
                        isLoaded: true
                        // baseCurrency: "",
                        // finalCurrency: "",
                        // amountToConvert: "",
                        // convertedAmount: "",
                    }, 
                    // () => fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=CAN&apikey=KPFRBODQGCDMGD3E`)
                    // () =>  fetch(`http://data.fixer.io/api/symbols?access_key=f55714fc68544efcf79c477eded056a2`)
                    // .then(res => res.json())
                    // .then(result => {
                    //     console.log(result);
                    //     this.setState(
                    //         {
                    //             data2: result,
                    //             isLoaded: true
                    //         }
                    //     )   
                    // })
                )
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
        <section id="exchange-section">
        {this.state.isLoaded ? 
            <section id="converter">

                    <div className="single-currency">
                        <h2 className="label_currency">Convert from:</h2>
                        <select  value={this.state.baseCurrency} onChange={this.handleSelectBaseCurrency} className="drop-menu">
                            <option key="EURO" value="1">EUR : Euro</option>

                            {Object.keys(this.state.data.rates).map((currency, key)=>
                            <option key={key} value={this.state.data.rates[currency]}> 
                            {currency} : 
                            
                            {/* {this.state.data2.symbols[currency]} */}
                            </option>  )};
                        </select> 
                

                        <h2 className="label_currency">Convert to:</h2>
                     
                        <select  value={this.state.finalCurrency} onChange={this.handleSelectFinalCurrency} className="drop-menu">
                            <option key="EUR" value="1">EUR : Euro</option>
                            {Object.keys(this.state.data.rates).map((currency, key)=>
                            <option key={key} value={this.state.data.rates[currency]}> 
                            {currency} : 
                            {/* {this.state.data2.symbols[currency]}  */}
                            </option>  )};
                        </select>
                    </div> 
                    
                {/* </div> */}
                
           
                {/* <section className="amounts"> */}
                    <div className="single-amount">
                        <h2>Amount:</h2>
                        <input type="number" name="amountToConvert" value={this.state.amountToConvert} onChange={this.getAmount} className="input-amount">
                        </input>  
                    </div>     

                    <div className="single-amount">
                        <h2>Amount:</h2>
                        <input type="number" name="amountInverseToConvert" value={this.state.amountInverseToConvert} onChange={this.getAmount} className="input-amount"/> 
                    </div>

                {/* </section> */}
                </section>
                : "Loading"}
            </section>
           
      );
  }
}
  
 
export default CurrencyExchange;