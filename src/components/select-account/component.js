import React, { Component } from "react"
import PropTypes from "prop-types"
import "./styles.css"

export default class SelectAccount extends Component {

  state = {
    amountSelectorVisible: false,
  }

  toggleAccountSelector = () => {
      this.setState({amountSelectorVisible: !this.state.amountSelectorVisible})
  }

  render(){
    const { type, primaryCurrency, secondaryCurrency, accounts, errorStyle, currencies, selectAccount } = this.props
    const currency = type === "primary" ? primaryCurrency : secondaryCurrency

    return(
      <div>
        <div className="accountSelector" onClick={()=>this.toggleAccountSelector(type)}>
          { `${currency} `}
          <span style={{fontSize: 14, marginLeft: "10px"}}>🔽</span>
        </div>
        <div className={`selectAccountContainer ${this.state.amountSelectorVisible && "visible"}`}>
          {currencies.map((currency, idx)=>{
            return(
              <div key={idx} className="currency" onClick={()=>{this.toggleAccountSelector(); selectAccount(type, currency)}}>{currency}</div>
            )
          })}
        </div>
        <div className="balance" style={errorStyle}>
          Balance: {parseFloat(accounts[currency].balance).toFixed(2)} {accounts[currency].symbol}
        </div>
      </div>
    )
  }
}


SelectAccount.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary"]),
  errorStyle: PropTypes.object,
  primaryCurrency: PropTypes.string,
  secondaryCurrency: PropTypes.string,
  accounts: PropTypes.object,
  currencies: PropTypes.array,
  selectAccount: PropTypes.func,
}
