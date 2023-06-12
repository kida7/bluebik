import SampleSize01Service from './Services/SampleSize01Service';
import SampleSize01Request from './Interfaces/Request/SampleSize01Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize01Caculation(json: SampleSize01Request) {
  return SampleSize01Service.calculate(json);
}

function checkValidate(obj: SampleSize01Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize01Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize01Caculation(json);
  }
  return isValid;
}
export default calculate;
