import React from 'react';
import $ from 'jquery';
import ResultsPage from './ResultsPage.jsx';

function getQuestions(data) {
  // console.log(data);
}

export default class QuestionsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      answers: [],
      isFetching: false,
      isError: false,
      currentQuestion: null
    };
  }

  componentWillMount() {
    this.setState({
      isFetching: true
    });

    $.ajax({
      type: 'GET',
      url: 'http://pramodrhegde.in/questions.js/',
      cache: false,
      dataType: 'JSONP',
      jsonpCallback: 'getQuestions',
      success: (data) => {
        this.setState({
          questions: data.results,
          isFetching: false,
          currentQuestion: 1
        });
      },
      error: (xhr) => {
        this.setState({
          isFetching: false,
          isError: true
        });
      }
    });
  }

  renderCurrentQuestion() {

    if(this.state.isFetching) {
      return null;
    }
    let currentQuestion = this.state.questions[this.state.currentQuestion - 1];

    return <div className='question-wrapper'
                key={this.state.currentQuestion}>
      <span>Question {this.state.currentQuestion} of {this.state.questions.length} </span>
      <p className='question'>{currentQuestion.question}</p>
      <ul className='question--options'>
        {
          currentQuestion.answers.map((answer, i) => {
            return <li className='option'
                        key={i}>
              <input type='radio'
                    name='option'
                    id={i}
                    value={answer}
                    onChange={this.onOptionChecked.bind(this)}/>
              <label>
                {answer}
              </label>
            </li>;
          })
        }
      </ul>
    </div>;
  }

  onOptionChecked(event) {
    let answers = this.state.answers;
    answers[this.state.currentQuestion - 1] = event.target.value;
    this.setState({
      answers: answers
    });
  }

  onButtonClick() {
    // window.location.href = '/';
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    })
  }

  render() {

    if(!this.state.isFetching && !this.state.questions.length) {
      return null;
    }

    if(this.state.currentQuestion && this.state.currentQuestion > this.state.questions.length) {
      return <ResultsPage questions={this.state.questions}
                  answers={this.state.answers}
                  userName={this.props.userName}/>
    }

    let question = this.renderCurrentQuestion();

    return  <div>
      {question}

      <button onClick={this.onButtonClick.bind(this)}>
        {
          this.state.currentQuestion === this.state.questions.length ?
          'Finish'
          :
          'Next'
        }
      </button>
    </div>
  }
}
