import React from "react";
import { Route, Link } from "react-router-dom";

type ActiveLinkProps = {
  label: string;
  to: string;
  activeOnlyWhenExact: boolean;
};

const ActiveLink = ({ label, to, activeOnlyWhenExact }: ActiveLinkProps) => {
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
};

export { ActiveLink };
