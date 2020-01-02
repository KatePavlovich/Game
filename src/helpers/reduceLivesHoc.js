import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduceMonsterLife, reducePlayerLife } from "../ac";

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || "Component";

const withReduceLives = WrappedComponent => {
  class WithReduceLives extends Component {
    reduceMonsterLife = () => this.props.dispatch(reduceMonsterLife());
    reducePlayerLife = () => this.props.dispatch(reducePlayerLife());

    render() {
      return (
        <WrappedComponent
          {...this.props}
          reduceMonsterLife={this.reduceMonsterLife}
          reducePlayerLife={this.reducePlayerLife}
        />
      );
    }
  }
  WithReduceLives.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )})`;

  const mapDispatchToProps = dispatch =>
    bindActionCreators({ reduceMonsterLife, reducePlayerLife }, dispatch);
  return connect(null, mapDispatchToProps)(WithReduceLives);
};

export { withReduceLives };
