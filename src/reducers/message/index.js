import { CLOSE_MESSAGE, 
         SHOW_MESSAGE } from '../../actions/message/types';


const initialState = {
  message: '',
  showMessage: false,
  title: '',
  type: ''
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        showMessage: action.payload.showMessage,
        title: action.payload.title,
        type: action.payload.type
      };
    case CLOSE_MESSAGE:
      return {
        ...state,
        message: '',
        showMessage: false,
        title: '',
        type: ''
      }
    default:
      return state;
  }
};

export default message;