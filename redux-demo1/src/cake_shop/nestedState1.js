const redux = require("redux");
const _createStore = redux.createStore;
const _createReducer = redux.createRe;
const produce = require("immer").produce;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const initialState = {
  name: "Ahad",
  address: {
    street: "105/1",
    city: "Dhaka",
    state: "Dhaka",
  },
};
const STREET_UPDATED = "STREET_UPDATED";

function updateStreet(street) {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload,
      //   },
      // };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });

    default:
      state;
  }
};
const store = _createStore(reducer, applyMiddleware(logger));

console.log("Initial State ", store.getState());
const unsubscribe = store.subscribe(() => {
  // console.log("Updated State ", store.getState());
});
store.dispatch(updateStreet("GULSHAN 1"));
unsubscribe();
