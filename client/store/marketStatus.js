const GET_MARKET_STATUS = "GET_MARKET_STATUS";

const marketState = "";

const gotMarketStatus = status => ({ type: GET_MARKET_STATUS, status });

export const getMarketStatus = () => async dispatch => {
  const date = new Date();
  let day = date.getDay(); // [sun,moon,tues,wed,thurs,fri,sat]
  let hour = date.getHours(); // 0-23
  let minute = date.getMinutes(); // 0-59
  if (
    (hour === 9 && minute < 30) ||
    hour < 9 ||
    hour >= 16 ||
    day === 0 ||
    day === 6
  ) {
    dispatch(gotMarketStatus("closed"));
  } else {
    dispatch(gotMarketStatus("open"));
  }
};

const marketStatusReducer = (state = marketState, action) => {
  switch (action.type) {
    case GET_MARKET_STATUS:
      return action.status;
    default:
      return state;
  }
};

export default marketStatusReducer;
