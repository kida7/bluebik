import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Page from '$components/Page';
import { WINDOW_WIDTH } from '$themes/constants';
import {} from 'react-native-gesture-handler';
import { useAppSelector } from '$redux';
import { format } from 'date-fns';

const AVATAR_WIDTH = WINDOW_WIDTH - 16 * 2;

const Field = ({ title, content }: { title: string; content?: string }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>{title}</Text>
      <Text style={styles.fieldContent}>{content}</Text>
    </View>
  );
};

const DetailsScreen = ({}) => {
  const fullName = useAppSelector(state => state.Onboarding.fullName);
  const idNumber = useAppSelector(state => state.Onboarding.idNumber);
  const email = useAppSelector(state => state.Onboarding.email);
  const phoneNumber = useAppSelector(state => state.Onboarding.phoneNumber);
  const dob = useAppSelector(state => state.Onboarding.dob);
  const purpose = useAppSelector(state => state.Onboarding.purpose);
  return (
    <Page>
      <View style={styles.container}>
        <Text style={styles.header}>Personal Information</Text>
        <Field title="Full Name" content={fullName} />
        <Field title="ID Number" content={idNumber} />
        <Field title="Email" content={email} />
        <Field title="Phone Number" content={phoneNumber} />
        <Field
          title="Date of Birth"
          content={dob ? format(dob, 'dd/MM/yyyy') : ''}
        />
        <Field title="Purpose" content={purpose?.join(',')} />
      </View>
    </Page>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  fieldContent: {
    flex: 2,
    textAlign: 'right',
  },
  fieldTitle: { flex: 1, fontSize: 14, fontWeight: '600' },
  fieldContainer: { flexDirection: 'row', paddingVertical: 12 },
  container: { paddingHorizontal: 16, paddingTop: 30 },
});
