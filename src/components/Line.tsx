import React from 'react';
import { View } from 'react-native';

const Line = ({
  size,
  color,
  vertical,
}: {
  size?: number;
  color?: string;
  vertical?: boolean;
}) => {
  return (
    <View
      style={[
        { backgroundColor: color || '#000' },
        vertical
          ? {
              width: size || 1,
            }
          : {
              height: size || 1,
            },
      ]}
    />
  );
};

export default Line;
