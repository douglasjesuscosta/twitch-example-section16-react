import * as authentication_action from './../actions/authentication'

import React, { useState, useEffect } from "react";

//Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const GoogleAuth = ({is_authenticated, try_to_sign_in, try_to_sign_out, verify_authentication}) => {
  const [isSignedIn, setSignedIn] = useState(null);

  useEffect(() => {
    verify_authentication()
    setSignedIn(is_authenticated)
  }, [is_authenticated]);

  return (
    <div>
      { isSignedIn === null ? (
        <div>I don't know if we are signed in</div>
      ) : isSignedIn === true ? (
        <button
          className="ui red google button"
          onClick={() => {
           try_to_sign_out()
          }}>
          <i className="google icon" />
          Sign out
        </button>
      ) : (
        <button className="ui red google button" onClick={() => {
          try_to_sign_in()
        }}>
          <i className="google icon" />
          Sign in with Google
        </button>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...authentication_action }, dispatch)

const mapStateToProps = ({ authentication }) => ({
  is_authenticated: authentication.isAuthenticated
})

export default connect( mapStateToProps, mapDispatchToProps)(GoogleAuth)

