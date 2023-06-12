import SampleSize17Service from './Services/SampleSize17Service';
import SampleSize17Request from './Interfaces/Request/SampleSize17Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize17Caculation(json: SampleSize17Request) {
  return SampleSize17Service.calculate(json);
}

function checkValidate(obj: SampleSize17Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize17Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize17Caculation(json);
  }
  return isValid;
}
export default calculate;
