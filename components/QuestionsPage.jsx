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

    // $.ajax({
    //   type: 'GET',
    //   url: 'https://pramodrhegde.in/questions.js/',
    //   cache: false,
    //   dataType: 'JSONP',
    //   jsonpCallback: 'getQuestions',
    //   success: (data) => {
    //     this.setState({
    //       questions: data.results,
    //       isFetching: false,
    //       currentQuestion: 1
    //     });
    //   },
    //   error: (xhr) => {
    //     this.setState({
    //       isFetching: false,
    //       isError: true
    //     });
    //   }
    // });

    let questions = [{
  		"question": "Who wrote and directed the 1986 film 'Platoon'?",
  		"correct_answer": "Oliver Stone",
  		"answers": ["Francis Ford Coppola", "Stanley Kubrick", "Oliver Stone", "Michael Cimino"]
  	}, {
  		"question": "Which actress danced the twist with John Travolta in 'Pulp Fiction'?",
  		"correct_answer": "Uma Thurman",
  		"answers": ["Kathy Griffin", "Uma Thurman", "Pam Grier", "Bridget Fonda"]
  	}, {
  		"question": "What was the first James Bond film?",
  		"correct_answer": "Dr. No",
  		"answers": ["Dr. No", "Goldfinger", "From Russia With Love", "Thunderball"]
  	}, {
  		"question": "Who plays Alice in the Resident Evil movies?",
  		"correct_answer": "Milla Jovovich",
  		"answers": ["Madison Derpe", "Milla Johnson", "Kim Demp", "Milla Jovovich"]
  	}, {
  		"question": "What is the oldest Disney film?",
  		"correct_answer": "Snow White and the Seven Dwarfs",
  		"answers": ["Pinocchio", "Snow White and the Seven Dwarfs", "Dumbo", "Fantasia"]
  	}];

    setTimeout(() => {
      this.setState({
        questions: questions,
        isFetching: false,
        currentQuestion: 1
      });
    }, 1000);

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
