import { useAppSelector } from '$redux';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
const LoadingView: React.FC<ViewProps & { errorKey: string }> = ({
  children,
  style,
  errorKey,
  ...props
}) => {
  const error = useAppSelector(state => state.Error[errorKey]) || {};
  // console.log('error', errorKey, error);
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
      {error.code === 'loading' ? (
        <View style={styles.overlay}>
          <View style={styles.indicatorContainer}>
            <ActivityIndicator color="#999" />
            <Text style={styles.description}>Loading...</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};
export default LoadingView;

const styles = StyleSheet.create({
  container: { flex: 1 },
  description: { color: '#aaa', marginTop: 12 },
  indicatorContainer: {
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});
