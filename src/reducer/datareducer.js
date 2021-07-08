import { INIT_DATA } from "../actions/action-type";

const initialState = {
  data: [],
  selectedCurrency: "tBTCUSD",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
