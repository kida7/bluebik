import colors from '$themes/colors';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HorizontalView from './HorizontalView';
import Line from './Line';

interface Item {
  text?: string;
  value: any;
}

const TabSelection = ({
  items,
  selectedItem,
}: {
  items: Item[];
  selectedItem?: Item;
}) => {
  let selectedIndex = useMemo(() => {
    let _selectedItem = items.find(t => t.value === selectedItem?.value);
    return (_selectedItem && items.indexOf(_selectedItem)) || 0;
  }, [items, selectedItem]);
  return (
    <HorizontalView style={styles.container}>
      {items.map((item, index) => (
        <View key={`${index}`} style={styles.itemContainer}>
          {index !== 0 &&
            selectedIndex !== index &&
            selectedIndex + 1 !== index && (
              <Line vertical color="#094183" size={3} />
            )}
          <TouchableOpacity
            style={[
              styles.itemButton,
              {
                backgroundColor:
                  selectedItem?.value == item.value ? colors.main : '#fff',
              },
            ]}>
            <Text
              style={[
                styles.itemText,
                {
                  color:
                    selectedItem?.value == item.value ? '#fff' : colors.main,
                },
              ]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </HorizontalView>
  );
};

export default TabSelection;

const styles = StyleSheet.create({
  itemText: { fontSize: 16, fontWeight: 'bold', color: colors.main },
  itemButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.main,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  container: { height: 46, borderColor: colors.main, borderWidth: 3 },
});
