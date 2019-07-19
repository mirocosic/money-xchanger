import { connect } from 'react-redux';
import Component from './component';

function mapStateToProps(state){
  return {
    rates: state.common.rates,
    primaryCurrency: state.common.primaryCurrency,
    secondaryCurrency: state.common.secondaryCurrency,
    inProgress: state.common.inProgress,
    accounts: state.common.accounts
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeAmount: (value, input) => dispatch({type: "CHANGE_AMOUNT", value, input}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
