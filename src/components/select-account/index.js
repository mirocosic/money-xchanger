import { connect } from 'react-redux';
import Component from './component';

function mapStateToProps(state){
  return {
    rates: state.common.rates,
    currencies: state.common.currencies,
    primaryCurrency: state.common.primaryCurrency,
    secondaryCurrency: state.common.secondaryCurrency,
    accounts: state.common.accounts,
    primaryAmount: state.common.primaryAmount,
    secondaryAmount: state.common.secondaryAmount,
  }
}

function mapDispatchToProps(dispatch){
  return {
    switchAccounts: () => dispatch({type: "SWITCH_ACCOUNTS"}),
    changeAmount: (value, input) => dispatch({type: "CHANGE_AMOUNT", value, input}),
    exchange: () => dispatch({type: "EXCHANGE"}),
    selectAccount: (account, currency) => dispatch({type: "SELECT_CURRENCY", account, currency})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
