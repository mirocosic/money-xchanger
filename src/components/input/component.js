import React, { Component } from "react"
import PropTypes from "prop-types"
import { formatDisplay, formatInput } from "../../util"
import "./styles.css"

export default class Input extends Component {

  handleSelect = () => {
    this.input.focus()
  }


  render(){
    const { changeAmount, amount, type } = this.props
    return(
      <div>
        <div style={{flexDirection: "row", display: "flex"}}>
          <div className="display" onClick={this.handleSelect}>
            { amount && amount !== "0" && amount !== "0.00" ? type === "primary" ? "- " : "+ " : ""}
            { formatDisplay(amount) }
          </div>
          <input
            ref={ref => this.input = ref}
            className="input"
            value={formatInput(amount)}
            onChange={(event)=>{
              if ( /\.\d{3}/.test(event.target.value) ) { return; }
              if ( /^[0-9]+\.?([0-9]{1,2})?$/.test(event.target.value) || event.target.value === ""){
                changeAmount( event.target.value, type)
                }
              }}
          />
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary"]),
  primaryCurrency: PropTypes.string,
  secondaryCurrency: PropTypes.string,
  accounts: PropTypes.object,
  changeAmount: PropTypes.func,
  amount: PropTypes.string
}
