const initialState = {
  loading: false,
  isAuthenticated: false
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN_REQUEST":
      return {
        ...state,
        loading: true
      };

    case "SIGN_OUT_REQUEST":
      return {
        ...state,
        loading: true
      };

    case "CHANGE_AUTH":
      console.log("PASSEI REDUCER")
      return {
        ...state,
        loading: false,
        isAuthenticated: action.data
      };
    default:
      return state;
  }
};

export default authentication;
