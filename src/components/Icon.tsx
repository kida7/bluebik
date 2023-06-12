//@ts-nocheck
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconProps as VIconProps } from 'react-native-vector-icons/Icon';
import Images from '$themes/Images';
import AutoHeightImage from 'react-native-auto-height-image';
export interface IconProps extends VIconProps {
  iconFont?:
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'Fontisto'
    | 'Zocial'
    | 'FontAwesome5'
    | 'MaterialIcons'
    | 'Ionicons';
}

const Icon: React.FC<IconProps> = ({
  iconFont,
  size = 24,
  color,
  style,
  name,
  ...props
}) => {
  let _Icon;
  if (iconFont) {
    switch (iconFont) {
      case 'Ionicons':
        _Icon = Ionicons;
        break;
      case 'FontAwesome5':
        _Icon = FontAwesome5;
        break;
      case 'Entypo':
        _Icon = Entypo;
        break;
      case 'EvilIcons':
        _Icon = EvilIcons;
        break;
      case 'Feather':
        _Icon = Feather;
        break;
      case 'FontAwesome':
        _Icon = FontAwesome;
        break;
      case 'Fontisto':
        _Icon = Fontisto;
        break;
      case 'Zocial':
        _Icon = Zocial;
        break;
      case 'MaterialIcons':
        _Icon = MaterialIcons;
        break;
      default:
        _Icon = AntDesign;
        break;
    }
    //@ts-ignore
    return <_Icon {...{ name, size, color, style }} {...props} />;
  }
  const tintColor = color ? { tintColor: color } : {};
  //@ts-ignore
  return (
    <AutoHeightImage
      //@ts-ignore
      source={Images[name]}
      width={size}
      //@ts-ignore
      style={[style, { ...tintColor }]}
    />
  );
};
export default Icon;
