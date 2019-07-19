import React, { Component } from 'react';
import './App.css';
import Step from './Step';
import { PersonalForm } from './PersonalForm';
import { CardForm } from './CardForm';

const stepTitles = ['Personal information', 'Card information', 'Finish'];

class App extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    isTimeOver: false
  };

  handleTabClick = step => {
    this.setState({ step });
  };

  handleChangeForm = (name, value) => {
    this.setState({ [name]: value });
  };

  handleClickNextForm = () => {
    this.setState(state => ({ step: state.step + 1 }));
  };

  handleChangeTimeOver = isTimeOver => {
    this.setState({ isTimeOver });
  };

  isFormCommitable = () => {
    const { step, firstName, lastName, email, cardNumber } = this.state;

    if (step === 1) {
      return firstName !== '' && lastName !== '' && email !== '' && email.includes('@');
    } else if (step === 2) {
      return cardNumber.length === 16;
    } else if (step !== 3) {
      return false;
    }
  };

  renderForm = () => {
    const { step, firstName, lastName, email, cardNumber } = this.state;

    if (step === 1) {
      return (
        <PersonalForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          onChangeForm={this.handleChangeForm}
        />
      );
    } else if (step === 2) {
      return (
        <CardForm
          cardNumber={cardNumber}
          onChangeForm={this.handleChangeForm}
          onChangeTimeOver={this.handleChangeTimeOver}
        />
      );
    } else if (step === 3) {
      return 'Поздравляем!';
    }
  };

  render() {
    const { step, isTimeOver } = this.state;

    return (
      <div className="container">
        <header className="tab-panel">
          {stepTitles.map((title, index) => {
            let stepNumber = ++index;
            return (
              <Step
                key={title}
                onClick={this.handleTabClick}
                isSelected={stepNumber === step}
                number={stepNumber}
                isClickable={stepNumber < step}
              >
                {title}
              </Step>
            );
          })}
        </header>
        <div className="form-content">{this.renderForm()}</div>

        <footer className="button-panel">
          <button
            className="button-next"
            disabled={!this.isFormCommitable() || isTimeOver}
            onClick={this.handleClickNextForm}
          >
            Next
          </button>
        </footer>
      </div>
    );
  }
}

export default App;
