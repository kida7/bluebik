import type { Config } from '@jest/types';

const esModules = [
  'react-native-date-picker',
  'react-native',
  '@react-native',
  'redux',
  '@reduxjs/toolkit',
  '@react-native-community',
  'react-native-vector-icons/\\w*',
  'react-native-gesture-handler',
].join('|');
// Sync object
const config: Config.InitialOptions = {
  preset: 'react-native',
  verbose: true,
  transformIgnorePatterns: [`/node_modules/(?!(${esModules}))`],
  setupFilesAfterEnv: ['<rootDir>/__mocks__/globalMock.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.*.svg',
    '.*.png',
    '.*.jpg',
    '.*.mp4',
    '.*.styles.ts',
    'index.ts',
    '.*.constants.ts',
    'translate.ts',
    'theme/',
  ],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
export default config;
