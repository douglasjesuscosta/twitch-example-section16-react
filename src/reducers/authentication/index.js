import { SIGN_IN_REQUEST, SIGN_OUT_REQUEST, CHANGE_AUTH  } from '../../actions/authentication/types'

const initialState = {
  loading: false,
  isAuthenticated: false,
  id: ''
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true
      };

    case SIGN_OUT_REQUEST:
      return {
        ...state,
        loading: true
      };

    case CHANGE_AUTH:
      return {
        ...state,
        loading: false,
        isAuthenticated: action.data.isAuthenticated,
        id: action.data.userId
      };
    default:
      return state;
  }
};

export default authentication;
