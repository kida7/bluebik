import React, { useCallback, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import HorizontalView from './HorizontalView';
import IconButton from './IconButton';
import TextInput, { TextInputProps } from './TextInput';

const TextInputSearch = ({
  style,
  containerStyle,
  onSearchIconPress,
  ...props
}: TextInputProps & {
  containerStyle?: ViewStyle;
  onSearchIconPress?: (event: GestureResponderEvent) => void;
}) => {
  const [hide, setHide] = useState(true);
  const ref = useRef<typeof TextInput>(null);
  const _onSearchIconPress = useCallback(
    e => {
      if (hide) {
        setHide(false);
        //@ts-ignore
        ref.current?.focus();
      }
      if (onSearchIconPress) {
        onSearchIconPress(e);
      }
    },
    [hide, onSearchIconPress],
  );
  const _hide = hide && !props.value;
  return (
    <HorizontalView
      style={[styles.container, styles.blur, style, containerStyle]}>
      <Text style={[styles.header, _hide ? styles.labelShow : styles.hide]}>
        MARKETS
      </Text>
      <View style={_hide ? styles.hide : styles.textInputShow}>
        <TextInput
          ref={ref}
          placeholder="Token"
          onBlur={() => setHide(true)}
          returnKeyType="done"
          placeholderTextColor="#999"
          style={[styles.textinput]}
          {...props}
        />
      </View>
      {props.value ? (
        <IconButton
          name="close"
          iconFont="AntDesign"
          onPress={props?.onChangeText?.bind(null, '')}
        />
      ) : (
        <IconButton name={'search'} onPress={_onSearchIconPress} size={16} />
      )}
    </HorizontalView>
  );
};
export default TextInputSearch;

const styles = StyleSheet.create({
  labelShow: { marginLeft: 20 },
  textInputShow: { flex: 1 },
  hide: { width: 0 },
  header: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3D436C',
  },
  blur: {},
  focus: {
    backgroundColor: 'rgba(59, 191, 110, 0.2)',
    borderColor: 'rgba(59, 191, 110, 1)',
    borderWidth: 1,
  },
  container: {
    // backgroundColor: 'red',
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderRadius: 10,
  },
  textinput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    fontWeight: '400',
    paddingHorizontal: 16,
  },
});
