import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '$components/Button';
import TextInputField from '$components/TextInputField';
import DatePicker from 'react-native-date-picker';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { RootStackParam } from '$services/Types';
import { useAppSelector } from '$redux';
import Page from '$components/Page';
import { useDispatch } from 'react-redux';
import { OnboardingActions } from '$redux/Onboarding';
import { format } from 'date-fns';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { CheckBox } from '@rneui/themed';
import HorizontalView from '$components/HorizontalView';
import colors from '$themes/colors';
import { DataTypes, Screens } from '$themes/constants';

const Onboarding = ({
  route,
}: {
  route: RouteProp<RootStackParam, 'Onboarding'>;
}) => {
  const step = route.params?.step || 0;
  const Screen = Screens[step];
  const onboarding = useAppSelector(state => state.Onboarding);
  const dispatch = useDispatch();
  const nav = useNavigation<NavigationProp<RootStackParam>>();
  const onChange = (field: string, val: any) => {
    dispatch(
      OnboardingActions.setState({
        [field]: val,
      }),
    );
  };
  const validate = () => {
    for (let i in Screen.fields) {
      let field = Screen.fields[i];
      if (field.rules) {
        for (let j in field.rules) {
          let rule = field.rules[j];
          //@ts-ignore
          let data = onboarding[field.field];
          if (field.type == 'select') data = data.join(',');
          if (!rule.rule.test(data)) {
            Alert.alert('Error', rule.message.format(field.title));
            return false;
          }
        }
      }
    }
    return true;
  };
  const handleNext = () => {
    if (!validate()) return;
    nav.navigate({
      name: 'Onboarding',
      key: `step_${step}`,
      params: { step: step + 1 },
    });
  };
  const handleCheck = (field: string, value: string) => {
    dispatch(OnboardingActions.handleCheck({ field, value }));
  };
  const handleDateTimePicker = (field: string, open: boolean) => {
    dispatch(
      OnboardingActions.setState({
        [`modal_${field}`]: open,
      }),
    );
  };
  const handleComplete = () => {
    if (!validate()) return;
    nav.navigate('DetailsScreen');
  };
  const isFinalStep = step == Screens.length - 1;
  const isFirstStep = step == 0;
  return (
    <Page hideBackaButton={isFirstStep}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>{Screen.title}</Text>
        {Screen.fields.map(field => {
          switch (field.type) {
            case DataTypes.select:
              return (
                <View key={field.field} testID={field.field}>
                  <Text style={styles.fieldTitle}>{field.title}</Text>
                  {field.data?.map(item => (
                    <HorizontalView
                      key={item.value}
                      style={styles.checkboxContainer}>
                      <CheckBox
                        //@ts-ignore
                        checked={(onboarding[field.field] || []).includes(
                          item.value,
                        )}
                        onPress={() => handleCheck(field.field, item.value)}
                        containerStyle={styles.checkBoxContainer}
                        title={item.label}
                      />
                    </HorizontalView>
                  ))}
                </View>
              );
            case DataTypes.date:
              return (
                <View key={field.field} testID={field.field}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      handleDateTimePicker(field.field, true);
                    }}>
                    <TextInputField
                      key={field.field}
                      value={
                        //@ts-ignore
                        onboarding[field.field]
                          ? format(
                              //@ts-ignore
                              onboarding[field.field],
                              'dd/MM/yyyy',
                            )
                          : ''
                      }
                      keyboardType={field.keyboardType}
                      title={field.title}
                      placeholder={field.placeHolder}
                      editable={false}
                    />
                  </TouchableWithoutFeedback>
                  <DatePicker
                    modal
                    mode="date"
                    onCancel={() => handleDateTimePicker(field.field, false)}
                    onConfirm={date => {
                      onChange(field.field, date);
                      handleDateTimePicker(field.field, false);
                    }}
                    //@ts-ignore
                    open={onboarding[`modal_${field.field}`]}
                    //@ts-ignore
                    date={onboarding[field.field] || new Date()}
                  />
                </View>
              );
            default:
              return (
                <TextInputField
                  testID={field.field}
                  key={field.field}
                  //@ts-ignore
                  value={onboarding[field.field]}
                  keyboardType={field.keyboardType}
                  title={field.title}
                  validateReg={field.validateReg}
                  onChangeText={text => onChange(field.field, text)}
                  placeholder={field.placeHolder}
                />
              );
          }
        })}
        {!isFinalStep && (
          <Button
            style={styles.button}
            title="Next"
            onPress={handleNext}
            testID="Next"
          />
        )}
        {isFinalStep && (
          <Button
            style={styles.button}
            title="Complete"
            onPress={handleComplete}
            testID="Complete"
          />
        )}
      </View>
    </Page>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  checkboxContainer: { justifyContent: 'flex-start' },
  checkBoxContainer: {
    backgroundColor: colors.main,
    paddingLeft: 0,
    marginLeft: 0,
  },
  fieldTitle: { fontWeight: '600', fontSize: 16, marginBottom: 16 },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  container: { paddingHorizontal: 16, paddingTop: 30 },
  button: { marginTop: 60 },
});
