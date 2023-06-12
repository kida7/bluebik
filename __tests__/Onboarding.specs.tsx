import Onboarding from '$screens/Home/Onboarding';
import { RootStackParam } from '$services/Types';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from '$redux';
import { Screens } from '$themes/constants';

const _store = {
  Onboarding: {},
};
// const mockStore = configureStore(store);
//@ts-ignore
store.getState = () => _store;

Screens.forEach((screen, index) => {
  //@ts-ignore
  const route: RouteProp<RootStackParam, 'Onboarding'> = {
    params: {
      step: index,
    },
  };
  describe('Onboarding Screen Step {0}'.format(index + 1), () => {
    let container: ReactTestRenderer;
    beforeAll(() => {
      container = renderer.create(
        <Provider store={store}>
          <Onboarding route={route} />
        </Provider>,
      );
    });
    it('Onboarding Screeen render correctly', () => {
      expect(container);
    });
    screen.fields.forEach(field => {
      it('{0} present'.format(field.title), () => {
        container?.root.findByProps({ testID: field.field });
      });
    });
    if (route.params.step == 2) {
      it('Complete button present', () => {
        container?.root.findByProps({ testID: 'Complete' });
      });
    } else {
      it('Next button present', () => {
        container?.root.findByProps({ testID: 'Next' });
      });
    }
  });
});
