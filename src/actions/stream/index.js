import {
  SET_TEMP_STREAM,
  ADD_STREAM,
  ADD_STREAM_REQUEST,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  REMOVE_STREAM_REQUEST
} from './types';

import stream from '../../apis/stream';

export const add_stream_request = () => ({
  type: ADD_STREAM_REQUEST
})

export const remove_stream_request = () => ({
  type: REMOVE_STREAM_REQUEST
})

export const set_temp_stream = (stream) => ({
  type: SET_TEMP_STREAM,
  data: {
    stream
  }
});

export const add_stream = streamValue => async dispatch => {
  dispatch(add_stream_request())

  const response = await stream.post('', streamValue)
  dispatch({ type: ADD_STREAM, payload: response.data })
};

export const delete_stream = (id, onDeleteSuccess, onDeleteError) => async dispatch => {

  dispatch(add_stream_request());

  await stream.delete(`${id}`).then(
    (response) => {
      onDeleteSuccess();
      dispatch({ type: DELETE_STREAM, payload: id });
      dispatch(remove_stream_request());
    },
    (error)=> {
      onDeleteError();
      dispatch(remove_stream_request());
    })
}

export const fetch_streams = () => async dispatch => {
  dispatch(add_stream_request());

  await stream.get().then((response) => {
    dispatch({ type: FETCH_STREAMS, payload: response.data })
  },
    (error) => {
      console.log(error);
    });
}

export const fetch_stream = (id) => async dispatch => {
  const response = await stream.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
}

export const edit_stream = (id, formValues) => async dispatch => {
  const response = await stream.put(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
}