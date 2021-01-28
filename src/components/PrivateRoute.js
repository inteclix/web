
import React from "react"
import {
  Route,
  Redirect
} from "react-router-dom"
import { useAppStore } from "stores"

export default function PrivateRoute({ children, ...rest }) {
  let { user } = useAppStore()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}