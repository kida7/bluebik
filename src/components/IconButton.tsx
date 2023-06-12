import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon, { IconProps } from './Icon';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
});
export type IconButtonProps = IconProps & {
  containerStyle?: StyleProp<ViewStyle>;
};

const IconButton = ({ onPress, containerStyle, ...props }: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <Icon {...props} />
    </TouchableOpacity>
  );
};

export default IconButton;
