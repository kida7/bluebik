import SampleSize16Service from './Services/SampleSize16Service';
import SampleSize16Request from './Interfaces/Request/SampleSize16Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize16Caculation(json: SampleSize16Request) {
  return SampleSize16Service.calculate(json);
}

function checkValidate(obj: SampleSize16Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize16Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize16Caculation(json);
  }
  return isValid;
}
export default calculate;
