import React, { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Icon from './Icon';
import IconButton from './IconButton';
import Space from './Space';
import TextInput, { TextInputProps } from './TextInput';

const TextInputLogin = ({
  style,
  containerStyle,
  secureTextEntry,
  iconName,
  ...props
}: TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  iconName?: string;
}) => {
  const [_secureTextEntry, setSecureTextEntry] = useState(secureTextEntry);
  //eye-with-line
  const [focus, setFocus] = useState(false);
  return (
    <View
      style={[
        styles.container,
        focus ? styles.focus : styles.blur,
        style,
        containerStyle,
      ]}>
      {iconName ? (
        <Icon name={iconName} size={17} style={styles.icon} />
      ) : (
        <Space horizontal />
      )}
      <TextInput
        placeholder="Email"
        returnKeyType="done"
        onFocus={setFocus.bind(null, true)}
        onBlur={setFocus.bind(null, false)}
        style={[styles.textinput]}
        selectionColor="#fff"
        placeholderTextColor="#D6E1FF"
        {...props}
        secureTextEntry={_secureTextEntry}
      />
      {secureTextEntry ? (
        <IconButton
          name={_secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
          iconFont="Ionicons"
          color="#fff"
          onPress={setSecureTextEntry.bind(null, !_secureTextEntry)}
        />
      ) : null}
    </View>
  );
};
export default TextInputLogin;

const styles = StyleSheet.create({
  icon: { alignSelf: 'center', marginHorizontal: 6 },
  blur: {},
  focus: {},
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  textinput: {
    color: '#fff',
    height: 50,
    flex: 1,
    paddingRight: 16,
  },
});
