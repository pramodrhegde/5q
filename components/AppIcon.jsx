import React from 'react';
import '../scss/app-icon.scss';

export default class AppIcon extends React.Component {
  render() {
    return <div className='app-ico'>
      <span className='app-ico--text-5'>5</span>
      <span className='app-ico--text-q'>Q</span>
    </div>;
  }
}
