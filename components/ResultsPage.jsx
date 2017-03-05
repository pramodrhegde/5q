import React from 'react';
import '../scss/result-page.scss';
import ResultsChart from './ResultsChart.jsx';

export default class ResultsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      correctAnswers: null,
      showReview: false
    };
  }

  componentWillMount() {
    this.calculateResult();
  }

  calculateResult() {
    debugger;
    let questions = this.props.questions;
    let answers = this.props.answers;
    let correctAnswers = 0;

    questions.map((question, i) => {
      if(question.correct_answer === answers[i]) {
        correctAnswers += 1;
      }
    });

    this.setState({
      correctAnswers: correctAnswers
    });
  }

  getAnswerSheet() {
    let list = [];

    this.props.questions.map((question, i) => {
      list.push(
        <div className='question-wrapper'
                    key={i}>
          <span>Question {i + 1} </span>
          <p className='question'>{question.question}</p>
          <ul className='question--options'>
            {
              question.answers.map((answer, j) => {
                return <li className='option'
                          key={j}>
                  {
                    answer === question.correct_answer ?
                    <span className='correct-choice pull-left'></span>
                    :
                    answer === this.props.answers[i] ?
                    <span className='incorrect-choice pull-left'></span>
                    :
                    null
                  }
                  <p className={answer === this.props.answers[j] ? 'user-choice': ''}>
                    {answer}
                  </p>
                </li>;
              })
            }
          </ul>
        </div>
      );
    });
    return list;
  }

  onReviewClick() {
    this.setState({
      showReview: true
    });
  }

  onBackButtonClick() {
    this.setState({
      showReview: false
    });
  }

  onButtonClick() {
    window.location.href = '/5q';
  }

  render() {
    return !this.state.showReview ?
    <div className='main-container results'>
      <div className='clearfix'>
        <h2>{this.props.userName} - 5Q Results</h2>
        <div className='pull-left half'>
          <ResultsChart data={[{value: this.state.correctAnswers / this.props.questions.length * 100},
                {value: 100 - this.state.correctAnswers / this.props.questions.length * 100}]}/>
        </div>

        <div className='pull-right half'>
          <p>Total Questions : <span className='pull-right'>{this.props.questions.length}</span></p>
          <p>Correct Answers : <span className='pull-right'>{this.state.correctAnswers}</span></p>
          <p>InCorrect Answers : <span className='pull-right'>{this.props.questions.length - this.state.correctAnswers}</span></p>
          <hr/>
          <p>Your Score : <span className='pull-right'>{this.state.correctAnswers / this.props.questions.length * 100}%</span></p>
          <a href="javascript:void(0);"
            className='pull-right'
            onClick={this.onReviewClick.bind(this)}>
            Review your answers
          </a>
        </div>
      </div>
      <div className='text-center'>
        <button className='btn btn-md'
                onClick={this.onButtonClick.bind(this)}
                type='button'
                role='button'>
          Play Again?
        </button>
      </div>
    </div>
    :
    <div className='main-container review'>
      <h2>{this.props.userName} - Answer sheet. (wrong answers are marked in red)</h2>
      <div className='review-list'>
        {this.getAnswerSheet()}
      </div>

      <div className='text-center'>
        <button className='btn btn-md'
                onClick={this.onBackButtonClick.bind(this)}
                type='button'
                role='button'>
          Back to results
        </button>
      </div>
    </div>
  }
}
