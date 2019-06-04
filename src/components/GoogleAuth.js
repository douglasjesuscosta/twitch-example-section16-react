import React, { useState, useEffect } from "react";

const GoogleAuth = () => {
  const [isSignedIn, setSignedIn] = useState(null);

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "KEY",
          scope: "email"
        })
        .then(() => {
          let auth = window.gapi.auth2.getAuthInstance();
          setSignedIn(auth.isSignedIn.get());

          auth.isSignedIn.listen( () => {
            setSignedIn(auth.isSignedIn.get())
          })
        });
    });
  });

  return (
    <div>
      {isSignedIn === null ? (
        <div>I don't know if we are signed in</div>
      ) : isSignedIn === true ? (
        <div>I'm signed in</div>
      ) : (
        <div>I'm not signed in</div>
      )}
    </div>
  );
};

export default GoogleAuth;
