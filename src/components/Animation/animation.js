import React, { Component } from 'react';
import { connect } from 'react-redux';
import './animation.css';

class Animation extends Component {
  render() {
    const { position, spriteLocation, showAnimation, spriteIMG } = this.props;
    return (
      <div
        className={showAnimation === true ? 'animation' : 'hideAnimation'}
        style={{
          backgroundImage: `url(${spriteIMG})`,
          backgroundPosition: spriteLocation,
          top: `${position[1]}px`,
          left: `${position[0]}px`
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  position: state.animation.position,
  spriteLocation: state.animation.spriteLocation,
  showAnimation: state.animation.showAnimation,
  spriteIMG: state.animation.spriteIMG
});

export default connect(mapStateToProps)(Animation);
