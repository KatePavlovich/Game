import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { chooseTaskAC } from "../../ac/taskAC";
import { Modal } from "antd";
import "./tasksScreen.css";

class TasksScreen extends React.Component {
  setWasTaskChoosen = () => {
    this.props.dispatch(chooseTaskAC());
  };

  render() {
    const { wasTaskChoosed } = this.props;
    return (
      <Modal
        title="Choose spell"
        visible={!wasTaskChoosed}
        closable={false}
        maskClosable={false}
      >
        <div className="link math" onClick={this.setWasTaskChoosen}>
          Math
        </div>
        <Link className="link " to="/findLetter">
          Find letter
        </Link>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  wasTaskChoosed: state.tasks.wasTaskChoosed
});

export default connect(mapStateToProps)(TasksScreen);
