import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import "./tasksScreen.css";

const TasksScreen = ({ wasTaskChoosed }) => {
  return (
    <Modal
      title="Choose spell"
      visible={!wasTaskChoosed}
      closable={false}
      maskClosable={false}
    >
      <Link className="link " to="/simpleMath">
        Math
      </Link>
      <Link className="link " to="/findLetter">
        Find letter
      </Link>
    </Modal>
  );
};

export { TasksScreen };
