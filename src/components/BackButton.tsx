import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import IconButton, { IconButtonProps } from './IconButton';

const BackButton = ({
  containerStyle,
  name: _name,
  ...props
}: Partial<IconButtonProps>) => {
  const navigation = useNavigation();
  return (
    <IconButton
      name="arrowleft"
      iconFont="AntDesign"
      containerStyle={[styles.backButton, containerStyle]}
      color="#fff"
      onPress={() => {
        navigation.goBack();
      }}
      {...props}
    />
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    width: 43,
    height: 43,
  },
});
