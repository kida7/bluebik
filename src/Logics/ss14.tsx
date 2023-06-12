import SampleSize14Service from './Services/SampleSize14Service';
import SampleSize14Request from './Interfaces/Request/SampleSize14Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize14Caculation(json: SampleSize14Request) {
  return SampleSize14Service.calculate(json);
}

function checkValidate(obj: SampleSize14Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize14Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize14Caculation(json);
  }
  return isValid;
}
export default calculate;
