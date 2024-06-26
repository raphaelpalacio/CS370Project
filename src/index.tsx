import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

// Assuming your environment variables are strings, define their types.
const domain: string = process.env.AUTH0_DOMAIN || "";
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID || "";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Auth0Provider
        domain={"dev-otrfj0d3n15cdjdz.us.auth0.com"}
        clientId={"VtG0vhD2r0csHQ5rRKszfQin8Qm7yuWd"}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
