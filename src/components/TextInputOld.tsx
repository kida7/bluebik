/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import _ from 'lodash';

export interface TextInputOldProps extends RNTextInputProps {
  validateReg?: RegExp;
  removeSign?: boolean;
}
interface State {
  value: string;
}

export default class TextInputOld extends React.Component<
  TextInputOldProps,
  State
> {
  static defaultProps = {
    // validateReg: /^[\w\s]+$/
  };
  state = {
    value: '',
  };
  _onChangeText: any;
  UNSAFE_componentWillMount() {
    let { value, removeSign } = this.props;
    // @ts-ignore
    this.setState({ value });
    this._onChangeText = _.debounce(async () => {
      console.log('_onChangeText');
      let { validateReg, onChangeText } = this.props;
      let { value } = this.state;

      if (validateReg && !validateReg.test(value)) {
        if (removeSign) {
          //@ts-ignore
          value = value.changeAlias();
        }
        let _value = value
          .split('')
          .map(t => {
            // @ts-ignore
            return validateReg.test(t) ? t : '';
          })
          .join('');
        console.log('_setState', _value);
        await this.setState({ value: _value });
      }
      if (typeof onChangeText == 'function') onChangeText(this.state.value);
    }, 120);
  }
  _lastInvalid = '';
  componentWillUnmount() {
    this._onChangeText = null;
    // console.log('TextInput componentWillUnmount')
  }
  shouldComponentUpdate(nextProps: TextInputOldProps) {
    if (nextProps.value != this.props.value) {
      // @ts-ignore
      this.setState({ value: nextProps.value });
      return false;
    }
    return true;
  }

  _textInput: RNTextInput | null | undefined;
  focus() {
    if (this._textInput) this._textInput.focus();
  }
  render() {
    let { value } = this.state;
    let {
      validateReg,
      value: valueProp,
      style,
      onChangeText,
      ...otherProps
    } = this.props;
    return (
      <RNTextInput
        ref={ref => (this._textInput = ref)}
        {...otherProps}
        style={[styles.default, style]}
        value={value}
        onChangeText={value => {
          this.setState({ value }, this._onChangeText);
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  default: { paddingVertical: 0, paddingHorizontal: 0 },
});
