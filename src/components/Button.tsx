import colors from '$themes/colors';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const Button = ({
  title,
  style,
  disabled,
  textStyle,
  ...props
}: TouchableOpacityProps & { title: string; textStyle?: TextStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled ? styles.disabledButton : {}, style]}
      {...props}
      {...{ disabled }}>
      <Text
        style={[styles.text, disabled ? styles.disabledText : {}, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabledText: { color: '#fff' },
  disabledButton: { backgroundColor: '#E0E0E0' },
  text: { color: colors.seconary, fontWeight: 'bold', fontSize: 16 },
  container: {
    borderRadius: 19,
    height: 40,
    minWidth: 156,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Button;
