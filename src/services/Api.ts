/* eslint-disable @typescript-eslint/no-unused-vars */
import apisauce, { ApisauceInstance, ApiResponse } from 'apisauce';
import { extract } from 'node-scrapy';
import { store } from '$redux';
import { ErrorActions } from '$redux/ErrorSlice';
import { ErrorResponse } from '$services/Types';

import { ApiList, ResponseData, User } from './Types';
// import { setErrorState } from '$utils/globals';
import Models from './Models';

let baseURL = '';

const _apiList: ApiList = {
  fetchData: {
    url: 'https://random-data-api.com/api/users/random_user?size=10',
    method: 'get',
  },
};

interface ApiInterface extends ApisauceInstance {
  fetchData: () => Promise<ResponseData<User[]>>;
}

//@ts-ignore
const Api: ApiInterface = apisauce.create({
  baseURL,
  headers: {
    'Cache-Control': 'no-cache',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0',
  },

  timeout: 10000,
});

function getValueByPropPath(obj: any, path: string) {
  if (!path) {
    return obj;
  }
  let props = path.split('.');
  let value = obj;
  props.map(prop => {
    if (value) {
      value = value[prop];
    }
  });
  return value;
}

function _extract(response: ApiResponse<string>, modelName: string) {
  const model = Models.find(t =>
    t.Pattern.test(response.config?.baseURL || ''),
  );
  console.log('Model', model);
  if (model && response.data) {
    //@ts-ignore
    return extract(response.data, model.Model[modelName]);
  }
  return {};
}

export function setErrorState(key: string, error: ErrorResponse) {
  store.dispatch(ErrorActions.setState({ [key]: error }));
}

// Khởi tạo các api theo config trong _apiList
for (let apiName in _apiList) {
  // @ts-ignore
  Api[apiName] = _data => {
    let _api = _apiList[apiName];
    let { errorMess, errorKey, pathParams, showLoading, ...data } = _data || {};
    //@ts-ignore
    data = { ...data };
    errorKey = errorKey || apiName;
    console.log('REQUEST', _api.url, data);
    pathParams = pathParams || [];
    return new Promise(resolve => {
      setErrorState(errorKey, { code: 'loading' });
      if (showLoading) {
        setErrorState('main', { code: 'loading' });
      }
      //@ts-ignore
      Api[_api.method](_api.url, { ...data }).then(
        (response: ApiResponse<ResponseData<any>>) => {
          if (showLoading) {
            setErrorState('main', { code: '' });
          }
          if (response.ok) {
            setErrorState(errorKey, {
              code: '{0}'.format(response.status),
            });
            let resData = response.data;
            console.info('RESPONSE', resData);
            resolve(resData);
          } else {
            console.error('RESPONSE ERROR', response);
            setErrorState(errorKey, {
              code: response.originalError.code || response.problem,
              message: errorMess || response.originalError.message,
            });
          }
        },
      );
    });
  };
}

export default Api;
