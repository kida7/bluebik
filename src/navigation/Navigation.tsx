import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Onboarding from '$screens/Home/Onboarding';
import DetailsScreen from '$screens/Home/DetailsScreen';
import { RootStackParam } from '$services/Types';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParam>();
const stackScreenOptions = { header: () => null };

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen
            component={Onboarding}
            name="Onboarding"
            options={stackScreenOptions}
          />
          <Stack.Screen
            component={DetailsScreen}
            name="DetailsScreen"
            options={stackScreenOptions}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
