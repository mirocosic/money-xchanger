import { update, cloneDeep } from "lodash";

export const initialState = {
  errorMessage: false,
  currencies: ["EUR", "USD", "HRK", "GBP"],
  primaryCurrency: "USD",
  secondaryCurrency: "EUR",
  primaryAmount: "0",
  secondaryAmount: "0",
  rates: {
    USD: 2,
    EUR: 2,
    HRK: 2,
    GBP: 2
  },
  accounts: {
    USD: {
      symbol: "$",
      balance: 200,
    },
    EUR: {
      symbol: "€",
      balance: 100,
    },
    HRK: {
      symbol: "kn",
      balance: 1000,
    },
    GBP: {
      symbol: "￡",
      balance: 100
    }
  }
}
const common = (state = initialState, action) => {

  let accounts = cloneDeep(state.accounts)

  switch(action.type){

    case "GET_RATES":
      return {
        ...state,
        inProgress: true,
      }

    case "GET_RATES_DONE":
      return {
        ...state,
        rates: action.rates,
        inProgress: false,
        secondaryAmount: (state.primaryAmount * action.rates[state.secondaryCurrency]).toFixed(2),
        errorMessage: false

      }

    case "GET_RATES_ERROR":
      return {
        ...state,
        inProgress: false,
        errorMessage: action.errorMessage
      }

    case "SWITCH_ACCOUNTS":
      return {
        ...state,
        primaryCurrency: state.secondaryCurrency,
        secondaryCurrency: state.primaryCurrency,

      }

    case "CHANGE_AMOUNT":

      if (action.input === "primary") {
        return {
          ...state,
          primaryAmount: action.value,
          secondaryAmount: (action.value * state.rates[state.secondaryCurrency]).toFixed(2)
        }
      } else {
        return {
          ...state,
          primaryAmount: (action.value / state.rates[state.secondaryCurrency]).toFixed(2),
          secondaryAmount: action.value,
        }
      }

    case "EXCHANGE":
      update(accounts, "["+state.primaryCurrency+"].balance", v => v - state.primaryAmount)
      update(accounts, "["+state.secondaryCurrency+"].balance", v => v + parseFloat(state.secondaryAmount))
      return {
        ...state,
        accounts,
        primaryAmount: "",
        secondaryAmount: ""
      }

    case "SELECT_CURRENCY":
      if (action.account === "primary") {
        return {
          ...state,
          primaryCurrency: action.currency
        }
      } else {
        return {
          ...state,
          secondaryCurrency: action.currency
        }
      }

    default:
      return state;
  }

}

export default common;
