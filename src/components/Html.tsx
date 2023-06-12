import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import HTML from 'react-native-render-html';

const Html = ({ content }: { content: string }) => {
  return (
    <HTML
      source={{
        html: content,
      }}
      baseFontStyle={styles.signupText}
      classesStyles={{
        bold: styles.bold,
      }}
      tagsStyles={{
        a: styles.a,
      }}
      onLinkPress={(e, href) => {
        Alert.alert(href);
      }}
    />
  );
};

export default Html;

const styles = StyleSheet.create({
  signupText: { fontSize: 14, color: '#fff' },
  a: { color: '#fff', textDecorationLine: 'none' },
  bold: { fontWeight: '700' },
});
