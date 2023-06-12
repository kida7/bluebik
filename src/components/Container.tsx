import { useAppSelector } from '$redux';
import { BOTTOM_SPACE } from '$themes/constants';
import React, { ReactNode } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  ScrollViewProps,
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Space from './Space';

const Container: React.FC<
  KeyboardAvoidingViewProps & {
    paddingHorizontal?: boolean;
    scrollable?: boolean;
    scrollViewProps?: ScrollViewProps;
    footer?: ReactNode;
    header?: ReactNode;
  }
> = ({
  style,
  header,
  paddingHorizontal,
  scrollable,
  children,
  scrollViewProps,
  footer,
  ...props
}) => {
  const error = useAppSelector(state => state.error.main);
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={[
        styles.container,
        paddingHorizontal ? styles.paddingHorizontal : {},
        style,
      ]}
      enabled={true}
      {...props}>
      {header}
      {scrollable ? (
        <ScrollView {...scrollViewProps}>{children}</ScrollView>
      ) : (
        children
      )}
      {footer}
      {footer ? <Space size={BOTTOM_SPACE} /> : null}
      {error?.code === 'loading' ? (
        <View style={styles.loading}>
          <ActivityIndicator color="#999" />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default Container;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  paddingHorizontal: { paddingHorizontal: 16 },
  container: { flex: 1, backgroundColor: '#fff' },
});
