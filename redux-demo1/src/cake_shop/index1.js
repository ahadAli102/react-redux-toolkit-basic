const redux = require("redux");
const _createStore = redux.createStore;
const _bindActionCreators = redux.bindActionCreators;

//action constants
const CAKE_OREDERED = "CAKE_OREDERED";
const CAKE_OREDERED_WITH_AMOUNT = "CAKE_OREDERED_WITH_AMOUNT";
const CAKE_RESTOKE = "CAKE_RESTOKE";

const ICE_CREAM_OREDERED = "ICE_CREAM_OREDERED";
const ICE_CREAM_RESTOKE = "ICE_CREAM_RESTOKE";

//action
function orderCake() {
  return {
    type: CAKE_OREDERED,
    payload: 3,
  };
}
function restokeCake(amount = 1) {
  return {
    type: CAKE_RESTOKE,
    payload: amount,
  };
}
function orderCakeWithAmount(amount) {
  return {
    type: CAKE_OREDERED_WITH_AMOUNT,
    payload: amount,
  };
}

function orderIceCream(amount = 1) {
  return {
    type: ICE_CREAM_OREDERED,
    payload: amount,
  };
}
function restokeIceCream(amount = 1) {
  return {
    type: ICE_CREAM_RESTOKE,
    payload: amount,
  };
}
// 3. (previousState, action) => newState
const initialState = {
  numberOfCakes: 10,
  numberOfIceCream: 20,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_OREDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
        // numberOfCakes: state.numberOfCakes - action.payload, this also works fine
      };
    case CAKE_OREDERED_WITH_AMOUNT:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - action.payload,
      };
    case CAKE_RESTOKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload,
      };
    case ICE_CREAM_OREDERED:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream - action.payload,
      };
    case ICE_CREAM_RESTOKE:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream + action.payload,
      };
    default:
      return state;
  }
};

const store = _createStore(reducer);
console.log("Initial state ", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Updated state ", store.getState())
);

// store.dispatch(orderCake());
// store.dispatch({
//   type: CAKE_OREDERED,
//   payload: 3,
// });
// unsubscribe();
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(orderCakeWithAmount(5));
// store.dispatch(restokeCake());
// store.dispatch(restokeCake(5));

const actions = _bindActionCreators(
  {
    orderCake,
    orderCakeWithAmount,
    restokeCake,
    orderIceCream,
    restokeIceCream,
  },
  store.dispatch
);
actions.orderCake();
actions.orderCakeWithAmount(2);
actions.restokeCake(3);
actions.orderIceCream();
actions.orderIceCream(3);
actions.restokeIceCream();
actions.restokeIceCream(5);

unsubscribe();
