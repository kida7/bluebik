import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from '$redux';
import DetailsScreen from '$screens/Home/DetailsScreen';

const _store = {
  Onboarding: {
    fullName: 'Vinh Le',
    idNumber: '1234',
    email: 'kida7kahp@gmail.com',
    phoneNumber: '0973886038',
    dob: new Date('1990/01/01'),
    purpose: ['loan'],
  },
};
//@ts-ignore
store.getState = () => _store;

describe('Details Screen ', () => {
  let container: ReactTestRenderer;
  beforeAll(() => {
    container = renderer.create(
      <Provider store={store}>
        <DetailsScreen />
      </Provider>,
    );
  });
  it('Details Screeen render correctly', () => {
    expect(container).toMatchSnapshot();
  });
});
