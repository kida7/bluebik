import SampleSize10Service from './Services/SampleSize10Service';
import SampleSize10Request from './Interfaces/Request/SampleSize10Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize10Caculation(json: SampleSize10Request) {
  return SampleSize10Service.calculate(json);
}

function checkValidate(obj: SampleSize10Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize10Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize10Caculation(json);
  }
  return isValid;
}
export default calculate;
