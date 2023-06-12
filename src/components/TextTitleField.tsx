import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import HTML from 'react-native-render-html';

const TextTitleField: React.FC<TextProps & { required?: boolean }> = ({
  style,
  required,
  children,
  ...props
}) => {
  if (typeof children === 'string') {
    const _children = (required ? '{0} <span>*</span>' : '{0}').format(
      children,
    );
    return (
      <HTML
        source={{ html: _children }}
        baseFontStyle={styles.title}
        tagsStyles={{ span: { color: 'red' } }}
      />
    );
  }
  return <Text style={[styles.title, style]} {...props} {...{ children }} />;
};

export default TextTitleField;

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 15,
    color: '#12253F',
  },
});
