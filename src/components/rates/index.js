import { connect } from 'react-redux';
import Component from './component';

function mapStateToProps(state){
  return {
    rates: state.common.rates,
    primaryCurrency: state.common.primaryCurrency,
    inProgress: state.common.inProgress,
    errorMessage: state.common.errorMessage
  }
}

function mapDispatchToProps(dispatch){
  return {
    getRates: () => dispatch({type: "GET_RATES"})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
