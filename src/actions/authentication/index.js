import { apollo_gateway_url } from '../../actions'

export const sign_in_request = () => ({ type: 'SIGN_IN_REQUEST' })

export const sign_out_request = () => ({ type: 'SIGN_OUT_REQUEST' })

export const login_error = () => ({ type: 'LOGIN_ERROR' })

export const change_auth = (response) => ({
  type: 'CHANGE_AUTH',
  data: response 
})

export const verify_authentication = () => (dispatch) => {
  window.gapi.load("client:auth2", () => {
    window.gapi.client
      .init({
        clientId:
          "110811983755-o9nplgfsksrhbif3krjn4mbmoqe3h6e2.apps.googleusercontent.com",
        scope: "email"
      })
      .then(() => {
        let auth = window.gapi.auth2.getAuthInstance();
        dispatch(change_auth(auth.isSignedIn.get()));
      });
  });
}

export const try_to_sign_in = () => (dispatch) => {

  let auth = window.gapi.auth2.getAuthInstance();
  auth.signIn();

  dispatch((sign_in_request()))

  auth.isSignedIn.listen(() => {
    dispatch(change_auth(auth.isSignedIn.get()));
  });
}

export const try_to_sign_out = () => (dispatch) => {

  let auth = window.gapi.auth2.getAuthInstance();
  auth.signOut();

  dispatch((sign_out_request()))

  auth.isSignedIn.listen(() => {
    dispatch(change_auth(auth.isSignedIn.get()));
  });
}


