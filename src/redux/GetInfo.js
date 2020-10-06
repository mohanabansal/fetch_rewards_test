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
      let dict = {};

      //creates a dictionary with key as the listId's and only enters the name with value and
      for (let info of action.info) {
        if (info.name && info.name.length !== 0) {
          dict[info.listId]
            ? (dict[info.listId] = [...dict[info.listId], info])
            : (dict[info.listId] = [info]);
        }
      }

      
      return {
        ...state,
        info: dict
      }
    default:
      return state;
  }
}
