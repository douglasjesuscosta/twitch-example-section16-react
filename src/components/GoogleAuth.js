import React, { useState, useEffect } from "react";

const GoogleAuth = () => {
  const [isSignedIn, setSignedIn] = useState(null);

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "110811983755-o9nplgfsksrhbif3krjn4mbmoqe3h6e2.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          let auth = window.gapi.auth2.getAuthInstance();
          setSignedIn(auth.isSignedIn.get());

          auth.isSignedIn.listen(() => {
            setSignedIn(auth.isSignedIn.get());
          });
        });
    });
  });

  return (
    <div>
      { isSignedIn === null ? (
        <div>I don't know if we are signed in</div>
      ) : isSignedIn === true ? (
        <button
          className="ui red google button"
          onClick={() => {
            window.gapi.auth2.getAuthInstance().signOut();
          }}>
          <i className="google icon" />
          Sign out
        </button>
      ) : (
        <button className="ui red google button" onClick={() => {
            window.gapi.auth2.getAuthInstance().signIn();
        }}>
          <i className="google icon" />
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;
