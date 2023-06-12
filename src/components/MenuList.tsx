import { MenuItem } from '$services/Types';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';

const MenuList = ({ items }: { items: MenuItem[] }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.menuContainer}>
      {items.map((item, index) => (
        <View style={styles.menuItemContainer} key={`${index}`}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(item.screen, { menuItem: item })
            }>
            <Text style={styles.menuItemText}>{item.title}</Text>
            {item.hasSubMenu && (
              <Icon name="arrowright" iconFont="AntDesign" color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default MenuList;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemText: { marginVertical: 20, fontSize: 20, color: '#fff' },
  menuItemContainer: {
    borderColor: '#fff',
    borderBottomWidth: 1,
  },
  menuContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 26,
    borderColor: '#fff',
    borderTopWidth: 1,
  },
});
