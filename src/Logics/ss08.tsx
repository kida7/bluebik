import SampleSize08Service from './Services/SampleSize08Service';
import SampleSize08Request from './Interfaces/Request/SampleSize08Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize08Caculation(json: SampleSize08Request) {
  return SampleSize08Service.calculate(json);
}

function checkValidate(obj: SampleSize08Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize08Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize08Caculation(json);
  }
  return isValid;
}
export default calculate;
