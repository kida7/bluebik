import colors from '$themes/colors';
import { STATUSBAR_HEIGHT } from '$themes/constants';
import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewProps, Text } from 'react-native';
import BackButton from './BackButton';
import HorizontalView from './HorizontalView';

const Page: React.FC<
  ViewProps & {
    header?: ReactNode;
    title?: string;
    theme?: 'dark' | 'light';
    hideBackaButton?: boolean;
  }
> = ({
  hideBackaButton,
  style,
  children,
  header,
  theme = 'dark',
  title,
  ...props
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        theme === 'dark' ? {} : styles.containerLight,
      ]}
      {...props}>
      <View style={[styles.header, theme === 'dark' ? {} : styles.lightHeader]}>
        {header || (
          <HorizontalView
            style={[
              styles.headerContent,
              theme == 'dark' ? styles.darkHeaderContent : {},
            ]}>
            {!hideBackaButton && <BackButton color={colors.seconary} />}
            <Text
              style={[
                styles.title,
                theme === 'dark' ? {} : { color: colors.seconary },
              ]}>
              {title}
            </Text>
          </HorizontalView>
        )}
      </View>

      {children}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  darkHeaderContent: {},
  containerLight: {
    backgroundColor: '#F3FDFF',
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  lightHeader: { backgroundColor: '#fff', paddingHorizontal: 0 },
  header: {
    paddingTop: STATUSBAR_HEIGHT,
  },
  headerContent: {
    height: 42,
    justifyContent: 'flex-start',
  },
  top: { alignSelf: 'stretch' },
  container: { backgroundColor: colors.main, flex: 1 },
});
