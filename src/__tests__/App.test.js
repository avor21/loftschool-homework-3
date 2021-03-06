import React from 'react';
import App from '../App';
import Step from '../Step';

import {shallow} from 'enzyme';

describe('Компонент App', () => {
  const wrapper = shallow(<App />);
  describe('Рендер', () => {
    describe('Должен присутствовать элемент с классом ', () => {
      it('container', () => {
        expect(wrapper.find('.container')).toHaveLength(1);
      });

      it('container tab-panel', () => {
        expect(wrapper.find('.container .tab-panel')).toHaveLength(1);
      });

      it('form-content', () => {
        expect(wrapper.find('.form-content')).toHaveLength(1);
      });

      it('button-panel', () => {
        expect(wrapper.find('.button-panel')).toHaveLength(1);
      });

      it('button-panel button.button-next', () => {
        expect(wrapper.find('.button-panel button.button-next')).toHaveLength(1);
      });
    });

    describe('Должен возвращать 3 компонента Step', () => {
      describe('Если state.step === 1', () => {
        const wrapper = shallow(<App />);
        wrapper.setState({step: 1});
        wrapper.update();
        it('Первый компонент Step должен содержать props key="Personal information", onClick=App.handleTabClick, isSelected=true, number=1, isClickable=false', () => {
          expect(
            wrapper.contains(
              <Step
                key="Personal information"
                onClick={wrapper.instance().handleTabClick}
                isSelected
                number={1}
                isClickable={false}
              >
                Personal information
              </Step>
            )
          ).toBeTruthy();
        });

        it('Второй компонент Step должен содержать props key="Card information", onClick=App.handleTabClick, isSelected=false, number=2, isClickable=false', () => {
          expect(
            wrapper.contains(
              <Step
                key="Card information"
                onClick={wrapper.instance().handleTabClick}
                isSelected={false}
                number={2}
                isClickable={false}
              >
                Card information
              </Step>
            )
          ).toBeTruthy();
        });
        it('Третий компонент Step должен содержать props key="Finish", onClick=App.handleTabClick, isSelected=false, number=3, isClickable=false', () => {
          expect(
            wrapper.contains(
              <Step
                key="Finish"
                onClick={wrapper.instance().handleTabClick}
                isSelected={false}
                number={3}
                isClickable={false}
              >
                Finish
              </Step>
            )
          ).toBeTruthy();
        });
      });
      describe('Если state.step === 2', () => {
        const wrapper = shallow(<App />);
        wrapper.setState({step: 2});
        it('Первый компонент Step должен содержать props key="Personal information", onClick=App.handleTabClick, isSelected=false, number=1, isClickable=true', () => {
          expect(
            wrapper.contains(
              <Step
                key="Personal information"
                onClick={wrapper.instance().handleTabClick}
                isSelected={false}
                number={1}
                isClickable
              >
                Personal information
              </Step>
            )
          ).toBeTruthy();
        });

        it('Второй компонент Step должен содержать props key="Card information", onClick=App.handleTabClick, isSelected=true, number=2, isClickable=false', () => {
          expect(
            wrapper.contains(
              <Step
                key="Card information"
                onClick={wrapper.instance().handleTabClick}
                isSelected
                number={2}
                isClickable={false}
              >
                Card information
              </Step>
            )
          ).toBeTruthy();
        });
        it('Третий компонент Step должен содержать props key="Finish", onClick=App.handleTabClick, isSelected=false, number=3, isClickable=false', () => {
          expect(
            wrapper.contains(
              <Step
                key="Finish"
                onClick={wrapper.instance().handleTabClick}
                isSelected={false}
                number={3}
                isClickable={false}
              >
                Finish
              </Step>
            )
          ).toBeTruthy();
        });
      });

      describe('Если state.step === 3', () => {
        const wrapper = shallow(<App />);
        wrapper.setState({step: 3});
        it('Первый компонент Step должен содержать props key="Personal information", onClick=App.handleTabClick, isSelected=false, number=1, isClickable=true', () => {
          expect(
            wrapper.contains(
              <Step
                key="Personal information"
                onClick={wrapper.instance().handleTabClick}
                isSelected={false}
                number={1}
                isClickable
              >
                Personal information
              </Step>
            )
          ).toBeTruthy();
        });
        it('Второй компонент Step должен содержать props key="Card information", onClick=App.handleTabClick, isSelected=false, number=2, isClickable=true', () => {
          expect(
            wrapper.contains(
              <Step
                key="Card information"
                onClick={wrapper.instance().handleTabClick}
                isSelected={false}
                number={2}
                isClickable
              >
                Card information
              </Step>
            )
          ).toBeTruthy();
        });
        it('Третий компонент Step должен содержать props key="Finish", onClick=App.handleTabClick, isSelected=true, number=3, isClickable=false', () => {
          expect(
            wrapper.contains(
              <Step key="Finish" onClick={wrapper.instance().handleTabClick} isSelected number={3} isClickable={false}>
                Finish
              </Step>
            )
          ).toBeTruthy();
        });
      });
    });
    describe('Кнопка button.button-next', () => {
      it(' должна быть disabled если !this.isFormCommitable() || !isTimeOver', () => {
        wrapper.setState({
          isTimeOver: true
        });

        expect(wrapper.find('button.button-next').props().disabled).toBeTruthy();
      });

      it('При клике должен быть вызыван метод handleClickNextForm', () => {
        const wrapper = shallow(<App />);
        const before = wrapper.state().step;

        wrapper.find('button.button-next').simulate('click');
        expect(wrapper.state().step).toEqual(before + 1);
      });
    });
  });

  describe('state должен содержать поля со значениями:', () => {
    const wrapper = shallow(<App />);
    const state = {
      step: 1,
      firstName: '',
      lastName: '',
      email: '',
      cardNumber: '',
      isTimeOver: false
    };
    Object.keys(state).forEach(key => {
      it(`${key}: ${state[key] === '' ? "''" : state[key]}`, () => {
        expect(wrapper.state()[key]).toEqual(state[key]);
      });
    });
  });

  describe('Методы класса', () => {
    describe('handleTabClick', () => {
      const wrapper = shallow(<App />);
      it('Присутствует', () => {
        expect(wrapper.instance().handleTabClick).toBeDefined();
      });

      it('При вызове с аргументом меняется state.step на значение аргумента', () => {
        wrapper.instance().handleTabClick(10);
        wrapper.update();
        expect(wrapper.state().step).toEqual(10);
      });
    });

    describe('handleChangeForm', () => {
      const wrapper = shallow(<App />);
      it('Присутствует', () => {
        expect(wrapper.instance().handleChangeForm).toBeDefined();
      });
      it('При вызове с 2 аргументами меняется state[первый аргумент] = второй аргумент', () => {
        wrapper.instance().handleChangeForm('firstName', 'Иван');
        wrapper.update();
        expect(wrapper.state().firstName).toEqual('Иван');
      });
    });

    describe('handleClickNextForm', () => {
      const wrapper = shallow(<App />);
      it('Присутствует', () => {
        expect(wrapper.instance().handleClickNextForm).toBeDefined();
      });
      it('После вызова state.step увеличивается на 1', () => {
        const val = wrapper.state().step;
        wrapper.instance().handleClickNextForm();
        wrapper.update();
        expect(wrapper.state().step).toEqual(val + 1);
      });
    });

    describe('handleChangeTimeOver', () => {
      const wrapper = shallow(<App />);
      it('Присутствует', () => {
        expect(wrapper.instance().handleChangeTimeOver).toBeDefined();
      });
      it('При вызове с аргументом, аргумент меняет значение state.isTimeOver', () => {
        wrapper.instance().handleChangeTimeOver(true);
        wrapper.update();
        expect(wrapper.state().isTimeOver).toEqual(true);
      });
    });

    describe('isFormCommitable', () => {
      const wrapper = shallow(<App />);
      it('Присутствует', () => {
        expect(wrapper.instance().isFormCommitable).toBeDefined();
      });
      describe('Если state.step === 1', () => {
        it(`Должен возвращать true если state.firstName !== '' && state.lastName !== '' && state.email !== '' && state.email.includes('@')`, () => {
          wrapper.setState({
            step: 1,
            lastName: 'test',
            firstName: 'test',
            email: 'test@'
          });
          expect(wrapper.instance().isFormCommitable()).toBeTruthy();
        });
        it(`Должен возвращать false если state.firstName === '' && state.lastName !== '' && state.email !== '' && state.email.includes('@')`, () => {
          wrapper.setState({
            step: 1,
            lastName: 'test',
            firstName: '',
            email: 'test@'
          });

          expect(wrapper.instance().isFormCommitable()).toBeFalsy();
        });
        it(`Должен возвращать false если state.firstName !== '' && state.lastName === '' && state.email !== '' && state.email.includes('@')`, () => {
          wrapper.setState({
            step: 1,
            lastName: '',
            firstName: 'test',
            email: 'test@'
          });

          expect(wrapper.instance().isFormCommitable()).toBeFalsy();
        });
        it(`Должен возвращать false если state.firstName !== '' && state.lastName !== '' && state.email === '' && state.email.includes('@')`, () => {
          wrapper.setState({
            step: 1,
            lastName: 'test',
            firstName: 'test',
            email: ''
          });

          expect(wrapper.instance().isFormCommitable()).toBeFalsy();
        });
      });
      describe('Если state.step === 2', () => {
        it('Должен возврать  true если cardNumber.length === 16', () => {
          wrapper.setState({
            step: 2,
            cardNumber: '1324123412341234'
          });
          expect(wrapper.instance().isFormCommitable()).toBeTruthy();
        });
      });
      describe('Если state.step !== 1 | 2', () => {
        it('Должен возврать false', () => {
          wrapper.setState({
            step: 3
          });
          expect(wrapper.instance().isFormCommitable()).toBeFalsy();
        });
      });
    });

    describe('renderForm', () => {
      const wrapper = shallow(<App />);
      it('Присутствует', () => {
        expect(wrapper.instance().renderForm).toBeDefined();
      });

      it(`Если state.step === 1 возвращает компонент <PersonalForm firstName={state.firstName} lastName={state.lastName} email={state.email onChangeForm={App.handleChangeForm} />`, () => {
        wrapper.setState({
          step: 1,
          firstName: 'test',
          lastName: 'test',
          email: 'test@'
        });
        expect(wrapper.instance().renderForm().props).toEqual({
          firstName: 'test',
          lastName: 'test',
          email: 'test@',
          onChangeForm: wrapper.instance().handleChangeForm
        });
      });
      it(`Если state.step === 2 возвращает компонент <CardForm cardNumber={state.cardNumber} onChangeForm={this.handleChangeForm} onChangeTimeOver={this.handleChangeTimeOver} />`, () => {
        wrapper.setState({
          step: 2,
          cardNumber: '1234'
        });
        expect(wrapper.instance().renderForm().props).toEqual({
          cardNumber: '1234',
          onChangeForm: wrapper.instance().handleChangeForm,
          onChangeTimeOver: wrapper.instance().handleChangeTimeOver
        });
      });
      it(`Если state.step === 3 возвращает строку 'Поздравляем!'`, () => {
        const wrapper = shallow(<App />);
        wrapper.setState({
          step: 3
        });
        expect(wrapper.instance().renderForm()).toEqual('Поздравляем!');
      });
    });
  });
});
