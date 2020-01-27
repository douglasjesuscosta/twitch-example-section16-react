import { SHOW_MESSAGE, CLOSE_MESSAGE  } from './types.js';


export const show_message = (message, title, type) => dispatch => {
    dispatch({type: SHOW_MESSAGE, payload: { message: message, title: title, type: type, showMessage: true }});
}

export const close_message = () => dispatch => {
    dispatch({type: SHOW_MESSAGE, payload: { message: '', title: '', type: '', showMessage: false }});    
}