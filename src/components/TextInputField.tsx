import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import TextInput, { TextInputProps } from './TextInput';

const TextInputField = ({
  title,
  style,
  containerStyle,
  ...props
}: { title: string; containerStyle?: ViewStyle } & TextInputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput style={[styles.textInput, style]} editable {...props} />
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  container: { marginTop: 12 },
  title: { marginBottom: 8, fontWeight: '600', fontSize: 16 },
  textInput: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});
