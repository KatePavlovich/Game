import React from "react";
import { Route, Link } from "react-router-dom";

export function ActiveMenuLink({ label, to, activeOnlyWhenExact }) {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <div>
          <Link to={to} className={match ? "navLink--active" : "navLink"}>
            {label}
          </Link>
        </div>
      )}
    />
  );
}
