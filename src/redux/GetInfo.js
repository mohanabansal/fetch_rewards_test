//action type
const GET_INFO = "GET_INFO";
const UPDATE_SORT_ORDER = "UPDATE_SORT_ORDER"

//action creator
const getInfo = (info) => ({
  type: GET_INFO,
  info,
});

export const updateSortOrder = (sortOrder) => ({
  type: UPDATE_SORT_ORDER,
  sortOrder
})

//thunk
export const getInfoFromAPI = () => {
  console.log("in reducer");
  return async (dispatch, getState, { axios }) => {
    try {
      const { data } = await axios.get(
        "https://cors-anywhere.herokuapp.com/fetch-hiring.s3.amazonaws.com/hiring.json"
      );
      console.log("data", data);
      dispatch(getInfo(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  info: [],
  sortOder: "inc"
};

function sortedList(list, order) {
  if(order === "inc") {
    Object.keys(list).forEach((key) => {
      list[key].sort(
        (a, b) => a.name.split(" ")[1] - b.name.split(" ")[1]
      );
    });
  }else {
    Object.keys(list).forEach((key) => {
      list[key].sort(
        (a, b) => b.name.split(" ")[1] - a.name.split(" ")[1]
      );
    })
  }
  console.log(list[1])
  return list
}

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

      dict = sortedList(dict, state.sortOder)

      return {
        ...state,
        info: dict,
      };
    case UPDATE_SORT_ORDER:
      let oldInfo = state.info;
      let newInfo = sortedList(oldInfo, action.sortOrder)
      return {
        ...state,
        info: newInfo,
        sortOder: action.sortOrder
      }
    default:
      return state;
  }
}
