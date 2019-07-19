import React, { Component } from "react"
import PropTypes from "prop-types"
import { formatCurrency } from "../../util"

export default class Rates extends Component {

  componentDidMount(){
    this.props.getRates()
  }

  render(){
    const { rates, primaryCurrency, inProgress, errorMessage } = this.props
    return(
      <div style={{height: "300px", width: "300px"}}>
        <h3>Rates ({primaryCurrency})</h3>
        { inProgress
          ? <p>Loading...</p>
          : Object.entries(rates).length !== 0 && !errorMessage
            ?
            <div>
              <ul>
                <li>HRK = {formatCurrency(rates.HRK)}</li>
                <li>USD = {formatCurrency(rates.USD)}</li>
                <li>GBP = {formatCurrency(rates.GBP)}</li>
                <li>EUR = {formatCurrency(rates.EUR)}</li>
              </ul>
            </div>
            : <div>{errorMessage}</div>
        }
      </div>
    )
  }
}

Rates.propTypes = {
  getRates: PropTypes.func,
  rates: PropTypes.any,
  inProgress: PropTypes.bool,
  primaryCurrency: PropTypes.string,
  errorMessage: PropTypes.any
}
