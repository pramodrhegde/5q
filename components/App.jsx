import React from 'react';
import '../scss/main.scss';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userName: ''
    }
  }

  setUserName(userName) {
    this.setState({
      userName: userName
    });
  }

  render() {
    return !this.state.userName ?
    <StartPage setUserName = {this.setUserName.bind(this)}/>
    :
    <QuestionsPage userName={this.state.userName}/>;
  }
}
