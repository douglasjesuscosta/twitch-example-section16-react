
//React
import React, { useState, useEffect } from "react";

//React Bootstrap
import { Button } from 'react-bootstrap';

//Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//Actions related to authentication
import * as authentication_action from './../../actions/authentication'

const GoogleAuth = ({is_authenticated, try_to_sign_in, try_to_sign_out, verify_authentication}) => {
  const [isSignedIn, setSignedIn] = useState(null);

  useEffect(() => {
    verify_authentication()
    setSignedIn(is_authenticated)
  }, [is_authenticated]);

  return (
    <div className="justify-content-end">
      { isSignedIn === null ? (
        <div> I don't know if we are signed in</div>
      ) 
      : isSignedIn === true ? (
        <Button variant="danger" size="sm" onClick={ () => { try_to_sign_out() }}>
          Sign out
        </Button>
      ) : (
        <Button variant="light" size="sm" onClick={ () => { try_to_sign_in() }}>
          Sign in with Google
        </Button>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...authentication_action }, dispatch)

const mapStateToProps = ({ authentication }) => ({
  is_authenticated: authentication.isAuthenticated
})

export default connect( mapStateToProps, mapDispatchToProps)(GoogleAuth)

