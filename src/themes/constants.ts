import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { Dimensions, KeyboardType } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const ITEM_MOVIE_IMG_RATIO = 2 / 3;
export const MARGIN_HORIZONTAL = 12;
export const ITEM_PER_ROW = 3;
export const TITLE_FONT_SIZE = 22;
export const BOTTOM_SPACE = getBottomSpace();
export const STATUSBAR_HEIGHT = getStatusBarHeight();

export const ITEM_MOVIE_WIDTH =
  (WINDOW_WIDTH - MARGIN_HORIZONTAL * ITEM_PER_ROW - MARGIN_HORIZONTAL) /
  ITEM_PER_ROW;
export const ITEM_MOVIE_HEIGH = ITEM_MOVIE_WIDTH / ITEM_MOVIE_IMG_RATIO;
export const ITEM_WIDTH = WINDOW_WIDTH;

export const DataTypes = {
  string: 'string',
  email: 'email',
  date: 'date',
  select: 'select',
};

const purposesOptions = [
  { label: 'Money Transfer', value: 'moneyTransfer' },
  { label: 'Payment', value: 'payment' },
  { label: 'Bill Payment', value: 'billPayment' },
  { label: 'Loan', value: 'loan' },
  { label: 'Investment', value: 'investment' },
  { label: 'Saving', value: 'saving' },
];

export const Screens: Array<{
  title: string;
  fields: Array<{
    title: string;
    field: string;
    placeHolder?: string;
    keyboardType?: KeyboardType;
    type?: string;
    validateReg?: RegExp;
    rules?: Array<{
      rule: RegExp;
      message: string;
    }>;
    data?: Array<{
      label: string;
      value: string;
    }>;
  }>;
}> = [
  {
    title: 'Step A - Basic Information',
    fields: [
      {
        title: 'Full Name',
        placeHolder: 'Enter your Full Name',
        field: 'fullName',
        rules: [{ rule: /^.+$/, message: `{0} can't be empty` }],
      },
      {
        title: 'ID Number',
        placeHolder: 'Enter your ID Number',
        keyboardType: 'number-pad',
        field: 'idNumber',
        validateReg: /^[\d]*$/,
        rules: [{ rule: /^.+$/, message: `{0} can't be empty` }],
      },
    ],
  },
  {
    title: 'Step B - Basic Information',
    fields: [
      {
        title: 'Email',
        placeHolder: 'Enter your Email',
        field: 'email',
        keyboardType: 'email-address',
        type: DataTypes.email,
        rules: [
          { rule: /^.+$/, message: `{0} can't be empty` },
          {
            rule: /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*(\.[A-Za-z]{2,})$/,
            message: `{0} is not correct`,
          },
        ],
      },
      {
        title: 'Phone number',
        placeHolder: 'Enter your Phone Number',
        keyboardType: 'phone-pad',
        field: 'phoneNumber',
        validateReg: /^[\d\s]*$/,
        rules: [
          { rule: /^.+$/, message: `{0} can't be empty` },
          {
            rule: /^(0|\+84)(3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])[0-9]{7}$/,
            message: `{0} is not correct`,
          },
        ],
      },
      {
        title: 'Date of birth',
        placeHolder: 'DD/MM/YYYY',
        field: 'dob',
        type: DataTypes.date,
        rules: [{ rule: /^.+$/, message: `{0} can't be empty` }],
      },
    ],
  },
  {
    title: 'Step C - Purpose',
    fields: [
      {
        title: 'Purpose',
        field: 'purpose',
        type: DataTypes.select,
        data: purposesOptions,
        rules: [{ rule: /^.+$/, message: `{0} can't be empty` }],
      },
    ],
  },
];
