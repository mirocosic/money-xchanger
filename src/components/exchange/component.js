import React, { Component } from "react"
import PropTypes from "prop-types"
import Rate from "../rate"
import Input from "../input"
import SelectAccount from "../select-account"
import { checkExchangeable } from "../../util"
import './styles.css'

export default class Exchange extends Component {

  render(){

    const { accounts, primaryAmount, secondaryAmount, primaryCurrency,
            switchAccounts, exchange } = this.props
    const isExchangeable = checkExchangeable(primaryAmount, accounts[primaryCurrency].balance)
    const error = primaryAmount > 0 && !isExchangeable ? {color: "red"} : {color: "black"}
    const disabledButtonStyle = !isExchangeable ? {backgroundColor: "gray",color: "black"} : {}

    return(
      <div>
        <h3>Exchange</h3>

        <div className="wrap" style={{backgroundColor: "white"}}>
          <SelectAccount type="primary" errorStyle={error}/>
          <Input type="primary" amount={primaryAmount}/>
        </div>

        <div className="wrap" style={{backgroundColor: "lightGray"}}>
          <div className="switch" onClick={switchAccounts}>🔁</div>
          <Rate />
          <SelectAccount type="secondary"/>
          <Input type="secondary" amount={secondaryAmount}/>
        </div>

        <button className="button" style={disabledButtonStyle} disabled={!isExchangeable} onClick={exchange}>
          Exchange
        </button>

      </div>
    )
  }
}


Exchange.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary"]),
  primaryCurrency: PropTypes.string,
  primaryAmount: PropTypes.string,
  secondaryAmount: PropTypes.string,
  accounts: PropTypes.object,
  exchange: PropTypes.func,
  switchAccounts: PropTypes.func,
}
