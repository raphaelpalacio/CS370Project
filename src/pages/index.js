import React from "react";
import ReactDOM from "react-dom";
import App from "../App";  // Updated path to step out of the 'pages' directory
import * as serviceWorker from "./serviceWorker"; // Also update if serviceWorker is not inside 'pages'
import { Auth0Provider } from "./auth0";

ReactDOM.render(
  <Auth0Provider
    domain={"dev-otrfj0d3n15cdjdz.us.auth0.com"}
    client_id={"VtG0vhD2r0csHQ5rRKszfQin8Qm7yuWd"}
    redirect_uri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
