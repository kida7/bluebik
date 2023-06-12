import SampleSize07Service from './Services/SampleSize07Service';
import SampleSize07Request from './Interfaces/Request/SampleSize07Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize07Caculation(json: SampleSize07Request) {
  return SampleSize07Service.calculate(json);
}

function checkValidate(obj: SampleSize07Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize07Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize07Caculation(json);
  }
  return isValid;
}
export default calculate;
