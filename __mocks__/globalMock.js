import React from 'react';
import * as ReactNative from 'react-native';
import { NativeModules, View } from 'react-native';
import '$utils/string';
const mockedNavigate = jest.fn();

// WebSocket mock
jest.mock('global', () => ({
  ...global,
  WebSocket: function WebSocket() {},
}));
function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock;

const icons = [
  'AntDesign',
  'Entypo',
  'EvilIcons',
  'Feather',
  'FontAwesome',
  'Fontisto',
  'Zocial',
  'FontAwesome5',
  'Ionicons',
  'MaterialIcons',
];
icons.forEach(icon => {
  jest.mock('react-native-vector-icons/{0}'.format(icon), () => 'Icon');
});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

// react-native-safe-area-context mock
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest
      .fn()
      .mockImplementation(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  };
});

NativeModules.Hyperkyc = {
  launch: jest.fn(),
};

// react-native-community/netinfo mock
jest.mock('@react-native-community/netinfo', () => {
  return {
    useNetwork: jest.fn(() => {
      return { isConnected: true };
    }),
    configure: jest.fn(),
    fetch: jest.fn(),
    refresh: jest.fn(),
    addEventListener: jest.fn(),
    useNetInfo: jest.fn(),
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  };
});

// react-native-async-storage/async-storage mock
jest.mock('@react-native-community/async-storage', () => {
  let cache = {};
  return {
    setItem: jest.fn((key, value) => {
      return new Promise((resolve, reject) => {
        return typeof key !== 'string' || typeof value !== 'string'
          ? reject(new Error('key and value must be string'))
          : resolve((cache[key] = value));
      });
    }),
    getItem: jest.fn((key, value) => {
      return new Promise(resolve => {
        return cache.hasOwnProperty(key) ? resolve(cache[key]) : resolve(null);
      });
    }),
    removeItem: jest.fn(key => {
      return new Promise((resolve, reject) => {
        return cache.hasOwnProperty(key)
          ? resolve(delete cache[key])
          : reject('No such key!');
      });
    }),
    clear: jest.fn(key => {
      return new Promise((resolve, reject) => resolve((cache = {})));
    }),
    getAllKeys: jest.fn(key => {
      return new Promise((resolve, reject) => resolve(Object.keys(cache)));
    }),
  };
});

jest.mock('@rneui/themed', () => {
  return {
    CheckBox: () => 'CheckBox',
  };
});

// mock native component like plateform and native modules
jest.doMock('react-native', () => {
  return Object.setPrototypeOf(
    {
      Button: 'Button',
      LayoutAnimation: {
        ...ReactNative.LayoutAnimation,
        configureNext: jest.fn(),
      },
      Platform: {
        ...ReactNative.Platform,
        OS: 'ios',
        Version: 13,
        isTesting: true,
        select: objs => objs.ios,
      },
      // Mock a native module
      NativeModules: {
        ...ReactNative.NativeModules,
        Override: { great: 'success' },
        SettingsManager: {
          settings: {
            AppleLocal: 'pt-br',
            AppleLanguages: ['pt-br'],
          },
        },
      },
      StyleSheet: {
        create: () => ({}),
      },
    },
    ReactNative,
  );
});

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  fetch: jest.fn(),
};

NativeModules.RNCredoappsdk = {
  execute: jest.fn(async () => {
    return '';
  }),
};
