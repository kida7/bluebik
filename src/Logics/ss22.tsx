import SampleSize22Service from './Services/SampleSize22Service';
import SampleSize22Request from './Interfaces/Request/SampleSize22Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize22Caculation(json: SampleSize22Request) {
  return SampleSize22Service.calculate(json);
}

function checkValidate(obj: SampleSize22Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize22Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize22Caculation(json);
  }
  return isValid;
}
export default calculate;
