import _ from 'lodash';
import {
  SET_TEMP_STREAM,
  ADD_STREAM,
  ADD_STREAM_REQUEST,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  REMOVE_STREAM_REQUEST
} from '../../actions/stream/types'

const initialState = {
  name: "",
  language: "",
  description: "",
  country: "",
  loading: true,
  error: false,
  streams: []
};

const stream = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return {
        ...state,
        streams: action.payload,
        loading: false
      };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case SET_TEMP_STREAM:
      return {
        ...state,
        name: action.data.stream.name,
        language: action.data.stream.description,
        country: action.data.stream.country,
        description: action.data.stream.language
      };
    case ADD_STREAM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_STREAM_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case ADD_STREAM:
      return {
        ...state,
        name: '',
        language: '',
        country: '',
        description: '',
        streams: [...state.streams, action.data]
      };
    case DELETE_STREAM:
      return _.omit(state, action.payload);

    default:
      return state;
  }
};

export default stream;