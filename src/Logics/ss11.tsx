import SampleSize11Service from './Services/SampleSize11Service';
import SampleSize11Request from './Interfaces/Request/SampleSize11Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize11Caculation(json: SampleSize11Request) {
  return SampleSize11Service.calculate(json);
}

function checkValidate(obj: SampleSize11Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize11Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize11Caculation(json);
  }
  return isValid;
}
export default calculate;
