import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import Input from './components/input/component';
import Rate from './components/rate/component';
import SelectAccount from './components/select-account/component';
import {runSaga, stdChannel} from 'redux-saga';
import reducer from "./store/reducers"
import { initialState } from "./store/reducers"
import { getRates } from "./store/sagas"
import { checkExchangeable, formatDisplay, formatInput } from "./util"
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should render Input correctly', () => {
  const component = shallow(<Input />);
  expect(component).toMatchSnapshot();
});

it('should render Rate correctly', () => {
  const component = shallow(<Rate accounts={initialState.accounts} primaryCurrency="HRK" secondaryCurrency="USD" rates={{"USD": 1}}/>);
  expect(component).toMatchSnapshot();
});

it('should render SelectAccount correctly', () => {
  const component = shallow(<SelectAccount currencies={initialState.currencies} accounts={initialState.accounts} type="primary" primaryCurrency="HRK"/>);
  expect(component).toMatchSnapshot();
});

describe('Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SWITCH_ACCOUNTS', () => {
    expect(
      reducer(initialState, {
        type: "SWITCH_ACCOUNTS"
      })
    ).toEqual({
      ...initialState,
      primaryCurrency: initialState.secondaryCurrency,
      secondaryCurrency: initialState.primaryCurrency
    })
  })

  it('should handle CHANGE_AMOUNT on primaryCurrency', () => {
    expect(
      reducer(initialState, {
        type: "CHANGE_AMOUNT",
        input: "primary",
        value: 100.20
      })
    ).toEqual({
      ...initialState,
      primaryAmount: 100.20,
      secondaryAmount: "200.40"
    })
  })

  it('should handle CHANGE_AMOUNT on secondaryCurrency', () => {
    expect(
      reducer(initialState, {
        type: "CHANGE_AMOUNT",
        input: "secondary",
        value: 100.20
      })
    ).toEqual({
      ...initialState,
      primaryAmount: "50.10",
      secondaryAmount: 100.20
    })
  })

  it('should handle EXCHANGE', () => {
    expect(
      reducer({
        ...initialState,
        primaryAmount: 100,
        secondaryAmount: 200,
      }, {
        type: "EXCHANGE"
      })
    ).toEqual({
      ...initialState,
      accounts: {
        ...initialState.accounts,
        USD: {
          symbol: "$",
          balance: 100,
        },
        EUR: {
          symbol: "€",
          balance: 300,
        }
      },
      primaryAmount: "",
      secondaryAmount: "",

    })
  })

  it('should handle SELECT_CURRENCY on primary', () => {
    expect(
      reducer(initialState, {
        type: "SELECT_CURRENCY",
        account: "primary",
        currency: "HRK"
      })
    ).toEqual({
      ...initialState,
      primaryCurrency: "HRK"
    })
  })

  it('should handle SELECT_CURRENCY on secondary', () => {
    expect(
      reducer(initialState, {
        type: "SELECT_CURRENCY",
        account: "secondary",
        currency: "HRK"
      })
    ).toEqual({
      ...initialState,
      secondaryCurrency: "HRK"
    })
  })

})



describe("Saga", () => {
  it("should dispatch the GET_RATES action", async () => {

    let dispatched = [];
    const channel = stdChannel()
    const options = {
      channel,
      dispatch: (action) => {dispatched.push(action);  setImmediate(() => channel.put(action));},
      getState: () => ({ state: 'test' }),
    }

    runSaga(options, getRates)

    options.dispatch({type:"GET_RATES_DONE", rates: {}});

    expect(dispatched).toEqual([{type:"GET_RATES_DONE", rates: {}}])

  })
})

describe("Util", ()=>{
  it("should check Exchangeable", () => {
    expect(checkExchangeable(100, 300)).toEqual(true)
    expect(checkExchangeable(100, 30)).toEqual(false)
    expect(checkExchangeable(0, 300)).toEqual(false)
  })

  it("should properly format display values", () => {
    expect(formatDisplay(100)).toEqual("100")
    expect(formatDisplay("test")).toEqual("0")
    expect(formatDisplay()).toEqual("0")
    expect(formatDisplay(10.20)).toEqual("10.2")
    expect(formatDisplay(10.22)).toEqual("10.22")
    expect(formatDisplay(0.22)).toEqual("0.22")
    expect(formatDisplay(0.00)).toEqual("0")
  })

  it("should properly format input", () => {
    expect(formatInput(100)).toEqual(100)
    expect(formatInput()).toEqual("0")
    expect(formatInput("")).toEqual("0")
    expect(formatInput(0.00)).toEqual("0")
    expect(formatInput(0.0)).toEqual("0")
    expect(formatInput("0000.00")).toEqual("0")
  })
})
