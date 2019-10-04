import React from 'react';
import { connect } from 'react-redux';
import { setPlayerOnLevelStart } from '../../ac';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import './exitLevelModal.css';

const ExitLevelModal = (isPlayerOnLevelExit, setPlayerOnLevelStart) => {
  return (
    <Modal
      title="Choose"
      visible={isPlayerOnLevelExit}
      closable={false}
      maskClosable={false}
      bodyStyle={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '1rem',
        justifyItems: 'center'
      }}
    >
      <Link className="buttons" to="/" onClick={setPlayerOnLevelStart}>
        Home
      </Link>
      <Link className="buttons" to="/score" onClick={setPlayerOnLevelStart}>
        Score
      </Link>
      <Link className="buttons" to="/battle" onClick={setPlayerOnLevelStart}>
        Play again
      </Link>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isPlayerOnLevelExit: state.player.isPlayerOnLevelExit
});

const mapDispatchToProps = dispatch => ({
  setPlayerOnLevelStart: () => dispatch(setPlayerOnLevelStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExitLevelModal);
