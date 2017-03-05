import React from 'react';
import '../scss/main.scss';
import StartPage from './StartPage.jsx';
import QuestionsPage from './QuestionsPage.jsx';

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
