import React from 'react';
import happayScoreLogo from '../../images/Logo1.svg';

const Header = props => (
  <div className={"headerContainer"} onClick={() => props.history.push()} >
    <img
      src={happayScoreLogo}
      style={{
        height: '44px',
        cursor: 'pointer',
      }}
      alt="happay score logo"
    />
  </div>
);

export default Header;