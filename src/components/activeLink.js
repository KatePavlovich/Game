import React from "react";
import { Route, Link } from "react-router-dom";

export function ActiveMenuLink({ label, to, activeOnlyWhenExact }) {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) =>
        <div>
          <Link to={to} className={match ? "nav-link--active" : "nav-link"}>
            {label}
          </Link>
        </div>}
    />
  );
}
