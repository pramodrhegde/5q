import React from 'react';
import '../scss/start-page.scss';

import AppIcon from './AppIcon.jsx';

export default class StartPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userName : ''
    }
  }

  onInputChange(event) {
    this.setState({
      userName: event.target.value
    });
  }

  onButtonClick() {
    if(!this.state.userName) {
      return false;
    }

    this.props.setUserName(this.state.userName);
  }

  render() {
    return <div className='main-container text-center'>
      <AppIcon />
      <h1>Welocome to 5Q</h1>
      <h2>Answer 5 questions and stand a chance to be a millianare.</h2>

      <div className='content-wrapper'>
        <label htmlFor='userName'>Enter your username to start Quiz</label>
        <div className='btn-group'>
          <input type='text'
                id='userName'
                placeholder='enter username'
                onChange={this.onInputChange.bind(this)}/>
          <button className='btn btn-sm'
                  type='button'
                  role='button'
                  onClick={this.onButtonClick.bind(this)}
                  disabled={!this.state.userName ? true : false}>
            Go!
          </button>
        </div>
      </div>
    </div>
  }
}
