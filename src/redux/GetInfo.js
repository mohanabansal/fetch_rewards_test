//action type
const GET_INFO = "GET_INFO";

//action creator
const getInfo = (info) => ({
  type: GET_INFO,
  info,
});

//thunk
export const getInfoFromAPI = () => {
  return async (dispatch, getState, { axios }) => {
    try {
      const { data } = await axios.get(
        "https://cors-anywhere.herokuapp.com/fetch-hiring.s3.amazonaws.com/hiring.json"
      );
      dispatch(getInfo(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  info: []
};

export default function getInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INFO:
      return {
        ...state,
        info: action.info
      }
    default:
      return state;
  }
}
