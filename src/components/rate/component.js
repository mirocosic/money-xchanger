import React, { Component } from "react"
import PropTypes from "prop-types"
import { formatCurrency } from "../../util"

const style = {
  position: "absolute",
  backgroundColor: "white",
  borderRadius: 100,
  border: "solid 1px gray",
  fontSize: 12,
  padding: "5px 10px",
  top:-15,
  margin: "auto",
  left: 0,
  right: 0,
  height: "18px",
  width: "120px"
}

export default class Rate extends Component {
  render(){
    const { primaryCurrency, secondaryCurrency, accounts, rates } = this.props
    return(
      <div style={style}>
        {`1 ${accounts[primaryCurrency].symbol} = ${formatCurrency(rates[secondaryCurrency])} ${accounts[secondaryCurrency].symbol}`}
      </div>
    )
  }
}

Rate.propTypes = {
  rates: PropTypes.object,
  primaryCurrency: PropTypes.string,
  secondaryCurrency: PropTypes.string,
  accounts: PropTypes.object,
}
