import React, {Component} from 'react';
import Title from './Title';
import './PersonalForm.css';

export class PersonalForm extends Component {
  handleChangeForm = event => {
    const {onChangeForm} = this.props;
    onChangeForm(event.target.name, event.target.value);
  };

  render() {
    const {firstName, lastName, email} = this.props;

    return (
      <div>
        <Title>Персональная информация</Title>
        <div className="personal-form">
          <input placeholder="Имя" name="firstName" value={firstName} onChange={this.handleChangeForm} />
          <input placeholder="Фамилия" name="lastName" value={lastName} onChange={this.handleChangeForm} />
          <input placeholder="E-mail" name="email" value={email} onChange={this.handleChangeForm} />
        </div>
      </div>
    );
  }
}

export default PersonalForm;
