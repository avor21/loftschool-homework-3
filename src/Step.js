import React, { PureComponent } from 'react';
import './Step.css';

class Step extends PureComponent {
  handleClick = () => {
    const { isClickable, number, onClick } = this.props;
    if (isClickable) {
      onClick(number);
    }
  };

  render() {
    const { number, isSelected, isClickable, children } = this.props;

    return (
      <div
        onClick={this.handleClick}
        className={
          'step ' +
          (isClickable ? ' step-clickable' : '') +
          (isSelected ? ' step-selected' : '')
        }
      >
        <span className="step__number">{number}</span>
        <span className="step__title">{children}</span>
      </div>
    );
  }
}

export default Step;
