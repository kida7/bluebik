import { useAppSelector } from '$redux';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ErrorView = ({ errorKey }: { errorKey: string }) => {
  const { code, message } =
    useAppSelector(state => state.error[errorKey]) || {};
  const dispMessage = useMemo(() => {
    if (/200|loading/.test(code || '')) {
      return '';
    }
    if (code === '401') {
      return 'Không tìm thấy dữ liệu';
    }
    return message;
  }, [code, message]);
  //   console.log('error view', code, dispMessage);

  if (dispMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{dispMessage}</Text>
      </View>
    );
  }
  return <View style={styles.space} />;
};

export default ErrorView;

const styles = StyleSheet.create({
  space: { height: 16 },
  message: { color: '#999' },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
});
